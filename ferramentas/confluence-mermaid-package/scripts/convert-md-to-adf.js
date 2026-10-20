#!/usr/bin/env node
'use strict';

/**
 * Conversor Markdown para ADF (Atlassian Document Format).
 *
 * Gera a estrutura ADF do Confluence Cloud com:
 * - títulos, parágrafos, citações, listas (com aninhamento por indentação) e regras horizontais;
 * - formatação inline (negrito, itálico, tachado, código, links);
 * - blocos de código com linguagem;
 * - diagramas Mermaid como macro renderizável (confluence-mermaid-macro);
 * - tabelas com linha de cabeçalho.
 *
 * As limitações conhecidas estão na seção "Limitações" do README.md.
 *
 * Uso:
 *   node convert-md-to-adf.js arquivo.md
 *   node convert-md-to-adf.js diretorio/
 */

const fs = require('fs');
const path = require('path');
const { loadConfig, DEFAULT_OPTIONS } = require('./lib/confluence-client');

const SEPARATOR = '='.repeat(63);

// Configuração opcional: só as opções de layout do Mermaid são usadas aqui.
// Um config.js com erro de sintaxe é reportado como tal, não como ausente.
let config;
try {
  config = loadConfig({ requireCredentials: false });
} catch (error) {
  console.error(`Erro ao carregar a configuração: ${error.message}`);
  process.exit(1);
}

// Expressões de detecção de blocos
const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/;
const FENCE_OPEN = /^(`{3,})\s*([^`\s]*)/;
const RULE = /^\s*(?:(?:-\s*){3,}|(?:\*\s*){3,}|(?:_\s*){3,})$/;
const LIST_ITEM = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
const BLOCKQUOTE = /^\s{0,3}>\s?(.*)$/;
const TABLE_SEPARATOR = /^\|(?:\s*:?-+:?\s*\|)+$/;
const HARD_BREAK = /(?: {2,}|\\)$/;

function isTableRow(line) {
  const trimmed = line.trim();
  return trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 1;
}

function isBlockStart(line) {
  return (
    HEADING.test(line) ||
    FENCE_OPEN.test(line) ||
    RULE.test(line) ||
    LIST_ITEM.test(line) ||
    BLOCKQUOTE.test(line) ||
    isTableRow(line)
  );
}

/**
 * Converte formatação inline (negrito, itálico, tachado, código, links, imagens)
 * em nós de texto com marks. Marcas aninhadas não são interpretadas.
 */
function parseInlineMarks(text) {
  if (!text || typeof text !== 'string') {
    return [{ type: 'text', text: text || '' }];
  }

  // A ordem só importa quando dois padrões casam na mesma posição.
  const patterns = [
    { regex: /`([^`]+)`/g, marks: () => [{ type: 'code' }] },
    { regex: /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, type: 'image' },
    { regex: /\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, type: 'link' },
    { regex: /\*\*\*([^*]+)\*\*\*/g, marks: () => [{ type: 'strong' }, { type: 'em' }] },
    { regex: /\*\*([^*]+)\*\*/g, marks: () => [{ type: 'strong' }] },
    { regex: /__([^_]+)__/g, marks: () => [{ type: 'strong' }] },
    { regex: /(?<!\*)\*(?!\*)([^*]+?)\*(?!\*)/g, marks: () => [{ type: 'em' }] },
    { regex: /~~([^~]+)~~/g, marks: () => [{ type: 'strike' }] },
  ];

  const result = [];
  let remaining = text;

  while (remaining.length > 0) {
    let earliestMatch = null;
    let earliestPattern = null;

    for (const pattern of patterns) {
      pattern.regex.lastIndex = 0;
      const match = pattern.regex.exec(remaining);
      if (match && (!earliestMatch || match.index < earliestMatch.index)) {
        earliestMatch = match;
        earliestPattern = pattern;
      }
    }

    if (!earliestMatch) {
      result.push({ type: 'text', text: remaining });
      break;
    }

    if (earliestMatch.index > 0) {
      result.push({ type: 'text', text: remaining.substring(0, earliestMatch.index) });
    }

    if (earliestPattern.type === 'link' || earliestPattern.type === 'image') {
      // Imagens viram um link com o texto alternativo (o ADF exige nós de mídia
      // para imagens embutidas, que dependem de upload prévio).
      const label = earliestMatch[1] || earliestMatch[2];
      result.push({
        type: 'text',
        text: label,
        marks: [{ type: 'link', attrs: { href: earliestMatch[2] } }],
      });
    } else {
      result.push({
        type: 'text',
        text: earliestMatch[1],
        marks: earliestPattern.marks(),
      });
    }

    remaining = remaining.substring(earliestMatch.index + earliestMatch[0].length);
  }

  return result.length > 0 ? result : [{ type: 'text', text }];
}

/**
 * Monta um parágrafo a partir de linhas consecutivas: quebras suaves viram
 * espaço; linhas terminadas em dois espaços ou barra invertida viram hardBreak.
 */
function buildParagraph(lines) {
  const content = [];
  lines.forEach((rawLine, index) => {
    const line = rawLine.replace(HARD_BREAK, '').trim();
    if (index > 0) {
      const previousHard = HARD_BREAK.test(lines[index - 1]);
      content.push(previousHard ? { type: 'hardBreak' } : { type: 'text', text: ' ' });
    }
    content.push(...parseInlineMarks(line));
  });
  return { type: 'paragraph', content };
}

function buildMermaidExtension(mermaidCode) {
  const layout = config.options.mermaidLayout || DEFAULT_OPTIONS.mermaidLayout;
  const alignment = config.options.mermaidAlignment || DEFAULT_OPTIONS.mermaidAlignment;

  return {
    type: 'extension',
    attrs: {
      layout,
      extensionType: 'com.atlassian.confluence.macro.core',
      extensionKey: 'confluence-mermaid-macro',
      parameters: {
        macroParams: {
          __bodyContent: {
            value: JSON.stringify([{ body: mermaidCode.trim(), date: 0 }]),
          },
          theme: { value: 'default' },
          look: { value: 'classic' },
          download: { value: 'true' },
          fullscreen: { value: 'true' },
          copy: { value: 'true' },
          alignment: { value: alignment },
        },
        macroMetadata: {
          schemaVersion: { value: '1' },
          title: 'Mermaid diagram',
        },
      },
    },
  };
}

/**
 * Divide uma linha de tabela em células, ignorando "|" dentro de código inline
 * e tratando "\|" como barra literal.
 */
function splitTableRow(line) {
  const trimmed = line.trim();
  const inner = trimmed.slice(1, trimmed.endsWith('|') ? -1 : undefined);
  const cells = [];
  let current = '';
  let inCode = false;

  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (ch === '\\' && inner[i + 1] === '|') {
      current += '|';
      i++;
      continue;
    }
    if (ch === '`') {
      inCode = !inCode;
    }
    if (ch === '|' && !inCode) {
      cells.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  cells.push(current.trim());
  return cells;
}

function indentWidth(prefix) {
  return prefix.replace(/\t/g, '  ').length;
}

/**
 * Lê uma lista (ordenada ou não) a partir de lines[start], com aninhamento
 * por indentação. Retorna o nó e o índice da próxima linha não consumida.
 */
function parseList(lines, start) {
  const first = lines[start].match(LIST_ITEM);
  const indent = indentWidth(first[1]);
  const ordered = /\d/.test(first[2]);
  const items = [];
  let i = start;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      // Linha em branco: a lista continua se a próxima linha útil ainda for item dela.
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      const next = j < lines.length ? lines[j].match(LIST_ITEM) : null;
      if (next && indentWidth(next[1]) >= indent) {
        i = j;
        continue;
      }
      break;
    }

    const match = line.match(LIST_ITEM);
    if (!match) {
      // Continuação indentada do item anterior (sem marcador).
      if (items.length > 0 && indentWidth(line.match(/^\s*/)[0]) > indent && !isBlockStart(line.trim())) {
        const paragraph = items[items.length - 1].content[0];
        paragraph.content.push({ type: 'text', text: ' ' }, ...parseInlineMarks(line.trim()));
        i++;
        continue;
      }
      break;
    }

    const lineIndent = indentWidth(match[1]);
    if (lineIndent < indent) {
      break;
    }
    if (lineIndent > indent) {
      if (items.length === 0) {
        break;
      }
      const nested = parseList(lines, i);
      items[items.length - 1].content.push(nested.node);
      i = nested.next;
      continue;
    }
    if (/\d/.test(match[2]) !== ordered) {
      break;
    }

    items.push({
      type: 'listItem',
      content: [{ type: 'paragraph', content: parseInlineMarks(match[3].trim()) }],
    });
    i++;
  }

  return {
    node: { type: ordered ? 'orderedList' : 'bulletList', content: items },
    next: i,
  };
}

/**
 * Lê um bloco cercado (``` ou mais crases). O fechamento precisa ter pelo
 * menos o mesmo número de crases da abertura.
 */
function parseFence(lines, start) {
  const open = lines[start].match(FENCE_OPEN);
  const fence = open[1];
  const lang = (open[2] || '').trim();
  const body = [];
  let i = start + 1;

  while (i < lines.length) {
    const close = lines[i].match(/^(`{3,})\s*$/);
    if (close && close[1].length >= fence.length) {
      break;
    }
    body.push(lines[i]);
    i++;
  }

  return { lang, code: body.join('\n'), next: i + 1 };
}

const BLOCKQUOTE_ALLOWED = new Set(['paragraph', 'bulletList', 'orderedList', 'codeBlock']);

/**
 * Lê uma citação (> ...). O conteúdo interno é convertido recursivamente;
 * nós que o ADF não aceita dentro de blockquote são emitidos logo após ela.
 */
function parseBlockquote(lines, start) {
  const inner = [];
  let i = start;

  while (i < lines.length) {
    const match = lines[i].match(BLOCKQUOTE);
    if (match) {
      inner.push(match[1]);
      i++;
      continue;
    }
    // Continuação "preguiçosa": linha não vazia que não inicia outro bloco.
    if (lines[i].trim() && !isBlockStart(lines[i]) && inner.length > 0 && inner[inner.length - 1].trim()) {
      inner.push(lines[i]);
      i++;
      continue;
    }
    break;
  }

  const innerContent = markdownToAdf(inner.join('\n')).content;
  const kept = [];
  const hoisted = [];
  for (const node of innerContent) {
    if (BLOCKQUOTE_ALLOWED.has(node.type)) {
      kept.push(node);
    } else if (node.type === 'heading') {
      kept.push({
        type: 'paragraph',
        content: node.content.map((n) => ({ ...n, marks: [...(n.marks || []), { type: 'strong' }] })),
      });
    } else {
      hoisted.push(node);
    }
  }

  const nodes = [];
  if (kept.length > 0) {
    nodes.push({ type: 'blockquote', content: kept });
  }
  nodes.push(...hoisted);
  return { nodes, next: i };
}

/**
 * Converte um documento Markdown em um documento ADF.
 */
function markdownToAdf(markdown) {
  markdown = markdown.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  const lines = markdown.split('\n');
  const content = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    const headingMatch = line.match(HEADING);
    if (headingMatch) {
      content.push({
        type: 'heading',
        attrs: { level: headingMatch[1].length },
        content: parseInlineMarks(headingMatch[2].trim()),
      });
      i++;
      continue;
    }

    if (RULE.test(line)) {
      content.push({ type: 'rule' });
      i++;
      continue;
    }

    if (FENCE_OPEN.test(line)) {
      const fence = parseFence(lines, i);
      if (fence.lang.toLowerCase() === 'mermaid') {
        content.push(buildMermaidExtension(fence.code));
      } else {
        content.push({
          type: 'codeBlock',
          attrs: { language: fence.lang || 'text' },
          content: [{ type: 'text', text: fence.code.trim() }],
        });
      }
      i = fence.next;
      continue;
    }

    if (BLOCKQUOTE.test(line)) {
      const quote = parseBlockquote(lines, i);
      content.push(...quote.nodes);
      i = quote.next;
      continue;
    }

    if (LIST_ITEM.test(line)) {
      const list = parseList(lines, i);
      content.push(list.node);
      i = list.next;
      continue;
    }

    if (isTableRow(line)) {
      const tableRows = [];
      let isFirstRow = true;

      while (i < lines.length && isTableRow(lines[i])) {
        const currentLine = lines[i].trim();

        if (TABLE_SEPARATOR.test(currentLine)) {
          i++;
          continue;
        }

        const rowType = isFirstRow ? 'tableHeader' : 'tableCell';
        isFirstRow = false;

        tableRows.push({
          type: 'tableRow',
          content: splitTableRow(currentLine).map((cellText) => ({
            type: rowType,
            content: [{ type: 'paragraph', content: parseInlineMarks(cellText) }],
          })),
        });
        i++;
      }

      content.push({
        type: 'table',
        attrs: { isNumberColumnEnabled: false, layout: 'default' },
        content: tableRows,
      });
      continue;
    }

    // Parágrafo: linhas consecutivas até linha em branco ou início de outro bloco.
    const paragraphLines = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
      paragraphLines.push(lines[i]);
      i++;
    }
    content.push(buildParagraph(paragraphLines));
  }

  return {
    type: 'doc',
    version: 1,
    content,
  };
}

/**
 * Converte um arquivo Markdown e grava o ADF correspondente.
 */
function convertFile(inputPath, outputPath) {
  console.log(`Processando: ${path.basename(inputPath)}`);

  const markdown = fs.readFileSync(inputPath, 'utf8');
  const adf = markdownToAdf(markdown);

  fs.writeFileSync(outputPath, JSON.stringify(adf, null, 2), 'utf8');

  const sizeKB = (fs.statSync(outputPath).size / 1024).toFixed(2);
  console.log(`   ADF gerado: ${path.basename(outputPath)}`);
  console.log(`   ${adf.content.length} elementos, ${sizeKB} KB\n`);

  return adf;
}

/**
 * Converte todos os .md de um diretório. Retorna o número de falhas.
 */
function convertDirectory(dirPath, outputDir) {
  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.toLowerCase().endsWith('.md'))
    .map((f) => path.join(dirPath, f));

  if (files.length === 0) {
    console.log('Nenhum arquivo .md encontrado no diretório.');
    return 0;
  }

  console.log(`Convertendo ${files.length} arquivo(s)...\n`);

  let failures = 0;
  for (const inputPath of files) {
    const baseName = path.basename(inputPath, '.md');
    const outputPath = path.join(outputDir, `${baseName}.adf.json`);
    try {
      convertFile(inputPath, outputPath);
    } catch (error) {
      failures++;
      console.error(`   Erro em ${path.basename(inputPath)}: ${error.message}\n`);
    }
  }
  return failures;
}

function printUsage() {
  console.log(`
Uso: node convert-md-to-adf.js <arquivo.md | diretorio>

Exemplos:
  node convert-md-to-adf.js documento.md
  node convert-md-to-adf.js meus-docs/
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printUsage();
    process.exitCode = args.length === 0 ? 1 : 0;
    return;
  }

  const inputPath = path.resolve(args[0]);

  if (!fs.existsSync(inputPath)) {
    console.error(`Erro: caminho não encontrado: ${inputPath}`);
    process.exitCode = 1;
    return;
  }

  console.log(SEPARATOR);
  console.log('CONVERSOR MARKDOWN PARA ADF');
  console.log(SEPARATOR);
  console.log('');

  const stats = fs.statSync(inputPath);

  if (stats.isDirectory()) {
    const outputDir = path.join(inputPath, '.adf-output');
    fs.mkdirSync(outputDir, { recursive: true });

    const failures = convertDirectory(inputPath, outputDir);

    console.log(SEPARATOR);
    console.log(failures > 0 ? `Conversão concluída com ${failures} falha(s).` : 'Conversão concluída.');
    console.log(`Arquivos ADF salvos em: ${outputDir}`);
    console.log(SEPARATOR);
    process.exitCode = failures > 0 ? 1 : 0;
  } else {
    const outputPath = path.join(
      path.dirname(inputPath),
      `${path.basename(inputPath, path.extname(inputPath))}.adf.json`
    );

    convertFile(inputPath, outputPath);

    console.log(SEPARATOR);
    console.log('Conversão concluída.');
    console.log(`Arquivo ADF: ${outputPath}`);
    console.log(SEPARATOR);
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { markdownToAdf, parseInlineMarks, splitTableRow };
