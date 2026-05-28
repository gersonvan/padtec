APM_RULES {

## Idioma e tom

Todo conteúdo escrito por qualquer Worker é em português do Brasil com acentuação correta e ortografia conforme a norma padrão. O tom é técnico-formal. Emojis decorativos são proibidos; ícones funcionais (por exemplo, `✅` e `❌` em checklists) são permitidos exclusivamente quando carregam significado funcional.

## Fronteiras de escrita

Toda escrita que compõe o produto final ocorre dentro da árvore `padtec/` na raiz do workspace. Artefatos internos de coordenação e memória de execução produzidos por Tasks (índices, esqueletos, logs) ficam em `.apm/memory/stage-<N>/`, onde `<N>` é o número do Stage corrente. Nenhuma escrita ocorre fora dessas duas áreas. Qualquer arquivo dentro de `Projetos AVP/` (um nível acima do workspace) é estritamente somente leitura — modificação acidental é violação de escopo.

## Independência de stack no núcleo

Templates e prompts classificados como **núcleo** — isto é, todos os arquivos sob `padtec/templates/` (excluindo subpastas `condicionais/`) e todos os arquivos sob `padtec/prompts/secoes/` — não devem conter nomes de frameworks, bibliotecas, runtimes ou produtos específicos. Termos como NestJS, Next.js, Express, Django, Spring, SQL Server, PostgreSQL, Redis, TypeORM, Prisma, Bull, RabbitMQ e equivalentes são proibidos nesses arquivos. Exemplos de stack são permitidos exclusivamente em arquivos sob `padtec/prompts/variantes/`, `padtec/prompts/extensoes/` e `padtec/templates/*/condicionais/`, onde a especificidade técnica faz parte da intenção do artefato.

## Prompts assumem tool-calling nativo

Prompts e sub-prompts escritos em `padtec/prompts/` são endereçados a um agente com tool-calling nativo (GitHub Copilot Chat no VS Code) que lê arquivos do projeto destino diretamente. É proibido instruir o usuário humano a colar trechos de código, conteúdo de arquivo ou saída de comando dentro do chat. Frases como "cole aqui", "informe o conteúdo de", "copie e cole" não devem aparecer nesses arquivos. Instruções de leitura são endereçadas ao agente.

## Referências internas relativas e autocontenção do pacote

Toda referência entre arquivos sob `padtec/` usa caminho relativo à raiz `padtec/`. Caminhos absolutos do sistema de arquivos do desenvolvedor são proibidos. Arquivos do pacote PADTec não devem referenciar o Spec, o Plan, o Tracker ou qualquer artefato APM desta sessão — o pacote é distribuído por cópia para projetos destino e, no momento da execução, não tem acesso a esses documentos. Toda informação necessária para um arquivo do pacote ser entendido ou executado deve estar dentro do próprio pacote.

## Convenções de commit

Mensagens de commit em português do Brasil, no formato `<tipo>: <descrição imperativa>`, com tipos `feat`, `fix`, `refactor`, `docs`, `test`, `chore`. A descrição é curta, no imperativo, com acentuação correta (ex.: `feat: cria esqueleto canônico de seções`, `docs: redige guia humano inicial do pacote`). Identificadores APM (números de Task, Stage, nomes de agente) não aparecem em mensagens de commit nem em nomes de branch — esses refletem o trabalho real, não o framework de coordenação.

} //APM_RULES
