"use strict";

/**
 * Detecção de contexto do projeto destino para o comando `padtec detect`.
 *
 * Consome o detector de padrão estrutural (`structural-pattern-detection.js`,
 * cujo contrato não é alterado aqui) e aplica por cima os procedimentos do
 * prompt mestre (`padtec/prompts/00-mestre.md`):
 *
 *   - iii.1 e iii.2: manifestos de projeto e diretórios de convenção;
 *   - iii.3: pasta de saída (`docs/`, `documentation/`, `documentacao/`);
 *   - iii.4: variante por árvore de decisão, na ordem, parando na primeira
 *     regra que casa;
 *   - iv: nove capacidades condicionais, por sinais em manifestos, arquivos
 *     e busca textual limitada no código;
 *   - v: modo monorepo, derivado do detector estrutural;
 *   - vi.2: conjunto de seções do núcleo por nível e seções condicionais.
 *
 * O resultado é um `context.json` (schemaVersion "1.0") e um relatório em
 * Markdown. Tudo aqui é heurístico: o agente que executa o prompt mestre
 * confirma as detecções antes de gerar a documentação.
 */

const fs = require("fs");
const path = require("path");
const {
  detectStructuralPattern,
  validateProjectRoot,
} = require("./structural-pattern-detection");

const SCHEMA_VERSION = "1.0";

const LEVELS = Object.freeze(["L1", "L2", "L3"]);

/** Slugs oficiais de variante (padtec/README.md). */
const VARIANTS = Object.freeze([
  "full-stack-web",
  "backend-api",
  "frontend-site",
  "automacao-script",
  "iac",
]);

/** Slugs oficiais de capacidade (padtec/README.md), na ordem da tabela iv. */
const CAPABILITIES = Object.freeze([
  "banco-de-dados",
  "cache",
  "filas-async",
  "auth",
  "integracoes-externas",
  "storage",
  "notificacoes",
  "jobs-agendados",
  "multi-tenancy",
]);

/** Pastas de saída procuradas na raiz, na ordem do mestre (iii.3). */
const OUTPUT_DIR_CANDIDATES = Object.freeze(["docs", "documentation", "documentacao"]);
const DEFAULT_OUTPUT_DIR = "docs";

/** Pasta de trabalho gravada dentro do projeto destino. */
const RUN_DIR = path.join(".padtec", "run");
const CONTEXT_FILE = "context.json";
const REPORT_FILE = "detection-report.md";

/** Seções do núcleo por nível (mestre, vi.2). */
const LEVEL_SECTION_NUMBERS = Object.freeze({
  L1: ["01", "02", "03", "13"],
  L2: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "13"],
  L3: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
});

/**
 * Nomes de arquivo das quinze seções do núcleo, usados apenas quando nenhuma
 * cópia de `padtec/templates/nucleo/` está acessível (ver resolveSectionFiles).
 */
const CORE_SECTION_FALLBACK = Object.freeze([
  "01-visao-geral.md",
  "02-arquitetura.md",
  "03-stack-e-dependencias.md",
  "04-estrutura-do-projeto.md",
  "05-modelo-de-dominio.md",
  "06-fluxos-de-negocio.md",
  "07-interface-externa.md",
  "08-frontend.md",
  "09-backend.md",
  "10-configuracao-e-ambientes.md",
  "11-infraestrutura-e-deployment.md",
  "12-quick-start.md",
  "13-glossario.md",
  "14-faq-e-troubleshooting.md",
  "15-manutencao-da-documentacao.md",
]);

// ---------------------------------------------------------------------------
// Limites da varredura
// ---------------------------------------------------------------------------

/**
 * Pastas ignoradas na varredura de arquivos (comparação em minúsculas).
 * Inclui a própria pasta de trabalho `.padtec/` para que uma execução
 * anterior não vire evidência.
 */
const SCAN_IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "vendor",
  ".apm",
  ".padtec",
  ".next",
  ".nuxt",
  ".svelte-kit",
  ".turbo",
  ".cache",
  ".terraform",
  ".idea",
  ".vscode",
  "coverage",
  "venv",
  ".venv",
  "__pycache__",
  "target",
  "obj",
]);

const SCAN_MAX_DEPTH = 10;
const SCAN_MAX_FILES = 20000;
const TEXT_MAX_FILE_BYTES = 512 * 1024;
const TEXT_MAX_FILES = 5000;
const TEXT_MAX_TOTAL_BYTES = 64 * 1024 * 1024;
const MAX_EVIDENCE_PER_SIGNAL = 5;
const EXCERPT_MAX_LENGTH = 120;

/** Extensões de código e configuração submetidas à busca textual. */
const TEXT_EXTENSIONS = new Set([
  ".js", ".mjs", ".cjs", ".jsx", ".ts", ".tsx", ".mts", ".cts",
  ".vue", ".svelte", ".astro",
  ".py", ".java", ".kt", ".kts", ".cs", ".go", ".rs", ".php", ".rb",
  ".scala", ".groovy",
  ".json", ".yml", ".yaml", ".toml", ".env", ".sql", ".prisma",
  ".sh", ".ps1",
]);

/** Arquivos sem extensão reconhecida que ainda entram na busca textual. */
const TEXT_BASENAMES = /^(\.env(\..+)?|Dockerfile|crontab|Procfile)$/;

/** Arquivos excluídos da busca textual (lockfiles e artefatos minificados). */
const TEXT_EXCLUDED_FILES = /(^|\/)(package-lock\.json|npm-shrinkwrap\.json|pnpm-lock\.ya?ml|composer\.lock|Cargo\.lock|poetry\.lock|Pipfile\.lock)$|\.min\.(js|css)$|\.map$/;

// ---------------------------------------------------------------------------
// Sinais do mestre
// ---------------------------------------------------------------------------

/** Regra iii.4, item 2: frameworks de frontend em package.json. */
const FRONTEND_DEPS = Object.freeze(["next", "nuxt", "vite", "svelte", "astro"]);

/** Regras iii.4, itens 2 e 3: frameworks de backend em package.json. */
const BACKEND_JS_DEPS = Object.freeze(["@nestjs/core", "express", "fastify", "koa"]);

/** Regra iii.4, item 3: `requirements.txt`/`pyproject.toml` com Django/FastAPI/Flask. */
const PYTHON_BACKEND_DEPS = Object.freeze(["django", "fastapi", "flask"]);

/** Regra iii.4, item 3: `go.mod` com servidor HTTP (frameworks usuais). */
const GO_HTTP_DEPS = Object.freeze([
  /^github\.com\/gin-gonic\/gin$/,
  /^github\.com\/labstack\/echo/,
  /^github\.com\/gofiber\/fiber/,
  /^github\.com\/go-chi\/chi/,
  /^github\.com\/gorilla\/mux$/,
  /^github\.com\/beego\/beego/,
  /^github\.com\/julienschmidt\/httprouter$/,
  /^github\.com\/valyala\/fasthttp$/,
]);

/**
 * Manifestos backend não-JS além dos citados nominalmente pelo mestre. O
 * mestre lista `pom.xml`, `*.csproj`, `requirements.txt` e `go.mod` entre
 * parênteses, como exemplos; estes equivalentes dos demais manifestos de
 * iii.1 seguem o mesmo critério (manifesto de aplicação servidora).
 */
const PHP_BACKEND_DEPS = Object.freeze([
  "laravel/framework",
  "laravel/lumen-framework",
  "symfony/framework-bundle",
  "symfony/symfony",
  "slim/slim",
  "laminas/laminas-mvc",
  "cakephp/cakephp",
  "codeigniter4/framework",
  "yiisoft/yii2",
]);
const RUST_BACKEND_DEPS = Object.freeze(["actix-web", "axum", "rocket", "warp", "tide", "poem"]);

/** Nomes de app (último segmento de `apps[].path`) que indicam frontend ou backend. */
const FRONTEND_APP_NAMES = new Set(["web", "frontend", "front", "client", "site", "www", "app"]);
const BACKEND_APP_NAMES = new Set(["api", "backend", "back", "server", "servidor", "service", "services"]);

/** Regra iii.4, item 5: pastas de scripts. */
const SCRIPT_DIRS = Object.freeze(["scripts", "bin", "cmd"]);
const ENTRY_FILE_EXTENSIONS = new Set([
  ".sh", ".bash", ".zsh", ".ps1", ".py", ".js", ".mjs", ".cjs", ".ts", ".rb", ".pl", ".php",
]);
const ENTRY_FILE_EXCLUDED = /((^|\.)(config|conf|rc|test|spec|setup)\.(js|cjs|mjs|ts)$)|^(conftest|setup|__init__)\.py$|^(gulpfile|gruntfile)\.(js|cjs|mjs|ts)$/i;

/**
 * Tabela iv do mestre, traduzida em sinais verificáveis. Para cada
 * capacidade:
 *   - `deps`: nomes de dependência (string exata em minúsculas ou RegExp)
 *     nos manifestos reconhecidos, cobrindo os produtos citados pelo mestre
 *     nos ecossistemas JS, Python, JVM, .NET, Go, PHP e Rust;
 *   - `files`: padrões de caminho relativo (arquivos ou pastas);
 *   - `text`: padrões de busca textual no código e na configuração. Cada
 *     regra casa quando todas as expressões de `all` casam no conteúdo; o
 *     trecho é extraído com a primeira delas. `ext` restringe as extensões.
 */
const CAPABILITY_RULES = Object.freeze({
  "banco-de-dados": {
    deps: [
      "typeorm", "@prisma/client", "prisma", "sequelize", "sequelize-typescript", "mongoose",
      "knex", "drizzle-orm", "@mikro-orm/core", "objection", "kysely", "pg", "mysql", "mysql2",
      "sqlite3", "better-sqlite3", "mongodb", "mssql", "oracledb",
      "sqlalchemy", "django", "psycopg2", "psycopg2-binary", "psycopg", "pymongo", "motor",
      "alembic", "peewee", "tortoise-orm", "asyncpg", "aiomysql", "pymysql", "mysqlclient",
      /^spring-boot-starter-data-(jpa|jdbc|mongodb|r2dbc)$/, /^hibernate-/, /jdbc/, /^flyway/,
      /^liquibase/, /^mybatis/, "jooq",
      /^microsoft\.entityframeworkcore/, "dapper", "npgsql", "mongodb.driver", /^pomelo\.entityframeworkcore/,
      /^gorm\.io\//, /^github\.com\/jmoiron\/sqlx$/, /^github\.com\/lib\/pq$/, /^github\.com\/jackc\/pgx/,
      /^go\.mongodb\.org\//, /^github\.com\/go-sql-driver\/mysql$/, /^entgo\.io\//,
      /^doctrine\/(orm|dbal|doctrine-bundle)$/, "illuminate/database",
      "sqlx", "diesel", "sea-orm", "rusqlite", "tokio-postgres",
    ],
    files: [
      { re: /\.sql$/i, label: "arquivo .sql" },
      { re: /(^|\/)(migrations?|db\/migrate|database\/migrations)(\/|$)/i, label: "pasta de migrations" },
      { re: /(^|\/)schema\.prisma$/, label: "schema Prisma" },
      { re: /(^|\/)(ormconfig\.\w+|knexfile\.\w+|drizzle\.config\.\w+|alembic\.ini|\.sequelizerc|liquibase\.properties)$/i, label: "arquivo de configuração de ORM ou de migrations" },
      { re: /\.dbml$/i, label: "schema DBML" },
    ],
    text: [
      { label: "entidade ou schema de persistência", all: [/@Entity\s*\(|@Table\s*\(|@PrimaryGeneratedColumn|@ObjectIdColumn|models\.Model\b|db\.Model\b|declarative_base\s*\(|\bDeclarativeBase\b|\bDbContext\b|\[Table\s*\(|@Document\s*\(|mongoose\.Schema\b|CREATE TABLE|create table/] },
      { label: "configuração de banco de dados", all: [/\b(DATABASE_URL|DB_(HOST|CONNECTION|DATABASE|NAME)|POSTGRES_(DB|HOST|USER)|MYSQL_(DATABASE|HOST)|MONGO(DB)?_(URI|URL)|ConnectionStrings)\b/] },
      { label: "banco de dados em docker-compose", ext: [".yml", ".yaml"], all: [/^\s*image:\s*["']?(bitnami\/)?(postgres|postgresql|mysql|mariadb|mongo|mongodb|mcr\.microsoft\.com\/mssql|cockroachdb|oracle)/m] },
    ],
  },
  cache: {
    deps: [
      "redis", "ioredis", "cache-manager", /^cache-manager-/, "@nestjs/cache-manager", "node-cache",
      "memcached", "memjs", "lru-cache", "keyv", /^@keyv\//, "@upstash/redis", "redis-om",
      "django-redis", "aiocache", "cachetools", "flask-caching", "fastapi-cache2", "pymemcache", "hiredis",
      "spring-boot-starter-cache", "spring-boot-starter-data-redis", "spring-data-redis", "jedis",
      "lettuce-core", "caffeine", /^ehcache/, "redisson", "hazelcast",
      "stackexchange.redis", /^microsoft\.extensions\.caching\./, "enyimmemcachedcore", /^cachemanager/,
      /^github\.com\/redis\/go-redis/, /^github\.com\/go-redis\/redis/, /^github\.com\/gomodule\/redigo/,
      /^github\.com\/patrickmn\/go-cache$/, /^github\.com\/allegro\/bigcache/, /^github\.com\/dgraph-io\/ristretto/,
      /^github\.com\/bradfitz\/gomemcache/,
      "predis/predis", "symfony/cache", "cache/cache",
      "moka", "cached",
    ],
    files: [],
    text: [
      { label: "decorator ou interceptor de cache", all: [/@Cache(Key|TTL|able|Evict|Put)\s*\(|\bCacheInterceptor\b|@cache_page\b|@cached\b|@Cacheable\b/] },
      { label: "configuração de Redis", all: [/\b(REDIS_(URL|HOST|PORT)|rediss?:\/\/)/] },
      { label: "serviço de cache em docker-compose", ext: [".yml", ".yaml"], all: [/^\s*image:\s*["']?(bitnami\/)?(redis|valkey|memcached)\b/m] },
    ],
  },
  "filas-async": {
    deps: [
      "bull", "bullmq", "@nestjs/bull", "@nestjs/bullmq", "bee-queue", "amqplib", "amqp-connection-manager",
      "@golevelup/nestjs-rabbitmq", "rascal", "kafkajs", "node-rdkafka", "@confluentinc/kafka-javascript",
      "@aws-sdk/client-sqs", "sqs-consumer", "sqs-producer", "@azure/service-bus", "@azure/event-hubs",
      "@google-cloud/pubsub", "nats", "mqtt", "rsmq", "graphile-worker", "pg-boss", "@nestjs/microservices",
      "celery", "kombu", "pika", "aio-pika", "kafka-python", "confluent-kafka", "aiokafka", "rq", "dramatiq",
      "huey", "arq", "taskiq", "faststream", "azure-servicebus", "google-cloud-pubsub", "nats-py", "paho-mqtt",
      "spring-kafka", "kafka-clients", "spring-boot-starter-amqp", "spring-rabbit", "amqp-client",
      /^spring-cloud-(starter-)?stream/, "spring-cloud-aws-messaging", /^activemq-/, /^artemis-/, "pulsar-client",
      /^masstransit/, "rabbitmq.client", "confluent.kafka", "awssdk.sqs", /^azure\.messaging\./, "nservicebus", /^rebus/, /^easynetq/,
      /^github\.com\/segmentio\/kafka-go/, /^github\.com\/streadway\/amqp/, /^github\.com\/rabbitmq\/amqp091-go/,
      /^github\.com\/hibiken\/asynq/, /^github\.com\/confluentinc\/confluent-kafka-go/, /^github\.com\/(ibm|shopify)\/sarama/,
      /aws-sdk-go(-v2)?\/service\/sqs/, /^github\.com\/nats-io\/nats\.go/, "cloud.google.com/go/pubsub",
      "php-amqplib/php-amqplib", /^enqueue\//, "symfony/messenger", "vladimir-yuldashev/laravel-queue-rabbitmq", "laravel/horizon",
      "lapin", "rdkafka", "aws-sdk-sqs",
    ],
    files: [],
    text: [
      { label: "decorator de processador ou consumidor de fila", all: [/@Process(or)?\s*\(|@Consumer\s*\(|@MessagePattern\s*\(|@EventPattern\s*\(|@RabbitSubscribe\b|@KafkaListener\b|@RabbitListener\b|@SqsListener\b|@JmsListener\b|@shared_task\b|@app\.task\b|@celery\.task\b/] },
      { label: "configuração de broker de mensagens", all: [/\b(AMQP_URL|RABBITMQ_(URL|HOST)|KAFKA_(BROKERS?|BOOTSTRAP_SERVERS)|SQS_QUEUE_URL|SERVICEBUS_CONNECTION_STRING)\b|amqps?:\/\//] },
      { label: "broker de mensagens em docker-compose", ext: [".yml", ".yaml"], all: [/^\s*image:\s*["']?(bitnami\/|confluentinc\/cp-|apache\/|docker\.redpanda\.com\/)?(rabbitmq|kafka|redpanda|nats|zookeeper)\b/m] },
    ],
  },
  auth: {
    deps: [
      "passport", /^passport-/, "@nestjs/passport", "@nestjs/jwt", "jsonwebtoken", "jose", "express-session",
      "express-jwt", "cookie-session", "next-auth", /^@auth\//, /^@auth0\//, "auth0", "openid-client", "oauth",
      "oauth2-server", "@node-oauth/oauth2-server", "oidc-provider", "bcrypt", "bcryptjs", "argon2",
      /^@azure\/msal-/, "msal", "keycloak-connect", "keycloak-js", "@react-keycloak/web", /^@okta\//, "lucia",
      "better-auth", /^@clerk\//, /^@supabase\/(auth|ssr)/, "@casl/ability", "accesscontrol", "casbin", "grant",
      "simple-oauth2", "jwks-rsa", "jwt-decode", "@fastify/jwt", "fastify-jwt", "@fastify/passport",
      "django-allauth", "djangorestframework-simplejwt", "pyjwt", "python-jose", "authlib", "flask-login",
      "flask-jwt-extended", "fastapi-users", "passlib", "oauthlib", "requests-oauthlib", "python-keycloak",
      "django-oauth-toolkit", "social-auth-app-django", "argon2-cffi", "pycasbin",
      "spring-boot-starter-security", /^spring-security-/, /^jjwt/, "nimbus-jose-jwt", "java-jwt", /^keycloak-/,
      "spring-boot-starter-oauth2-client", "spring-boot-starter-oauth2-resource-server", /^shiro-/,
      /^microsoft\.aspnetcore\.authentication/, /^microsoft\.aspnetcore\.identity/, /^microsoft\.identity/,
      "identityserver4", /^duende\./, "system.identitymodel.tokens.jwt", /^openiddict/, "bcrypt.net-next",
      /^github\.com\/golang-jwt\/jwt/, /^github\.com\/dgrijalva\/jwt-go/, "golang.org/x/oauth2", /^github\.com\/coreos\/go-oidc/,
      /^github\.com\/casbin\/casbin/, /^github\.com\/markbates\/goth/, /^github\.com\/gorilla\/sessions$/,
      "laravel/sanctum", "laravel/passport", "laravel/fortify", "laravel/breeze", "laravel/jetstream", "tymon/jwt-auth",
      "firebase/php-jwt", "lcobucci/jwt", /^league\/oauth2-/, "symfony/security-bundle",
      "oauth2",
    ],
    files: [],
    text: [
      { label: "guard, middleware ou decorator de autenticação", all: [/@UseGuards\s*\(|\bAuthGuard\s*\(|@Roles\s*\(|\bcanActivate\s*\(|passport\.(authenticate|use)\s*\(|@login_required\b|@permission_required\b|\[Authorize(\(|\])|@PreAuthorize\b|@Secured\b|@RolesAllowed\b|LoginRequiredMixin|\bIsAuthenticated\b|getServerSession\s*\(|\bjwt\.(sign|verify)\s*\(/] },
      { label: "configuração de autenticação", all: [/\b(JWT_SECRET|JWT_(PUBLIC|PRIVATE)_KEY|OAUTH_CLIENT_(ID|SECRET)|OIDC_\w+|AUTH0_\w+|NEXTAUTH_SECRET|SESSION_SECRET|KEYCLOAK_\w+)\b/] },
    ],
  },
  "integracoes-externas": {
    deps: [
      "axios", "got", "ky", "undici", "superagent", "@nestjs/axios", "graphql-request", "soap", "strong-soap",
      "@grpc/grpc-js", "grpc", "stripe", "mercadopago", "pagarme", "@paypal/checkout-server-sdk", "openai",
      "@anthropic-ai/sdk", "@google/generative-ai", "@slack/web-api", "@slack/bolt", "discord.js", "telegraf",
      "node-telegram-bot-api", /^@octokit\//, "googleapis", "@hubspot/api-client", "algoliasearch",
      /^@aws-sdk\//, "aws-sdk", /^@azure\//, /^@google-cloud\//, "firebase-admin", "firebase", /^@supabase\//,
      "requests", "httpx", "zeep", "anthropic", "google-api-python-client", "boto3", /^azure-/, /^google-cloud-/,
      "slack-sdk", "python-telegram-bot", "pygithub", "mercadopago",
      /openfeign/, "feign-core", "retrofit", "okhttp", /^aws-java-sdk/, /^software\.amazon\.awssdk/, "stripe-java",
      "refit", "restsharp", "flurl", "flurl.http", /^awssdk\./, /^azure\./, /^google\.apis/, "stripe.net",
      /^github\.com\/go-resty\/resty/, /^github\.com\/aws\/aws-sdk-go/, /^github\.com\/stripe\/stripe-go/,
      /^google\.golang\.org\/api/, /^github\.com\/azure\/azure-sdk-for-go/,
      "guzzlehttp/guzzle", "symfony/http-client", "stripe/stripe-php", "aws/aws-sdk-php", "google/apiclient", "mercadopago/dx-php",
      "reqwest", /^aws-sdk-/,
    ],
    files: [],
    text: [
      { label: "cliente HTTP nomeado (baseURL fixa ou fábrica de cliente)", all: [/\bbaseURL\s*[:=]|\bbase_url\s*[:=]|axios\.create\s*\(|\bHttpService\b|AddHttpClient\s*\(|\bIHttpClientFactory\b|@FeignClient\b|WebClient\.(create|builder)\s*\(|\bRestTemplate\b|RestClient\.(create|builder)|resty\.New\s*\(|httpx\.(Client|AsyncClient)\s*\(|requests\.Session\s*\(|new\s+GuzzleHttp\\Client|Http::(withBaseUrl|baseUrl)/] },
      { label: "configuração de serviço externo", all: [/\b[A-Z0-9_]*(EXTERNAL|INTEGRATION|INTEGRACAO|_API_URL|_API_KEY|_API_TOKEN|_WEBHOOK_URL)\b/] },
    ],
  },
  storage: {
    deps: [
      "multer", "multer-s3", "formidable", "busboy", "express-fileupload", "@fastify/multipart", "fastify-multipart",
      "@aws-sdk/client-s3", "@aws-sdk/lib-storage", "@aws-sdk/s3-request-presigner", "@azure/storage-blob",
      "@azure/storage-file-share", "@google-cloud/storage", "minio", "fs-extra", "cloudinary", "uploadthing",
      "azure-storage-blob", "google-cloud-storage", "django-storages", "python-multipart",
      /^aws-java-sdk-s3/, "s3", "commons-fileupload", "spring-content-fs",
      "awssdk.s3", "azure.storage.blobs", "google.cloud.storage.v1",
      /aws-sdk-go(-v2)?\/service\/s3/, /^github\.com\/minio\/minio-go/, "cloud.google.com/go/storage", /azure-storage-blob-go|\/azblob$/,
      "league/flysystem", /^league\/flysystem-/,
      "aws-sdk-s3", "rust-s3", "object_store",
    ],
    files: [],
    text: [
      { label: "upload ou cliente de armazenamento de arquivos", all: [/@UploadedFiles?\s*\(|Files?Interceptor\s*\(|\bmulter\s*\(|\bBlobServiceClient\b|\bS3Client\b|\bPutObjectCommand\b|\bIFormFile\b|\bMultipartFile\b|\bupload_to\s*=|\bUploadFile\b|Storage::(disk|put)|\.putObject\s*\(|\.uploadStream\s*\(|getSignedUrl\s*\(/] },
      { label: "configuração de armazenamento", all: [/\b(AWS_S3_BUCKET|S3_BUCKET\w*|AZURE_STORAGE_(CONNECTION_STRING|ACCOUNT\w*)|STORAGE_(BUCKET|ACCOUNT)\w*|GCS_BUCKET\w*|MINIO_\w+)\b/] },
      { label: "serviço de armazenamento em docker-compose", ext: [".yml", ".yaml"], all: [/^\s*image:\s*["']?(bitnami\/)?(minio\/minio|minio|mcr\.microsoft\.com\/azure-storage\/azurite|azurite)\b/m] },
    ],
  },
  notificacoes: {
    deps: [
      "@sendgrid/mail", "@sendgrid/client", "sendgrid", "twilio", "nodemailer", "@nestjs-modules/mailer",
      "mailgun-js", "mailgun.js", "postmark", "resend", "@aws-sdk/client-ses", "@aws-sdk/client-sesv2",
      "@aws-sdk/client-sns", "@aws-sdk/client-pinpoint", "@azure/communication-email", "@azure/communication-sms",
      "@azure/notification-hubs", "web-push", "expo-server-sdk", "@onesignal/node-onesignal", "onesignal-node",
      "novu", "@novu/node", "emailjs", "email-templates", "@getbrevo/brevo", "sib-api-v3-sdk", "node-mailjet",
      "django-anymail", "flask-mail", "fastapi-mail", "aiosmtplib", "pyfcm", "yagmail", "mailjet-rest", "postmarker",
      "spring-boot-starter-mail", "sendgrid-java", /^jakarta\.mail/, /^javax\.mail/, "ses", "sns",
      "mailkit", "mimekit", "awssdk.simpleemail", "awssdk.simplenotificationservice",
      /^github\.com\/sendgrid\/sendgrid-go/, /^github\.com\/twilio\/twilio-go/, /gomail/, /^github\.com\/wneessen\/go-mail/,
      /aws-sdk-go(-v2)?\/service\/(ses|sns)/,
      "symfony/mailer", "swiftmailer/swiftmailer", "phpmailer/phpmailer", "sendgrid/sendgrid", "twilio/sdk", "mailgun/mailgun-php",
      "lettre",
    ],
    files: [],
    text: [
      { label: "envio de e-mail, SMS ou push", all: [/\bcreateTransport\s*\(|\bsendMail\s*\(|\bsendEmail\s*\(|\bsend_mail\s*\(|import smtplib|"net\/smtp"|\bJavaMailSender\b|\bSmtpClient\b|\bMailMessage\b|messaging\(\)\.send|Notification::send|Mail::(to|send)|\bsend_sms\s*\(|\bsendSms\s*\(/] },
      { label: "configuração de SMTP ou de provedor de notificações", all: [/\b(SMTP_(HOST|PORT|USER\w*|PASS\w*|SERVER)|MAIL_(HOST|MAILER|DRIVER|FROM\w*)|SENDGRID_API_KEY|TWILIO_(ACCOUNT_SID|AUTH_TOKEN)|FCM_SERVER_KEY|VAPID_(PUBLIC|PRIVATE)_KEY)\b|smtps?:\/\//] },
      { label: "servidor de e-mail de desenvolvimento em docker-compose", ext: [".yml", ".yaml"], all: [/^\s*image:\s*["']?(mailhog\/mailhog|axllent\/mailpit|maildev\/maildev|mailhog|mailpit|maildev)\b/m] },
    ],
  },
  "jobs-agendados": {
    deps: [
      "@nestjs/schedule", "node-cron", "cron", "node-schedule", "agenda", "bree", "toad-scheduler", "croner", "cron-parser",
      "apscheduler", "django-celery-beat", "schedule", "python-crontab", "rq-scheduler", "django-crontab",
      "quartz", "quartz-scheduler", /^org\.quartz/, "spring-boot-starter-quartz", "db-scheduler", "jobrunr",
      /^hangfire/, "coravel", /^quartz\./,
      /^github\.com\/robfig\/cron/, /^github\.com\/go-co-op\/gocron/, /^github\.com\/reugn\/go-quartz/,
      "dragonmantank/cron-expression",
      "tokio-cron-scheduler",
    ],
    files: [
      { re: /(^|\/)(crontab|[\w.-]+\.cron)$/, label: "arquivo crontab" },
    ],
    text: [
      { label: "job agendado declarado (cron, @Scheduled, timer)", all: [/@Cron\s*\(|@Interval\s*\(|@Timeout\s*\(|@Scheduled\s*\(|cron\.schedule\s*\(|new\s+CronJob\s*\(|schedule\.(every|scheduleJob)\s*\(|@periodic_task\b|beat_schedule\s*=|\bcrontab\s*\(|RecurringJob\.AddOrUpdate|cron\.New\s*\(|gocron\.|->(cron|everyMinute|everyFiveMinutes|hourly|daily|dailyAt|weekly|monthly)\s*\(|kind:\s*CronJob\b|\btimerTrigger\b|"schedule"\s*:\s*"[^"]*\*/] },
    ],
  },
  "multi-tenancy": {
    deps: [
      "nestjs-tenancy", "@nestjs-tenancy/core", "mongo-tenant", "sequelize-multi-tenant", "knex-tenant",
      "django-tenants", "django-tenant-schemas", "django-multitenant",
      "finbuckle.multitenant", /^finbuckle\.multitenant/,
      "stancl/tenancy", "spatie/laravel-multitenancy", "hyn/multi-tenant", "tenancy/tenancy",
    ],
    files: [],
    text: [
      { label: "resolução ou identificador de tenant", all: [/\b(multi[-_]?tenan(t|cy)|TenantResolver|TenantMiddleware|TenantGuard|TenantContext|TenantService|tenant_id|tenantId|x-tenant-id|X-Tenant-Id|current_tenant|getTenant|resolveTenant)\b/] },
      { label: "conexão nomeada ou schema dinâmico", all: [/@Inject(Connection|DataSource)\s*\(\s*['"][\w-]+['"]\s*\)|@InjectRepository\s*\([^)]*,\s*['"][\w-]+['"]\s*\)|getConnection\s*\(\s*['"][\w-]+['"]\s*\)|\bsearch_path\s*(=|to)\b|SET\s+schema\b/i] },
    ],
  },
});

/** Regras textuais usadas na detecção de variante (iii.1 e iii.4). */
const VARIANT_TEXT_RULES = Object.freeze([
  { id: "go-net-http", label: "servidor HTTP da biblioteca padrão Go", ext: [".go"], all: [/"net\/http"/] },
  { id: "ansible-playbook", label: "playbook Ansible", ext: [".yml", ".yaml"], all: [/^\s*-?\s*hosts:\s*\S/m, /^\s*(tasks|roles|pre_tasks|post_tasks):\s*$/m] },
  { id: "cloudformation", label: "template CloudFormation", ext: [".yml", ".yaml", ".json"], all: [/AWSTemplateFormatVersion/] },
]);

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

function isMissingError(err) {
  return Boolean(err) && (err.code === "ENOENT" || err.code === "ENOTDIR");
}

function isAccessError(err) {
  return Boolean(err) && (err.code === "EACCES" || err.code === "EPERM");
}

function joinRel(relPath, name) {
  return relPath === "" ? name : `${relPath}/${name}`;
}

function lastSegment(relPath) {
  const idx = relPath.lastIndexOf("/");
  return idx === -1 ? relPath : relPath.slice(idx + 1);
}

function excerptOf(line) {
  const trimmed = line.trim();
  return trimmed.length > EXCERPT_MAX_LENGTH
    ? `${trimmed.slice(0, EXCERPT_MAX_LENGTH - 3)}...`
    : trimmed;
}

function readTextSafe(absPath, warnings, relPath) {
  try {
    return fs.readFileSync(absPath, "utf8");
  } catch (err) {
    if (isAccessError(err)) {
      warnings.push({
        code: err.code,
        path: relPath,
        message: "Sem permissão para ler o arquivo; ele foi ignorado na detecção.",
      });
      return null;
    }
    if (isMissingError(err)) return null;
    throw err;
  }
}

function depMatches(depName, pattern) {
  if (typeof pattern === "string") return depName === pattern;
  return pattern.test(depName);
}

function anyDepPattern(depName, patterns) {
  return patterns.some((pattern) => depMatches(depName, pattern));
}

// ---------------------------------------------------------------------------
// Varredura de arquivos
// ---------------------------------------------------------------------------

/**
 * Percorre a árvore uma única vez, até `SCAN_MAX_DEPTH` níveis e
 * `SCAN_MAX_FILES` arquivos, ignorando `SCAN_IGNORE_DIRS`. Segue links
 * simbólicos com proteção contra ciclos. Devolve arquivos (com caminho
 * relativo usando "/") e o conjunto de diretórios visitados.
 */
function scanFiles(rootPath, warnings) {
  const files = [];
  const dirs = new Set();
  const visited = new Set();
  let truncated = false;

  function walk(absDir, relDir, depth) {
    let real;
    try {
      real = fs.realpathSync(absDir);
    } catch (err) {
      if (isMissingError(err) || isAccessError(err)) return;
      throw err;
    }
    if (visited.has(real)) return;
    visited.add(real);

    let entries;
    try {
      entries = fs.readdirSync(absDir, { withFileTypes: true });
    } catch (err) {
      if (isMissingError(err)) return;
      if (isAccessError(err)) {
        warnings.push({
          code: err.code,
          path: relDir === "" ? "." : relDir,
          message: "Sem permissão para ler o diretório; ele foi ignorado na detecção.",
        });
        return;
      }
      throw err;
    }
    entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

    for (const entry of entries) {
      if (truncated) return;
      const name = entry.name;
      const childAbs = path.join(absDir, name);
      const childRel = joinRel(relDir, name);
      let isDir = entry.isDirectory();
      let isFile = entry.isFile();
      let size = 0;
      if (entry.isSymbolicLink()) {
        try {
          const st = fs.statSync(childAbs);
          isDir = st.isDirectory();
          isFile = st.isFile();
          size = st.size;
        } catch {
          continue;
        }
      }
      if (isDir) {
        if (SCAN_IGNORE_DIRS.has(name.toLowerCase())) continue;
        dirs.add(childRel);
        if (depth + 1 < SCAN_MAX_DEPTH) walk(childAbs, childRel, depth + 1);
        continue;
      }
      if (!isFile) continue;
      if (files.length >= SCAN_MAX_FILES) {
        truncated = true;
        return;
      }
      if (!entry.isSymbolicLink()) {
        try {
          size = fs.statSync(childAbs).size;
        } catch {
          continue;
        }
      }
      files.push({
        rel: childRel,
        abs: childAbs,
        name,
        dir: relDir,
        depth,
        size,
        ext: path.extname(name).toLowerCase(),
      });
    }
  }

  walk(rootPath, "", 0);
  if (truncated) {
    warnings.push({
      code: "LIMITE_ARQUIVOS",
      path: ".",
      message: `A varredura parou em ${SCAN_MAX_FILES} arquivos; arquivos além desse limite não foram considerados.`,
    });
  }
  return { files, dirs, truncated };
}

// ---------------------------------------------------------------------------
// Manifestos (mestre, iii.1)
// ---------------------------------------------------------------------------

function manifestKind(name) {
  if (name === "package.json") return "package.json";
  if (name === "pom.xml") return "pom.xml";
  if (name === "build.gradle" || name === "build.gradle.kts") return "build.gradle";
  if (/^requirements(-[\w.]+)?\.txt$/.test(name)) return "requirements.txt";
  if (name === "pyproject.toml") return "pyproject.toml";
  if (/\.csproj$/i.test(name)) return "csproj";
  if (/\.sln$/i.test(name)) return "sln";
  if (name === "go.mod") return "go.mod";
  if (name === "Cargo.toml") return "Cargo.toml";
  if (name === "composer.json") return "composer.json";
  return null;
}

function normalizeDepName(name) {
  return String(name).trim().toLowerCase().replace(/_/g, "-");
}

function parsePackageJson(content, deps, warnings, relPath) {
  let pkg;
  try {
    pkg = JSON.parse(content);
  } catch (err) {
    warnings.push({ code: "MANIFESTO_INVALIDO", path: relPath, message: `package.json inválido: ${err.message}` });
    return;
  }
  if (!pkg || typeof pkg !== "object") return;
  for (const scope of ["dependencies", "devDependencies"]) {
    const table = pkg[scope];
    if (!table || typeof table !== "object") continue;
    for (const [name, version] of Object.entries(table)) {
      deps.push({ name: name.toLowerCase(), version: String(version), scope });
    }
  }
}

function parseRequirementsTxt(content, deps) {
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (line === "" || line.startsWith("-")) continue;
    const match = /^([A-Za-z0-9][A-Za-z0-9._-]*)(\[[^\]]*\])?\s*(.*)$/.exec(line);
    if (!match) continue;
    deps.push({ name: normalizeDepName(match[1]), version: match[3] || "", scope: "requirements" });
  }
}

function parsePyprojectToml(content, deps) {
  let section = "";
  const depSection = /^\[(tool\.poetry(\.group\.[\w-]+)?\.(dev-)?dependencies|project\.optional-dependencies|dependency-groups)\]$/;
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    const header = /^\[([^\]]+)\]$/.exec(line);
    if (header) {
      section = header[1];
      continue;
    }
    if (line === "" || line.startsWith("#")) continue;
    // Itens de array: "django>=4.2", 'fastapi[all]'.
    const quoted = /^["']([A-Za-z0-9][A-Za-z0-9._-]*)(\[[^\]]*\])?\s*([^"']*)["']/.exec(line);
    if (quoted && (section === "project" || depSection.test(section) || section === "")) {
      deps.push({ name: normalizeDepName(quoted[1]), version: quoted[3].trim(), scope: section || "project" });
      continue;
    }
    // Chaves de tabela Poetry: django = "^4.2" ou django = { version = ... }.
    const keyed = /^([A-Za-z0-9][A-Za-z0-9._-]*)\s*=\s*(.*)$/.exec(line);
    if (keyed && depSection.test(section) && keyed[1].toLowerCase() !== "python") {
      deps.push({ name: normalizeDepName(keyed[1]), version: keyed[2].trim(), scope: section });
    }
  }
}

function parsePomXml(content, deps) {
  const re = /<dependency>([\s\S]*?)<\/dependency>/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    const block = match[1];
    const groupId = (/<groupId>\s*([^<]+?)\s*<\/groupId>/.exec(block) || [])[1] || "";
    const artifactId = (/<artifactId>\s*([^<]+?)\s*<\/artifactId>/.exec(block) || [])[1];
    const version = (/<version>\s*([^<]+?)\s*<\/version>/.exec(block) || [])[1] || "";
    if (!artifactId) continue;
    deps.push({ name: artifactId.toLowerCase(), version, scope: groupId ? `${groupId}` : "dependency" });
  }
}

function parseBuildGradle(content, deps) {
  const re = /\b(implementation|api|compile|compileOnly|runtimeOnly|testImplementation|annotationProcessor|kapt|developmentOnly)\s*\(?\s*["']([^"']+)["']/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    const parts = match[2].split(":");
    if (parts.length < 2) continue;
    deps.push({ name: parts[1].toLowerCase(), version: parts[2] || "", scope: `${match[1]} ${parts[0]}` });
  }
}

function parseCsproj(content, deps) {
  const re = /<PackageReference\s+Include="([^"]+)"(?:\s+Version="([^"]+)")?/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    deps.push({ name: match[1].toLowerCase(), version: match[2] || "", scope: "PackageReference" });
  }
}

function parseGoMod(content, deps) {
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    const match = /^(?:require\s+)?([A-Za-z0-9][\w.\-/~]*)\s+(v[0-9][\w.\-+]*)/.exec(line);
    if (!match) continue;
    const indirect = /\/\/\s*indirect/.test(line);
    deps.push({ name: match[1].toLowerCase(), version: match[2], scope: indirect ? "require (indirect)" : "require" });
  }
}

function parseCargoToml(content, deps) {
  let section = "";
  const depSection = /^((workspace\.)?(dev-|build-)?dependencies)(\.([\w-]+))?$/;
  const targetSection = /^target\.[^.]+\.(dev-|build-)?dependencies$/;
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    const header = /^\[([^\]]+)\]$/.exec(line);
    if (header) {
      section = header[1];
      const named = depSection.exec(section);
      if (named && named[5]) {
        deps.push({ name: normalizeDepName(named[5]), version: "", scope: named[1] });
      }
      continue;
    }
    if (line === "" || line.startsWith("#")) continue;
    const keyed = /^([A-Za-z0-9][A-Za-z0-9._-]*)\s*=\s*(.*)$/.exec(line);
    if (!keyed) continue;
    const named = depSection.exec(section);
    if ((named && !named[5]) || targetSection.test(section)) {
      deps.push({ name: normalizeDepName(keyed[1]), version: keyed[2].trim(), scope: section });
    }
  }
}

function parseComposerJson(content, deps, warnings, relPath) {
  let pkg;
  try {
    pkg = JSON.parse(content);
  } catch (err) {
    warnings.push({ code: "MANIFESTO_INVALIDO", path: relPath, message: `composer.json inválido: ${err.message}` });
    return;
  }
  if (!pkg || typeof pkg !== "object") return;
  for (const scope of ["require", "require-dev"]) {
    const table = pkg[scope];
    if (!table || typeof table !== "object") continue;
    for (const [name, version] of Object.entries(table)) {
      if (name === "php" || name.startsWith("ext-")) continue;
      deps.push({ name: name.toLowerCase(), version: String(version), scope });
    }
  }
}

function parseManifest(file, kind, warnings) {
  const manifest = { kind, file: file.rel, unit: file.dir, deps: [] };
  if (kind === "sln") return manifest;
  const content = readTextSafe(file.abs, warnings, file.rel);
  if (content === null) return manifest;
  switch (kind) {
    case "package.json":
      parsePackageJson(content, manifest.deps, warnings, file.rel);
      break;
    case "requirements.txt":
      parseRequirementsTxt(content, manifest.deps);
      break;
    case "pyproject.toml":
      parsePyprojectToml(content, manifest.deps);
      break;
    case "pom.xml":
      parsePomXml(content, manifest.deps);
      break;
    case "build.gradle":
      parseBuildGradle(content, manifest.deps);
      break;
    case "csproj":
      parseCsproj(content, manifest.deps);
      break;
    case "go.mod":
      parseGoMod(content, manifest.deps);
      break;
    case "Cargo.toml":
      parseCargoToml(content, manifest.deps);
      break;
    case "composer.json":
      parseComposerJson(content, manifest.deps, warnings, file.rel);
      break;
    default:
      break;
  }
  return manifest;
}

/**
 * Manifestos das unidades de projeto: a raiz, cada app devolvido pelo
 * detector estrutural (`apps[].path`) e as subpastas imediatas de `apps/` e
 * `packages/` que tenham manifesto. Manifestos .NET (`*.csproj`, `*.sln`)
 * costumam ficar em subpastas, então são aceitos até três níveis.
 */
function collectManifests(scan, unitRoots, warnings) {
  const unitSet = new Set(unitRoots);
  const manifests = [];
  for (const file of scan.files) {
    const kind = manifestKind(file.name);
    if (!kind) continue;
    const dotnet = kind === "csproj" || kind === "sln";
    const wrapperChild = /^(apps|packages)\/[^/]+$/.test(file.dir);
    if (!unitSet.has(file.dir) && !wrapperChild && !(dotnet && file.depth <= 3)) continue;
    manifests.push(parseManifest(file, kind, warnings));
  }
  return manifests;
}

// ---------------------------------------------------------------------------
// Busca textual limitada
// ---------------------------------------------------------------------------

function isTextCandidate(file) {
  if (file.size > TEXT_MAX_FILE_BYTES) return false;
  if (TEXT_EXCLUDED_FILES.test(file.rel)) return false;
  return TEXT_EXTENSIONS.has(file.ext) || TEXT_BASENAMES.test(file.name);
}

function ruleAppliesToExt(rule, ext) {
  return !rule.ext || rule.ext.includes(ext);
}

/**
 * Executa todas as regras textuais (capacidades e variante) em uma única
 * passagem pelos arquivos elegíveis. Devolve um mapa `id da regra -> hits`,
 * onde cada hit é `{ file, line, excerpt }`, com no máximo
 * `MAX_EVIDENCE_PER_SIGNAL` hits por regra.
 */
function runTextSearch(scan, warnings) {
  const rules = [];
  for (const slug of CAPABILITIES) {
    CAPABILITY_RULES[slug].text.forEach((rule, i) => {
      rules.push({ id: `${slug}#${i}`, ...rule });
    });
  }
  for (const rule of VARIANT_TEXT_RULES) rules.push(rule);

  const hits = new Map(rules.map((rule) => [rule.id, []]));
  let filesRead = 0;
  let bytesRead = 0;
  let interrupted = false;

  for (const file of scan.files) {
    if (!isTextCandidate(file)) continue;
    if (filesRead >= TEXT_MAX_FILES || bytesRead + file.size > TEXT_MAX_TOTAL_BYTES) {
      interrupted = true;
      break;
    }
    const applicable = rules.filter(
      (rule) => ruleAppliesToExt(rule, file.ext) && hits.get(rule.id).length < MAX_EVIDENCE_PER_SIGNAL
    );
    if (applicable.length === 0) continue;

    const content = readTextSafe(file.abs, warnings, file.rel);
    if (content === null) continue;
    filesRead += 1;
    bytesRead += file.size;

    let lines = null;
    for (const rule of applicable) {
      if (!rule.all.every((re) => re.test(content))) continue;
      if (lines === null) lines = content.split(/\r?\n/);
      const bucket = hits.get(rule.id);
      const first = rule.all[0];
      for (let i = 0; i < lines.length && bucket.length < MAX_EVIDENCE_PER_SIGNAL; i += 1) {
        if (first.test(lines[i])) {
          bucket.push({ file: file.rel, line: i + 1, excerpt: excerptOf(lines[i]) });
        }
      }
      if (bucket.length === 0) {
        // A expressão casou em contexto multilinha; registra o arquivo.
        bucket.push({ file: file.rel, line: null, excerpt: null });
      }
    }
  }

  if (interrupted) {
    warnings.push({
      code: "LIMITE_BUSCA_TEXTUAL",
      path: ".",
      message: `A busca textual parou após ${filesRead} arquivos ou ${Math.round(bytesRead / 1024)} KiB; o restante do código não foi inspecionado.`,
    });
  }
  return hits;
}

// ---------------------------------------------------------------------------
// Pasta de saída (mestre, iii.3)
// ---------------------------------------------------------------------------

function detectOutputDir(rootPath, override) {
  const checked = [];
  let found = null;
  for (const candidate of OUTPUT_DIR_CANDIDATES) {
    let exists = false;
    try {
      exists = fs.statSync(path.join(rootPath, candidate)).isDirectory();
    } catch {
      exists = false;
    }
    checked.push({ dir: `${candidate}/`, exists });
    if (exists && found === null) found = candidate;
  }

  if (override) {
    return {
      outputDir: override,
      evidence: {
        source: "parametro",
        checked,
        found: found ? `${found}/` : null,
        note: `Pasta informada por --saida (${override}); a detecção automática foi sobreposta.`,
      },
    };
  }
  if (found) {
    return {
      outputDir: `${found}/`,
      evidence: {
        source: "detectada",
        checked,
        found: `${found}/`,
        note: `Primeira pasta existente na ordem docs/, documentation/, documentacao/.`,
      },
    };
  }
  return {
    outputDir: `${DEFAULT_OUTPUT_DIR}/`,
    evidence: {
      source: "padrao",
      checked,
      found: null,
      note: "Nenhuma das pastas existe; docs/ é a proposta do mestre (criada na geração).",
    },
  };
}

// ---------------------------------------------------------------------------
// Variante (mestre, iii.4)
// ---------------------------------------------------------------------------

function manifestEvidence(manifest, dep, label) {
  return {
    kind: "manifesto",
    signal: label || dep.name,
    file: manifest.file,
    detail: `${dep.scope}: ${dep.name}${dep.version ? ` ${dep.version}` : ""}`,
  };
}

/**
 * Reúne os sinais usados pela árvore de decisão. Um `package.json` é
 * "aplicacional" quando tem ao menos uma dependência de runtime ou um
 * framework de frontend/backend da lista do mestre; um `package.json` só com
 * ferramentas de desenvolvimento (lint, formatação) não torna um repositório
 * de IaC uma aplicação.
 */
function collectVariantSignals(scan, manifests, structural, textHits) {
  const iac = [];
  for (const file of scan.files) {
    if (/\.(bicep|tf|tfstate)$/i.test(file.name)) {
      iac.push({ kind: "arquivo", signal: `*.${file.ext.slice(1)}`, file: file.rel });
    }
  }
  for (const id of ["ansible-playbook", "cloudformation"]) {
    const rule = VARIANT_TEXT_RULES.find((r) => r.id === id);
    for (const hit of textHits.get(id) || []) {
      iac.push({ kind: "texto", signal: rule.label, file: hit.file, line: hit.line, excerpt: hit.excerpt });
    }
  }

  const applicationManifests = [];
  const frontend = [];
  const backend = [];

  for (const manifest of manifests) {
    const names = manifest.deps.map((d) => d.name);
    switch (manifest.kind) {
      case "package.json": {
        const front = manifest.deps.filter((d) => FRONTEND_DEPS.includes(d.name));
        const back = manifest.deps.filter((d) => BACKEND_JS_DEPS.includes(d.name));
        const runtime = manifest.deps.filter((d) => d.scope === "dependencies");
        const aplicacional = runtime.length > 0 || front.length > 0 || back.length > 0;
        applicationManifests.push({
          kind: "manifesto",
          signal: "package.json",
          file: manifest.file,
          aplicacional,
          detail: aplicacional
            ? `${runtime.length} dependência(s) de runtime`
            : "sem dependências de runtime nem framework reconhecido (não aplicacional)",
        });
        front.forEach((d) => frontend.push(manifestEvidence(manifest, d)));
        back.forEach((d) => backend.push(manifestEvidence(manifest, d)));
        break;
      }
      case "pom.xml":
      case "build.gradle":
      case "csproj":
      case "sln":
        applicationManifests.push({ kind: "manifesto", signal: manifest.kind, file: manifest.file, aplicacional: true, detail: "manifesto backend não-JS" });
        backend.push({ kind: "manifesto", signal: manifest.kind, file: manifest.file, detail: "manifesto backend não-JS (JVM/.NET)" });
        break;
      case "requirements.txt":
      case "pyproject.toml": {
        applicationManifests.push({ kind: "manifesto", signal: manifest.kind, file: manifest.file, aplicacional: true, detail: `${names.length} dependência(s)` });
        manifest.deps
          .filter((d) => PYTHON_BACKEND_DEPS.includes(d.name))
          .forEach((d) => backend.push(manifestEvidence(manifest, d)));
        break;
      }
      case "go.mod": {
        applicationManifests.push({ kind: "manifesto", signal: manifest.kind, file: manifest.file, aplicacional: true, detail: `${names.length} módulo(s) requerido(s)` });
        manifest.deps
          .filter((d) => anyDepPattern(d.name, GO_HTTP_DEPS))
          .forEach((d) => backend.push(manifestEvidence(manifest, d)));
        break;
      }
      case "composer.json": {
        applicationManifests.push({ kind: "manifesto", signal: manifest.kind, file: manifest.file, aplicacional: true, detail: `${names.length} dependência(s)` });
        manifest.deps
          .filter((d) => PHP_BACKEND_DEPS.includes(d.name))
          .forEach((d) => backend.push(manifestEvidence(manifest, d)));
        break;
      }
      case "Cargo.toml": {
        applicationManifests.push({ kind: "manifesto", signal: manifest.kind, file: manifest.file, aplicacional: true, detail: `${names.length} dependência(s)` });
        manifest.deps
          .filter((d) => RUST_BACKEND_DEPS.includes(d.name))
          .forEach((d) => backend.push(manifestEvidence(manifest, d)));
        break;
      }
      default:
        break;
    }
  }

  const goHttp = VARIANT_TEXT_RULES.find((r) => r.id === "go-net-http");
  if (manifests.some((m) => m.kind === "go.mod")) {
    for (const hit of textHits.get("go-net-http") || []) {
      backend.push({ kind: "texto", signal: goHttp.label, file: hit.file, line: hit.line, excerpt: hit.excerpt });
    }
  }

  const appRoots = Array.isArray(structural.apps) ? structural.apps.map((a) => a.path) : [];
  for (const appPath of appRoots) {
    const name = lastSegment(appPath).toLowerCase();
    if (FRONTEND_APP_NAMES.has(name)) {
      frontend.push({ kind: "estrutura", signal: `app ${name}`, file: appPath, detail: "nome de app típico de frontend (mestre iii.4, item 4)" });
    }
    if (BACKEND_APP_NAMES.has(name)) {
      backend.push({ kind: "estrutura", signal: `app ${name}`, file: appPath, detail: "nome de app típico de backend (mestre iii.4, item 4)" });
    }
  }

  const scripts = [];
  for (const dirName of SCRIPT_DIRS) {
    if (!scan.dirs.has(dirName)) continue;
    const count = scan.files.filter((f) => f.dir === dirName || f.dir.startsWith(`${dirName}/`)).length;
    if (count > 0) {
      scripts.push({ kind: "diretorio", signal: `${dirName}/`, file: dirName, detail: `${count} arquivo(s)` });
    }
  }
  const entryFiles = scan.files.filter(
    (f) => f.dir === "" && ENTRY_FILE_EXTENSIONS.has(f.ext) && !ENTRY_FILE_EXCLUDED.test(f.name)
  );
  for (const f of entryFiles) {
    scripts.push({ kind: "arquivo", signal: "arquivo executável de entrada na raiz", file: f.rel });
  }

  const directories = [];
  for (const dirName of ["apps", "packages", "src", "pages", "app", "infra", "bicep", "scripts", "bin", "cmd"]) {
    if (scan.dirs.has(dirName)) directories.push(`${dirName}/`);
  }

  return {
    iac,
    applicationManifests,
    frontend,
    backend,
    scripts,
    entryFileCount: entryFiles.length,
    directories,
  };
}

function summarize(list, max = 3) {
  const items = list.slice(0, max).map((e) => (e.detail ? `${e.file} (${e.detail})` : e.file));
  const rest = list.length > max ? ` e mais ${list.length - max}` : "";
  return items.join(", ") + rest;
}

/**
 * Árvore de decisão do mestre (iii.4), aplicada em ordem; para na primeira
 * regra que casa. Devolve a variante (ou `null`), os candidatos quando nada
 * casa e a evidência de cada regra testada.
 */
function decideVariant(signals) {
  const appManifests = signals.applicationManifests.filter((m) => m.aplicacional);
  const hasIac = signals.iac.length > 0;
  const hasApp = appManifests.length > 0;
  const hasFrontendDeps = signals.frontend.some((e) => e.kind === "manifesto");
  const hasFrontend = signals.frontend.length > 0;
  const hasBackend = signals.backend.length > 0;
  const hasScripts = signals.scripts.some((e) => e.kind === "diretorio") || signals.entryFileCount === 1;

  const rules = [
    {
      order: 1,
      variant: "iac",
      matched: hasIac && !hasApp,
      reason: !hasIac
        ? "nenhum manifesto de IaC (*.bicep, *.tf, playbook Ansible, CloudFormation)"
        : hasApp
          ? `há IaC (${summarize(signals.iac)}), mas também manifesto de aplicação (${summarize(appManifests)})`
          : `IaC presente (${summarize(signals.iac)}) e nenhum manifesto de aplicação`,
    },
    {
      order: 2,
      variant: "frontend-site",
      matched: hasFrontendDeps && !hasBackend,
      reason: !hasFrontendDeps
        ? "nenhum package.json com next, nuxt, vite, svelte ou astro"
        : hasBackend
          ? `frontend (${summarize(signals.frontend)}) com backend acoplado (${summarize(signals.backend)})`
          : `frontend (${summarize(signals.frontend)}) sem backend acoplado`,
    },
    {
      order: 3,
      variant: "backend-api",
      matched: hasBackend && !hasFrontend,
      reason: !hasBackend
        ? "nenhum framework backend em package.json nem manifesto backend não-JS"
        : hasFrontend
          ? `backend (${summarize(signals.backend)}) com frontend acoplado (${summarize(signals.frontend)})`
          : `backend (${summarize(signals.backend)}) sem frontend acoplado`,
    },
    {
      order: 4,
      variant: "full-stack-web",
      matched: hasFrontend && hasBackend,
      reason: hasFrontend && hasBackend
        ? `frontend (${summarize(signals.frontend)}) e backend (${summarize(signals.backend)}) no mesmo repositório`
        : "não há frontend e backend simultaneamente",
    },
    {
      order: 5,
      variant: "automacao-script",
      matched: !hasApp && !hasIac && hasScripts,
      reason: hasApp || hasIac
        ? "há manifesto de aplicação ou de IaC"
        : hasScripts
          ? `sem manifestos; scripts em ${summarize(signals.scripts)}`
          : signals.entryFileCount > 1
            ? `sem manifestos nem scripts/, bin/, cmd/; ${signals.entryFileCount} arquivos executáveis na raiz (o mestre exige um único)`
            : "sem manifestos e sem scripts/, bin/, cmd/ nem arquivo executável único na raiz",
    },
  ];

  const matched = rules.find((r) => r.matched) || null;
  return {
    variant: matched ? matched.variant : null,
    variantCandidates: matched ? [] : [...VARIANTS],
    evidence: {
      matchedRule: matched ? matched.order : null,
      rules: rules.map((r) => ({ order: r.order, variant: r.variant, matched: r.matched, reason: r.reason })),
      signals: {
        iac: signals.iac,
        applicationManifests: signals.applicationManifests,
        frontend: signals.frontend,
        backend: signals.backend,
        scripts: signals.scripts,
        directories: signals.directories,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Capacidades (mestre, iv)
// ---------------------------------------------------------------------------

function matchedCapabilitiesForDep(depName) {
  return CAPABILITIES.filter((slug) => anyDepPattern(depName, CAPABILITY_RULES[slug].deps));
}

/**
 * Para cada capacidade, reúne sinais de manifesto, de arquivo e de texto.
 * Um sinal basta para ativar (viés do mestre: documentar a mais). Uma
 * dependência de SDK genérico de nuvem só conta como integração externa
 * quando não é reivindicada por capacidade mais específica (por exemplo,
 * `@aws-sdk/client-s3` é storage, não integração).
 */
function detectCapabilities(scan, manifests, textHits) {
  const evidence = {};
  for (const slug of CAPABILITIES) evidence[slug] = [];

  for (const manifest of manifests) {
    const seen = new Set();
    for (const dep of manifest.deps) {
      if (seen.has(dep.name)) continue;
      seen.add(dep.name);
      let slugs = matchedCapabilitiesForDep(dep.name);
      if (slugs.length > 1 && slugs.includes("integracoes-externas")) {
        slugs = slugs.filter((s) => s !== "integracoes-externas");
      }
      for (const slug of slugs) {
        if (evidence[slug].filter((e) => e.kind === "manifesto").length >= MAX_EVIDENCE_PER_SIGNAL * 2) continue;
        evidence[slug].push(manifestEvidence(manifest, dep));
      }
    }
  }

  for (const slug of CAPABILITIES) {
    const rule = CAPABILITY_RULES[slug];
    for (const fileRule of rule.files) {
      let count = 0;
      const seenDirs = new Set();
      for (const file of scan.files) {
        if (count >= MAX_EVIDENCE_PER_SIGNAL) break;
        const match = fileRule.re.exec(file.rel);
        if (!match) continue;
        // Para padrões de pasta, registra a pasta uma vez, não cada arquivo.
        const key = fileRule.re.source.includes("(\\/|$)")
          ? file.rel.slice(0, match.index + match[0].length).replace(/\/$/, "")
          : file.rel;
        if (seenDirs.has(key)) continue;
        seenDirs.add(key);
        evidence[slug].push({ kind: "arquivo", signal: fileRule.label, file: key });
        count += 1;
      }
    }
    rule.text.forEach((textRule, i) => {
      for (const hit of textHits.get(`${slug}#${i}`) || []) {
        evidence[slug].push({ kind: "texto", signal: textRule.label, file: hit.file, line: hit.line, excerpt: hit.excerpt });
      }
    });
  }

  const capabilities = CAPABILITIES.filter((slug) => evidence[slug].length > 0);
  return { capabilities, evidence };
}

// ---------------------------------------------------------------------------
// Seções por nível (mestre, vi.2)
// ---------------------------------------------------------------------------

/**
 * Nomes reais dos arquivos de `padtec/templates/nucleo/`: primeiro a cópia
 * dentro do projeto destino, depois a do repositório-fonte (irmão de
 * `ferramentas/`), e por fim a lista embutida.
 */
function resolveSectionFiles(rootPath) {
  const candidates = [
    path.join(rootPath, "padtec", "templates", "nucleo"),
    path.resolve(__dirname, "..", "..", "..", "padtec", "templates", "nucleo"),
  ];
  for (const dir of candidates) {
    let names;
    try {
      names = fs.readdirSync(dir).filter((n) => /^\d{2}-.+\.md$/.test(n)).sort();
    } catch {
      continue;
    }
    if (names.length > 0) return names;
  }
  return [...CORE_SECTION_FALLBACK];
}

function sectionsForLevel(level, sectionFiles) {
  if (!level) return [];
  const numbers = new Set(LEVEL_SECTION_NUMBERS[level]);
  return sectionFiles.filter((name) => numbers.has(name.slice(0, 2)));
}

function conditionalSectionsFor(level, capabilities) {
  if (level !== "L2" && level !== "L3") return [];
  return capabilities.map((slug) => `condicional-${slug}.md`);
}

// ---------------------------------------------------------------------------
// Ponto de entrada da biblioteca
// ---------------------------------------------------------------------------

function readPadtecVersion(rootPath) {
  try {
    const raw = fs.readFileSync(path.join(rootPath, "padtec", "VERSION"), "utf8").trim();
    return raw === "" ? null : raw;
  } catch {
    return null;
  }
}

function normalizeLevel(level) {
  if (level === undefined || level === null || level === "") return null;
  const upper = String(level).toUpperCase();
  if (!LEVELS.includes(upper)) {
    const err = new Error(`Nível inválido: ${level}. Use L1, L2 ou L3.`);
    err.code = "ERR_NIVEL_INVALIDO";
    throw err;
  }
  return upper;
}

/**
 * Executa a detecção completa e devolve o objeto do `context.json`.
 *
 * `projectRootInput` é o caminho como informado (relativo ou absoluto);
 * `options.level` é `L1|L2|L3` ou nulo; `options.outputDir` sobrepõe a
 * detecção da pasta de saída. Lança `Error` com `code = "ERR_PROJETO_INVALIDO"`
 * quando a raiz não existe ou não é diretório, e `ERR_NIVEL_INVALIDO` para
 * nível fora do conjunto.
 */
function detect(projectRootInput, options = {}) {
  const level = normalizeLevel(options.level);
  const rootPath = path.resolve(projectRootInput);

  const problem = validateProjectRoot(rootPath);
  if (problem) {
    const err = new Error(problem);
    err.code = "ERR_PROJETO_INVALIDO";
    throw err;
  }

  const warnings = [];
  const structural = detectStructuralPattern(rootPath);
  const scan = scanFiles(rootPath, warnings);
  const appRoots = Array.isArray(structural.apps) ? structural.apps.map((a) => a.path) : [];
  const manifests = collectManifests(scan, ["", ...appRoots], warnings);
  const textHits = runTextSearch(scan, warnings);

  const output = detectOutputDir(rootPath, options.outputDir || null);
  const variantSignals = collectVariantSignals(scan, manifests, structural, textHits);
  const variantDecision = decideVariant(variantSignals);
  const capabilityResult = detectCapabilities(scan, manifests, textHits);
  const sectionFiles = resolveSectionFiles(rootPath);

  if (variantDecision.variant === null) {
    warnings.push({
      code: "VARIANTE_INDETERMINADA",
      path: ".",
      message: "Nenhuma regra da árvore de decisão casou; o agente deve perguntar ao usuário qual variante usar.",
    });
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    padtecVersion: readPadtecVersion(rootPath),
    generatedAt: new Date().toISOString(),
    projectRoot: projectRootInput,
    projectRootResolved: rootPath,
    outputDir: output.outputDir,
    level,
    variant: variantDecision.variant,
    variantCandidates: variantDecision.variantCandidates,
    capabilities: capabilityResult.capabilities,
    monorepo: {
      active: structural.structuralPattern === "monorepo-apps-e-pacotes",
      apps: appRoots,
    },
    structuralPattern: structural,
    sections: sectionsForLevel(level, sectionFiles),
    conditionalSections: conditionalSectionsFor(level, capabilityResult.capabilities),
    evidence: {
      variant: variantDecision.evidence,
      capabilities: capabilityResult.evidence,
      outputDir: output.evidence,
    },
    warnings,
  };
}

// ---------------------------------------------------------------------------
// Relatório em Markdown
// ---------------------------------------------------------------------------

function mdCell(value) {
  return String(value === null || value === undefined ? "" : value).replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function formatEvidenceItem(item) {
  const where = item.line ? `${item.file}:${item.line}` : item.file;
  const extra = item.excerpt ? ` — \`${mdCell(item.excerpt)}\`` : item.detail ? ` — ${mdCell(item.detail)}` : "";
  return `\`${mdCell(where)}\`${extra}`;
}

function renderReport(context) {
  const lines = [];
  const structural = context.structuralPattern;
  const level = context.level || "não informado";

  lines.push("# Relatório de detecção — padtec detect");
  lines.push("");
  lines.push(`Gerado em ${context.generatedAt} para \`${mdCell(context.projectRoot)}\` (schema ${context.schemaVersion}, pacote PADTec ${context.padtecVersion || "não encontrado em padtec/VERSION"}).`);
  lines.push("");
  lines.push("## Resumo");
  lines.push("");
  lines.push("| Item | Valor |");
  lines.push("|---|---|");
  lines.push(`| Variante | ${context.variant ? `\`${context.variant}\`` : "indeterminada (candidatas: " + context.variantCandidates.map((v) => `\`${v}\``).join(", ") + ")"} |`);
  lines.push(`| Nível | ${level} |`);
  lines.push(`| Pasta de saída | \`${mdCell(context.outputDir)}\` (${context.evidence.outputDir.source}) |`);
  lines.push(`| Padrão estrutural | \`${structural.structuralPattern}\`${structural.evidence.length ? ` — ${structural.evidence.map((e) => `\`${mdCell(e)}\``).join(", ")}` : ""} |`);
  lines.push(`| Monorepo | ${context.monorepo.active ? `sim (${context.monorepo.apps.map((a) => `\`${mdCell(a)}\``).join(", ")})` : "não"} |`);
  lines.push(`| Capacidades ativas | ${context.capabilities.length ? context.capabilities.map((c) => `\`${c}\``).join(", ") : "nenhuma"} |`);
  lines.push(`| Seções do núcleo | ${context.sections.length ? context.sections.map((s) => `\`${s}\``).join(", ") : "nenhuma (nível não informado)"} |`);
  lines.push(`| Seções condicionais | ${context.conditionalSections.length ? context.conditionalSections.map((s) => `\`${s}\``).join(", ") : "nenhuma"} |`);
  lines.push("");

  lines.push("## Evidências por decisão");
  lines.push("");
  lines.push("### Variante (árvore de decisão do mestre, iii.4)");
  lines.push("");
  lines.push("| Ordem | Variante | Resultado | Motivo |");
  lines.push("|---|---|---|---|");
  for (const rule of context.evidence.variant.rules) {
    lines.push(`| ${rule.order} | \`${rule.variant}\` | ${rule.matched ? "casou" : "não casou"} | ${mdCell(rule.reason)} |`);
  }
  lines.push("");
  const signals = context.evidence.variant.signals;
  const signalGroups = [
    ["Manifestos de IaC", signals.iac],
    ["Manifestos de aplicação", signals.applicationManifests],
    ["Sinais de frontend", signals.frontend],
    ["Sinais de backend", signals.backend],
    ["Scripts", signals.scripts],
  ];
  for (const [title, items] of signalGroups) {
    if (!items.length) continue;
    lines.push(`**${title}:**`);
    lines.push("");
    for (const item of items) lines.push(`- ${formatEvidenceItem(item)}`);
    lines.push("");
  }
  if (signals.directories.length) {
    lines.push(`**Diretórios de convenção presentes:** ${signals.directories.map((d) => `\`${d}\``).join(", ")}`);
    lines.push("");
  }

  lines.push("### Capacidades (tabela do mestre, iv)");
  lines.push("");
  lines.push("| Capacidade | Situação | Sinais encontrados |");
  lines.push("|---|---|---|");
  for (const slug of CAPABILITIES) {
    const items = context.evidence.capabilities[slug] || [];
    const active = context.capabilities.includes(slug);
    const shown = items.slice(0, 3).map(formatEvidenceItem).join("<br>");
    const rest = items.length > 3 ? `<br>e mais ${items.length - 3}` : "";
    lines.push(`| \`${slug}\` | ${active ? "ativa" : "inativa"} | ${shown || "nenhum"}${rest} |`);
  }
  lines.push("");

  lines.push("### Pasta de saída (mestre, iii.3)");
  lines.push("");
  const out = context.evidence.outputDir;
  lines.push(`- Origem: ${out.source}.`);
  lines.push(`- Verificadas: ${out.checked.map((c) => `\`${c.dir}\` (${c.exists ? "existe" : "não existe"})`).join(", ")}.`);
  lines.push(`- ${mdCell(out.note)}`);
  lines.push("");

  lines.push("## Avisos");
  lines.push("");
  const allWarnings = [
    ...context.warnings.map((w) => ({ ...w, origin: "detect" })),
    ...(structural.warnings || []).map((w) => ({ ...w, origin: "detector estrutural" })),
  ];
  if (allWarnings.length === 0) {
    lines.push("Nenhum aviso.");
  } else {
    for (const w of allWarnings) {
      lines.push(`- [${w.origin}] ${w.code} em \`${mdCell(w.path)}\`: ${mdCell(w.message)}`);
    }
  }
  lines.push("");
  lines.push("## Próximo passo");
  lines.push("");
  lines.push("As detecções acima são heurísticas. O agente deve confirmá-las ao executar o prompt mestre (`padtec/prompts/00-mestre.md`), em especial a variante, as capacidades ativas e a pasta de saída, antes de despachar os sub-prompts.");
  lines.push("");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Gravação em <raiz>/.padtec/run/
// ---------------------------------------------------------------------------

function writeRunArtifacts(context, report) {
  const runDir = path.join(context.projectRootResolved, RUN_DIR);
  fs.mkdirSync(runDir, { recursive: true });
  const contextPath = path.join(runDir, CONTEXT_FILE);
  const reportPath = path.join(runDir, REPORT_FILE);
  fs.writeFileSync(contextPath, `${JSON.stringify(context, null, 2)}\n`, "utf8");
  fs.writeFileSync(reportPath, report, "utf8");
  return { runDir, contextPath, reportPath };
}

module.exports = {
  detect,
  renderReport,
  writeRunArtifacts,
  SCHEMA_VERSION,
  LEVELS,
  VARIANTS,
  CAPABILITIES,
  OUTPUT_DIR_CANDIDATES,
  DEFAULT_OUTPUT_DIR,
  RUN_DIR,
  CONTEXT_FILE,
  REPORT_FILE,
  LEVEL_SECTION_NUMBERS,
};
