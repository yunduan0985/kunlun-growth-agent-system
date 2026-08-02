const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const PARSER_SCRIPT = path.join(__dirname, '../../scripts/bisheng_doc_parser.py');

/**
 * 原生毕昇 Layout 非结构化文档高精解析引擎
 */
function parseDocumentNative(inputPathOrText) {
  return new Promise((resolve, reject) => {
    // 检查是否有 Python3
    execFile('python3', [PARSER_SCRIPT, inputPathOrText], { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err || !stdout) {
        console.warn('⚠️ [Bisheng Parser] Native Python call failed, fallback to JS regex layout parser:', err ? err.message : stderr);
        return resolve(fallbackJsLayoutParser(inputPathOrText));
      }

      try {
        const parsed = JSON.parse(stdout.trim());
        resolve(parsed);
      } catch (jsonErr) {
        console.warn('⚠️ [Bisheng Parser] JSON parse error, fallback to JS parser');
        resolve(fallbackJsLayoutParser(inputPathOrText));
      }
    });
  });
}

// 纯 JS 保底版 Layout 解析器（防止环境缺少 Python3 时中断）
function fallbackJsLayoutParser(input) {
  let content = input;
  if (fs.existsSync(input)) {
    try {
      content = fs.readFileSync(input, 'utf-8');
    } catch (_) {}
  }

  const lines = content.split('\n');
  const elements = [];
  let currentChunk = [];
  let currentType = 'paragraph';
  let currentHeader = '正文';

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('#') || /^第[一二三四五六七八九十0-9]+[章节条]/.test(trimmed)) {
      if (currentChunk.length > 0) {
        elements.push({ type: currentType, section_header: currentHeader, content: currentChunk.join('\n') });
        currentChunk = [];
      }
      currentHeader = trimmed.replace(/^#+\s*/, '');
      elements.push({ type: 'heading', section_header: currentHeader, content: trimmed });
      currentType = 'paragraph';
      return;
    }

    if (trimmed.includes('|')) {
      if (currentType !== 'table' && currentChunk.length > 0) {
        elements.push({ type: currentType, section_header: currentHeader, content: currentChunk.join('\n') });
        currentChunk = [];
      }
      currentType = 'table';
      currentChunk.push(trimmed);
      return;
    }

    if (currentType === 'table') {
      if (currentChunk.length > 0) {
        elements.push({ type: 'table', section_header: currentHeader, content: currentChunk.join('\n') });
        currentChunk = [];
      }
      currentType = 'paragraph';
    }

    currentChunk.push(trimmed);
  });

  if (currentChunk.length > 0) {
    elements.push({ type: currentType, section_header: currentHeader, content: currentChunk.join('\n') });
  }

  return {
    success: true,
    element_count: elements.length,
    elements
  };
}

module.exports = {
  parseDocumentNative
};
