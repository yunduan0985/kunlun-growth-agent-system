const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '..', 'data', 'rag_knowledge.db');
const db = new sqlite3.Database(DB_PATH);

// 要索引的全局知识库路径列表
const KNOWLEDGE_DIRS = [
  path.join(__dirname, '..', 'data', 'feishu_docs_sync'),
  path.join(__dirname, '..', 'data', 'knowledge'),
  path.join(__dirname, '..', 'data'),
  path.join(__dirname, '..', 'docs')
];

function chunkText(text, chunkSize = 500, overlap = 50) {
  let chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    if (end === text.length) break;
    start += chunkSize - overlap;
  }
  return chunks;
}

function initDb(callback) {
  db.serialize(() => {
    db.run(`CREATE VIRTUAL TABLE IF NOT EXISTS knowledge_chunks USING fts5(filename, chunk_index, content)`, (err) => {
      if (err) {
        // 如果表不是 fts5，尝试创建普通表做 fallback
        db.run(`CREATE TABLE IF NOT EXISTS knowledge_chunks (filename TEXT, chunk_index INTEGER, content TEXT)`, callback);
      } else {
        callback();
      }
    });
  });
}

function indexAllKnowledge() {
  console.log('🚀 开始进行 RAG 向量与 FTS5 全量数据库索引构建...');

  initDb(() => {
    let fileCount = 0;
    let totalChunkCount = 0;

    KNOWLEDGE_DIRS.forEach(dir => {
      if (!fs.existsSync(dir)) return;

      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.txt') || f.endsWith('.docx'));

      files.forEach(filename => {
        const filePath = path.join(dir, filename);
        if (fs.statSync(filePath).isDirectory()) return;

        const content = fs.readFileSync(filePath, 'utf-8');
        if (!content || !content.trim()) return;

        fileCount++;
        const chunks = chunkText(content);

        // 先清理已有记录
        db.run(`DELETE FROM knowledge_chunks WHERE filename = ?`, [filename], () => {
          const stmt = db.prepare(`INSERT INTO knowledge_chunks (filename, chunk_index, content) VALUES (?, ?, ?)`);
          chunks.forEach((chunk, idx) => {
            stmt.run(filename, idx, chunk);
            totalChunkCount++;
          });
          stmt.finalize();
          console.log(`  ✅ 索引文档 [${filename}]: ${chunks.length} 个文本切片`);
        });
      });
    });

    setTimeout(() => {
      db.get(`SELECT count(*) as count FROM knowledge_chunks`, (err, row) => {
        console.log(`\n🎉 全量 RAG 数据库索引构建完成！`);
        console.log(`📊 总处理文件: ${fileCount} 个，包含总切片: ${row ? row.count : totalChunkCount} 个！`);
        console.log(`💾 SQLite 数据库已保存至: ${DB_PATH}`);
        db.close();
      });
    }, 1500);
  });
}

indexAllKnowledge();
