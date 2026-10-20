#!/usr/bin/env node
"use strict";

/**
 * Detecção do padrão estrutural de um projeto (campo `structuralPattern`),
 * base do futuro comando `padtec detect`.
 *
 * Classifica a raiz informada em um dos valores de `STRUCTURAL_PATTERNS`:
 *
 *   - "monorepo-apps-e-pacotes": duas ou mais raízes de app, cada uma com
 *     manifesto próprio, seja dentro de `apps/`/`packages/`, seja como
 *     pastas irmãs quando a própria raiz não tem manifesto. Cada app é
 *     classificado individualmente em `apps[]`.
 *   - "modular-por-dominio": alguma pasta `modules/`, `features/`,
 *     `domains/`, `contexts/` ou `bounded-contexts/` com pelo menos dois
 *     subdiretórios de domínio.
 *   - "mvc-classico": pasta `controller(s)/` correlacionada com
 *     `model(s)/` ou `view(s)/` sob a mesma raiz de app (mesmo primeiro
 *     segmento do caminho relativo).
 *   - "indefinido": nenhuma das convenções acima.
 *
 * A varredura é única por raiz (projeto ou app): percorre a árvore uma vez,
 * até `MAX_DEPTH` níveis, seguindo links simbólicos para diretório com
 * proteção contra ciclos, e as heurísticas consultam o índice resultante.
 *
 * Uso como CLI: node structural-pattern-detection.js <caminho-do-projeto>
 * Códigos de saída: 0 (detecção concluída), 2 (caminho inválido), 1 (erro
 * inesperado). O contrato de saída está documentado em ferramentas/cli/README.md.
 */

const fs = require("fs");
const path = require("path");

const STRUCTURAL_PATTERNS = Object.freeze([
  "mvc-classico",
  "modular-por-dominio",
  "monorepo-apps-e-pacotes",
  "indefinido",
]);

/**
 * Profundidade máxima (em segmentos a partir da raiz) de um diretório que
 * ainda conta como evidência. Sete níveis cobrem o layout Java/Maven
 * `src/main/java/com/empresa/app/controller`.
 */
const MAX_DEPTH = 7;

/**
 * Pastas ruidosas (dependências, saída de build, cache, dados). A comparação
 * é feita em minúsculas, então `Build/` e `Vendor/` também são ignoradas.
 * A lista NÃO se aplica ao nível imediato de `apps/` e `packages/` na raiz:
 * um app chamado `storage` ou `bin` continua sendo um app.
 */
const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".apm",
  "dist",
  "build",
  "vendor",
  "storage",
  "wwwroot",
  ".next",
  "coverage",
  "venv",
  ".venv",
  "__pycache__",
  "bin",
  "obj",
  "target",
]);

/** Pastas wrapper de workspace cujo conteúdo imediato são raízes de app. */
const WRAPPER_DIRS = ["apps", "packages"];

/** Nomes de manifesto que marcam uma pasta como raiz de app/pacote. */
const MANIFEST_NAMES = new Set([
  "package.json",
  "composer.json",
  "requirements.txt",
  "pyproject.toml",
  "go.mod",
  "pom.xml",
  "build.gradle",
  "build.gradle.kts",
  "Cargo.toml",
]);

/** Manifestos identificados por extensão (.NET). */
const MANIFEST_EXTENSIONS = /\.(csproj|sln)$/i;

const MODULAR_DIR_NAMES = [
  "modules",
  "features",
  "domains",
  "contexts",
  "bounded-contexts",
];

/**
 * Subpastas que não contam como domínio dentro de uma pasta modular.
 * `features/step_definitions` e `features/support` são a convenção do
 * Cucumber, não uma organização por domínio.
 */
const MODULAR_IGNORED_CHILDREN = new Set(["step_definitions", "support"]);

/** Mínimo de subdiretórios de domínio para uma pasta modular contar. */
const MIN_MODULAR_CHILDREN = 2;

const CONTROLLER_DIR_NAMES = ["controller", "controllers"];
const MODEL_OR_VIEW_DIR_NAMES = ["model", "models", "view", "views"];

function isMissingError(err) {
  return Boolean(err) && (err.code === "ENOENT" || err.code === "ENOTDIR");
}

function isAccessError(err) {
  return Boolean(err) && (err.code === "EACCES" || err.code === "EPERM");
}

function pushAccessWarning(warnings, relPath, err) {
  warnings.push({
    code: err.code,
    path: relPath === "" ? "." : relPath,
    message: "Sem permissão para ler o diretório; ele foi ignorado na detecção.",
  });
}

function lastSegment(relPath) {
  const idx = relPath.lastIndexOf("/");
  return idx === -1 ? relPath : relPath.slice(idx + 1);
}

function firstSegment(relPath) {
  const idx = relPath.indexOf("/");
  return idx === -1 ? relPath : relPath.slice(0, idx);
}

function joinRel(relPath, name) {
  return relPath === "" ? name : `${relPath}/${name}`;
}

function isDirectoryFollowingSymlink(fullPath, dirent) {
  if (dirent.isDirectory()) return true;
  if (dirent.isSymbolicLink()) {
    try {
      return fs.statSync(fullPath).isDirectory();
    } catch (err) {
      // Link quebrado ou alvo inacessível: não é um diretório utilizável.
      if (isMissingError(err) || isAccessError(err)) return false;
      throw err;
    }
  }
  return false;
}

/**
 * Lista, em ordem alfabética, os subdiretórios de `dirPath`, seguindo links
 * simbólicos para diretório. Caminho inexistente ou que não é diretório
 * resulta em lista vazia; falta de permissão vira um aviso em `warnings`.
 *
 * `applyIgnore = false` desliga a lista `IGNORE_DIRS` (usado no nível
 * imediato de `apps/` e `packages/`).
 */
function listDirs(dirPath, { relPath = "", warnings = [], applyIgnore = true } = {}) {
  let entries;
  try {
    entries = fs.readdirSync(dirPath, { withFileTypes: true });
  } catch (err) {
    if (isMissingError(err)) return [];
    if (isAccessError(err)) {
      pushAccessWarning(warnings, relPath, err);
      return [];
    }
    throw err;
  }
  const result = [];
  for (const entry of entries) {
    if (applyIgnore && IGNORE_DIRS.has(entry.name.toLowerCase())) continue;
    const fullPath = path.join(dirPath, entry.name);
    if (isDirectoryFollowingSymlink(fullPath, entry)) {
      result.push(entry.name);
    }
  }
  result.sort();
  return result;
}

function hasManifest(dirPath, { relPath = "", warnings = [] } = {}) {
  let entries;
  try {
    entries = fs.readdirSync(dirPath);
  } catch (err) {
    if (isMissingError(err)) return false;
    if (isAccessError(err)) {
      pushAccessWarning(warnings, relPath, err);
      return false;
    }
    throw err;
  }
  return entries.some(
    (name) => MANIFEST_NAMES.has(name) || MANIFEST_EXTENSIONS.test(name)
  );
}

/**
 * Varredura única da árvore sob `rootPath`, limitada a `MAX_DEPTH` níveis.
 * Devolve um índice `caminho relativo (com "/") -> subdiretórios` em ordem
 * de visita (busca em profundidade, filhos em ordem alfabética), o que
 * torna a saída determinística. A chave `""` é a própria raiz.
 *
 * Segue links simbólicos para diretório e usa o caminho real resolvido para
 * não reentrar no mesmo diretório físico (proteção contra ciclos).
 */
function scanTree(rootPath, warnings) {
  const index = new Map();
  const visitedRealPaths = new Set();

  function walk(currentPath, relPath, depth) {
    let realCurrentPath;
    try {
      realCurrentPath = fs.realpathSync(currentPath);
    } catch (err) {
      if (isMissingError(err)) return;
      if (isAccessError(err)) {
        pushAccessWarning(warnings, relPath, err);
        return;
      }
      throw err;
    }
    if (visitedRealPaths.has(realCurrentPath)) return;
    visitedRealPaths.add(realCurrentPath);

    const isRootWrapper =
      depth === 1 && WRAPPER_DIRS.includes(lastSegment(relPath).toLowerCase());
    const children = listDirs(currentPath, {
      relPath,
      warnings,
      applyIgnore: !isRootWrapper,
    });
    index.set(relPath, children);

    if (depth + 1 > MAX_DEPTH) return;
    for (const name of children) {
      walk(path.join(currentPath, name), joinRel(relPath, name), depth + 1);
    }
  }

  walk(rootPath, "", 0);
  return index;
}

/** Caminhos do índice cujo último segmento (em minúsculas) está em `names`. */
function dirsNamed(index, names) {
  const targets = new Set(names.map((n) => n.toLowerCase()));
  const matches = [];
  for (const relPath of index.keys()) {
    if (relPath === "") continue;
    if (targets.has(lastSegment(relPath).toLowerCase())) matches.push(relPath);
  }
  return matches;
}

/**
 * Raízes de app dentro das pastas wrapper `apps/` e `packages/` da raiz.
 * Só conta a subpasta que tem manifesto próprio: um projeto Django com
 * `apps/users` e `apps/billing` (módulos, não apps independentes) não é
 * monorepo. A lista de pastas ignoradas não vale neste nível.
 */
function findWrapperAppRoots(rootPath, warnings) {
  const roots = [];
  for (const workspaceDir of WRAPPER_DIRS) {
    const workspacePath = path.join(rootPath, workspaceDir);
    const units = listDirs(workspacePath, {
      relPath: workspaceDir,
      warnings,
      applyIgnore: false,
    });
    for (const unit of units) {
      const unitRel = joinRel(workspaceDir, unit);
      if (hasManifest(path.join(workspacePath, unit), { relPath: unitRel, warnings })) {
        roots.push(unitRel);
      }
    }
  }
  return roots;
}

/**
 * Raízes de app como pastas irmãs na raiz do projeto, cada uma com seu
 * próprio manifesto (padrão "api/ + front/" sem pasta wrapper).
 *
 * Só é avaliado quando a própria raiz não tem manifesto: se a raiz já é um
 * projeto ou solução coesa (um `.sln` com vários `.csproj` internos, um
 * `composer.json` de app Laravel), as pastas internas não são apps
 * independentes.
 */
function findSiblingAppRoots(rootPath, warnings) {
  if (hasManifest(rootPath, { relPath: "", warnings })) return [];
  return listDirs(rootPath, { relPath: "", warnings }).filter((name) =>
    hasManifest(path.join(rootPath, name), { relPath: name, warnings })
  );
}

function detectAppRoots(rootPath, warnings) {
  const wrapperRoots = findWrapperAppRoots(rootPath, warnings);
  if (wrapperRoots.length > 0) return wrapperRoots;
  return findSiblingAppRoots(rootPath, warnings);
}

/**
 * Modular por domínio: pasta com nome em `MODULAR_DIR_NAMES` contendo ao
 * menos `MIN_MODULAR_CHILDREN` subdiretórios válidos. Um filho só (como
 * `src/contexts/` de um app React) ou apenas `step_definitions`/`support`
 * (Cucumber) não bastam.
 */
function detectModularPorDominio(index) {
  const evidence = dirsNamed(index, MODULAR_DIR_NAMES).filter((relPath) => {
    const validChildren = (index.get(relPath) || []).filter(
      (name) => !MODULAR_IGNORED_CHILDREN.has(name.toLowerCase())
    );
    return validChildren.length >= MIN_MODULAR_CHILDREN;
  });
  return { active: evidence.length > 0, evidence };
}

/**
 * MVC clássico exige controller e (model ou view) correlacionados, isto é,
 * sob a mesma raiz de app (primeiro segmento do caminho relativo). Evita
 * classificar como MVC um projeto que só por coincidência tem `models/`
 * (modelos de ML, por exemplo) e um `controllers/` sem relação em outro
 * ponto da árvore.
 *
 * Limitação conhecida: em Laravel, `resources/views` fica fora da evidência
 * porque não compartilha o primeiro segmento com `app/Http/Controllers`;
 * a classificação continua correta por causa de `app/Models`.
 */
function detectMvcClassico(index) {
  const controllerDirs = dirsNamed(index, CONTROLLER_DIR_NAMES);
  const modelOrViewDirs = dirsNamed(index, MODEL_OR_VIEW_DIR_NAMES);

  const modelOrViewRoots = new Set(modelOrViewDirs.map(firstSegment));
  const controllerRoots = new Set(controllerDirs.map(firstSegment));

  const correlatedControllers = controllerDirs.filter((relPath) =>
    modelOrViewRoots.has(firstSegment(relPath))
  );
  const correlatedModelsViews = modelOrViewDirs.filter((relPath) =>
    controllerRoots.has(firstSegment(relPath))
  );

  const active =
    correlatedControllers.length > 0 && correlatedModelsViews.length > 0;
  return {
    active,
    evidence: active ? [...correlatedControllers, ...correlatedModelsViews] : [],
  };
}

/** Classifica uma única raiz (projeto sem apps, ou um app de monorepo). */
function detectLocalPattern(rootPath, warnings) {
  const index = scanTree(rootPath, warnings);

  const modular = detectModularPorDominio(index);
  if (modular.active) {
    return { structuralPattern: "modular-por-dominio", evidence: modular.evidence };
  }

  const mvc = detectMvcClassico(index);
  if (mvc.active) {
    return { structuralPattern: "mvc-classico", evidence: mvc.evidence };
  }

  return { structuralPattern: "indefinido", evidence: [] };
}

/**
 * Valida a raiz informada. Devolve `null` quando é um diretório acessível
 * ou uma mensagem em português descrevendo o problema.
 */
function validateProjectRoot(rootPath) {
  let stats;
  try {
    stats = fs.statSync(rootPath);
  } catch (err) {
    if (isMissingError(err)) return `Caminho inexistente: ${rootPath}`;
    if (isAccessError(err)) return `Sem permissão para acessar: ${rootPath}`;
    throw err;
  }
  if (!stats.isDirectory()) return `O caminho não é um diretório: ${rootPath}`;
  return null;
}

/**
 * Ponto de entrada da biblioteca.
 *
 * Devolve `{ structuralPattern, evidence, warnings }` e, em monorepos,
 * também `apps: [{ path, structuralPattern, evidence }]` com a classificação
 * de cada app (caminhos relativos ao app). Lança `Error` com
 * `code = "ERR_PROJETO_INVALIDO"` quando a raiz não existe ou não é
 * diretório.
 */
function detectStructuralPattern(rootPath) {
  const problem = validateProjectRoot(rootPath);
  if (problem) {
    const err = new Error(problem);
    err.code = "ERR_PROJETO_INVALIDO";
    throw err;
  }

  const warnings = [];
  const appRoots = detectAppRoots(rootPath, warnings);

  if (appRoots.length >= 2) {
    const apps = appRoots.map((relRoot) => ({
      path: relRoot,
      ...detectLocalPattern(path.join(rootPath, relRoot), warnings),
    }));
    return {
      structuralPattern: "monorepo-apps-e-pacotes",
      evidence: appRoots,
      apps,
      warnings,
    };
  }

  return { ...detectLocalPattern(rootPath, warnings), warnings };
}

module.exports = {
  detectStructuralPattern,
  validateProjectRoot,
  STRUCTURAL_PATTERNS,
  MAX_DEPTH,
};

function printUsage(stream) {
  stream.write(
    "Uso: node structural-pattern-detection.js [caminho-do-projeto]\n" +
      "Detecta o padrão estrutural do projeto e imprime JSON em stdout.\n" +
      "Códigos de saída: 0 detecção concluída; 2 caminho inválido; 1 erro inesperado.\n"
  );
}

function main(argv) {
  if (argv.includes("--help") || argv.includes("-h")) {
    printUsage(process.stdout);
    return;
  }

  const projectRootInput = argv[0] || ".";
  const projectRoot = path.resolve(projectRootInput);

  const problem = validateProjectRoot(projectRoot);
  if (problem) {
    process.stderr.write(`Erro: ${problem}\n`);
    process.exitCode = 2;
    return;
  }

  const result = detectStructuralPattern(projectRoot);
  process.stdout.write(
    JSON.stringify({ projectRootInput, projectRoot, ...result }, null, 2) + "\n"
  );
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (err) {
    process.stderr.write(`Erro inesperado: ${err && err.message ? err.message : err}\n`);
    process.exitCode = 1;
  }
}
