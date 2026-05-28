#!/usr/bin/env node

/**
 * Conversor Markdown → ADF (Atlassian Document Format)
 * 
 * Converte documentos Markdown para formato ADF do Confluence com:
 * - Estrutura semântica correta (headings, paragraphs, lists)
 * - Formatação inline (bold, italic, code, links)
 * - Blocos de código com syntax highlighting
 * - Diagramas Mermaid renderizáveis (full-width)
 * - Tabelas com formatação
 * 
 * Uso:
 *   node convert-md-to-adf.js arquivo.md
 *   node convert-md-to-adf.js diretorio/
 */

const fs = require('fs');
const path = require('path');

// Tentar carregar configuração (opcional)
let config = {
  options: {
    mermaidLayout: 'full-width',
    mermaidAlignment: 'center'
  }
};

try {
  const configPath = path.join(__dirname, '..', 'config.js');
  if (fs.existsSync(configPath)) {
    config = require(configPath);
  }
} catch (e) {
  // Config não encontrado, usar padrões
}

/**
 * Processa inline formatting (bold, italic, code, links)
 */
function parseInlineMarks(text) {
  if (!text || typeof text !== 'string') {
    return [{ type: 'text', text: text || '' }];
  }

  const result = [];
  let remaining = text;

  // Regex patterns (ordem importa!)
  const patterns = [
    // [link text](url)
    { regex: /\[([^\]]+)\]\(([^)]+)\)/g, type: 'link' },
    // **bold**
    { regex: /\*\*([^*]+)\*\*/g, type: 'strong' },
    // *italic* (mas não *** ou ****)
    { regex: /(?<!\*)\*(?!\*)([^*]+?)\*(?!\*)/g, type: 'em' },
    // `code`
    { regex: /`([^`]+)`/g, type: 'code' },
  ];

  while (remaining.length > 0) {
    let earliestMatch = null;
    let earliestPattern = null;

    // Encontra o primeiro match dentre todos os patterns
    for (const pattern of patterns) {
      pattern.regex.lastIndex = 0;
      const match = pattern.regex.exec(remaining);
      if (match && (!earliestMatch || match.index < earliestMatch.index)) {
        earliestMatch = match;
        earliestPattern = pattern;
      }
    }

    if (!earliestMatch) {
      // Sem mais formatação, adiciona texto restante
      if (remaining) {
        result.push({ type: 'text', text: remaining });
      }
      break;
    }

    // Adiciona texto antes do match
    if (earliestMatch.index > 0) {
      result.push({
        type: 'text',
        text: remaining.substring(0, earliestMatch.index),
      });
    }

    // Adiciona elemento formatado
    if (earliestPattern.type === 'link') {
      result.push({
        type: 'text',
        text: earliestMatch[1], // link text
        marks: [
          {
            type: 'link',
            attrs: {
              href: earliestMatch[2], // url
            },
          },
        ],
      });
    } else {
      result.push({
        type: 'text',
        text: earliestMatch[1], // conteúdo sem markers
        marks: [{ type: earliestPattern.type }],
      });
    }

    // Avança para depois do match
    remaining = remaining.substring(earliestMatch.index + earliestMatch[0].length);
  }

  return result.length > 0 ? result : [{ type: 'text', text: text }];
}

/**
 * Converte Markdown para ADF
 */
function markdownToAdf(markdown) {
  const lines = markdown.split('\n');
  const content = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Linha vazia (separador)
    if (!line.trim()) {
      i++;
      continue;
    }

    // Headings (# ## ### ####)
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      content.push({
        type: 'heading',
        attrs: { level },
        content: parseInlineMarks(text),
      });
      i++;
      continue;
    }

    // Horizontal rule (---)
    if (line.trim() === '---') {
      content.push({ type: 'rule' });
      i++;
      continue;
    }

    // Mermaid block (```mermaid...```)
    if (line.startsWith('```mermaid')) {
      let mermaidCode = '';
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        mermaidCode += lines[i] + '\n';
        i++;
      }
      i++; // pular closing ```

      // Usar configuração do config.js ou padrões
      const layout = config.options?.mermaidLayout || 'full-width';
      const alignment = config.options?.mermaidAlignment || 'center';

      content.push({
        type: 'extension',
        attrs: {
          layout: layout,
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
      });
      continue;
    }

    // Code block (```language...```)
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'text';
      let code = '';
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        code += lines[i] + '\n';
        i++;
      }
      i++;

      content.push({
        type: 'codeBlock',
        attrs: { language: lang },
        content: [{ type: 'text', text: code.trim() }],
      });
      continue;
    }

    // Lista não-ordenada (- ou * )
    if (line.trimStart().match(/^[-*] /)) {
      const listItems = [];
      while (i < lines.length) {
        const currentLine = lines[i];
        if (!currentLine.trimStart().match(/^[-*] /)) {
          break;
        }
        const itemText = currentLine.trimStart().slice(2).trim();
        listItems.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: parseInlineMarks(itemText),
            },
          ],
        });
        i++;
      }
      content.push({
        type: 'bulletList',
        content: listItems,
      });
      continue;
    }

    // Lista ordenada (1. 2. etc)
    if (line.trimStart().match(/^\d+\. /)) {
      const listItems = [];
      while (i < lines.length) {
        const currentLine = lines[i];
        if (!currentLine.trimStart().match(/^\d+\. /)) {
          break;
        }
        const itemText = currentLine.trimStart().replace(/^\d+\. /, '').trim();
        listItems.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: parseInlineMarks(itemText),
            },
          ],
        });
        i++;
      }
      content.push({
        type: 'orderedList',
        content: listItems,
      });
      continue;
    }

    // Tabela (| col1 | col2 |)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableRows = [];
      let isFirstRow = true;

      while (i < lines.length) {
        const currentLine = lines[i].trim();
        if (!currentLine.startsWith('|') || !currentLine.endsWith('|')) {
          break;
        }

        // Skip separator line (|---|---|)
        if (currentLine.match(/^\|[\s\-:]+\|$/)) {
          i++;
          continue;
        }

        const cells = currentLine
          .slice(1, -1)
          .split('|')
          .map(cell => cell.trim());

        const rowType = isFirstRow ? 'tableHeader' : 'tableCell';
        isFirstRow = false;

        tableRows.push({
          type: 'tableRow',
          content: cells.map(cellText => ({
            type: rowType,
            content: [
              {
                type: 'paragraph',
                content: parseInlineMarks(cellText),
              },
            ],
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

    // Parágrafo normal
    if (line.trim()) {
      content.push({
        type: 'paragraph',
        content: parseInlineMarks(line.trim()),
      });
      i++;
      continue;
    }

    i++;
  }

  return {
    type: 'doc',
    version: 1,
    content,
  };
}

/**
 * Converte um arquivo markdown para ADF
 */
function convertFile(inputPath, outputPath) {
  console.log(`📄 Processando: ${path.basename(inputPath)}`);

  const markdown = fs.readFileSync(inputPath, 'utf-8');
  const adf = markdownToAdf(markdown);

  fs.writeFileSync(outputPath, JSON.stringify(adf, null, 2), 'utf-8');

  const sizeKB = (fs.statSync(outputPath).size / 1024).toFixed(2);
  console.log(`   ✅ ADF gerado: ${path.basename(outputPath)}`);
  console.log(`   📊 ${adf.content.length} elementos, ${sizeKB} KB\n`);

  return adf;
}

/**
 * Processa diretório de arquivos markdown
 */
function convertDirectory(dirPath, outputDir) {
  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(dirPath, f));

  if (files.length === 0) {
    console.log('⚠️  Nenhum arquivo .md encontrado no diretório');
    return;
  }

  console.log(`🔄 Convertendo ${files.length} arquivos...\n`);

  for (const inputPath of files) {
    const baseName = path.basename(inputPath, '.md');
    const outputPath = path.join(outputDir, `${baseName}.adf.json`);
    
    try {
      convertFile(inputPath, outputPath);
    } catch (error) {
      console.error(`   ❌ Erro: ${error.message}\n`);
    }
  }
}

/**
 * Main
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Uso: node convert-md-to-adf.js <arquivo.md | diretorio>

Exemplos:
  node convert-md-to-adf.js documento.md
  node convert-md-to-adf.js meus-docs/
  node convert-md-to-adf.js ../docs/
    `);
    process.exit(1);
  }

  const inputPath = path.resolve(args[0]);

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Erro: Caminho não encontrado: ${inputPath}`);
    process.exit(1);
  }

  const stats = fs.statSync(inputPath);

  if (stats.isDirectory()) {
    // Processar diretório
    const outputDir = path.join(inputPath, '.adf-output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('📦 CONVERSOR MARKDOWN → ADF');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    convertDirectory(inputPath, outputDir);
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`✅ Conversão concluída!`);
    console.log(`📁 Arquivos ADF salvos em: ${outputDir}`);
    console.log('═══════════════════════════════════════════════════════════════');
  } else {
    // Processar arquivo único
    const outputPath = inputPath.replace('.md', '.adf.json');
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('📦 CONVERSOR MARKDOWN → ADF');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    convertFile(inputPath, outputPath);
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`✅ Conversão concluída!`);
    console.log(`📁 Arquivo ADF: ${outputPath}`);
    console.log('═══════════════════════════════════════════════════════════════');
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

// Exportar funções para uso como módulo
module.exports = { markdownToAdf, parseInlineMarks };
