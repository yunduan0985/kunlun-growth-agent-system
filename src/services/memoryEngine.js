const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// 保证 data 目录存在
const DATA_DIR = process.env.KUNLUN_USER_DATA_PATH || path.join(__dirname, '../../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MEMORY_DB_PATH = path.join(DATA_DIR, 'mem0_memory.db');
let db = null;

// 初始化 Mem0 数据库 (WAL 模式)
function initMemoryDb() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(MEMORY_DB_PATH, (err) => {
      if (err) {
        console.error('❌ [Mem0 Memory] Failed to open mem0_memory.db', err);
        return reject(err);
      }
      db.run("PRAGMA journal_mode=WAL");
      db.run(`
        CREATE TABLE IF NOT EXISTS agent_memories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT NOT NULL,
          category TEXT DEFAULT 'general',
          memory_text TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (createErr) => {
        if (createErr) {
          console.error('❌ [Mem0 Memory] Table creation error:', createErr);
          return reject(createErr);
        }
        console.log('🧠 [Mem0 Memory Engine] Memory Database initialized with WAL mode.');
        resolve(db);
      });
    });
  });
}

// 物理保存一条关键偏好记忆
function addMemory(userId, memoryText, category = 'general') {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('Memory database not initialized'));
    if (!userId || !memoryText) return reject(new Error('Missing userId or memoryText'));

    const stmt = db.prepare(`
      INSERT INTO agent_memories (user_id, category, memory_text, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `);
    stmt.run([userId, category, memoryText.trim()], function (err) {
      if (err) return reject(err);
      console.log(`🧠 [Mem0 Memory] Memory added for user ${userId} [ID: ${this.lastID}]`);
      resolve({ id: this.lastID, user_id: userId, category, memory_text: memoryText });
    });
    stmt.finalize();
  });
}

// 获取用户所有的记忆片段
function getMemories(userId) {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('Memory database not initialized'));
    db.all(
      `SELECT * FROM agent_memories WHERE user_id = ? ORDER BY id DESC`,
      [userId],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows || []);
      }
    );
  });
}

// 关键词+逻辑匹配查询记忆
function searchMemories(userId, query) {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('Memory database not initialized'));
    if (!query) return getMemories(userId).then(resolve).catch(reject);

    const keyword = `%${query.trim()}%`;
    db.all(
      `SELECT * FROM agent_memories WHERE user_id = ? AND (memory_text LIKE ? OR category LIKE ?) ORDER BY id DESC`,
      [userId, keyword, keyword],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows || []);
      }
    );
  });
}

// 删除某条记忆
function deleteMemory(memoryId, userId) {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('Memory database not initialized'));
    db.run(
      `DELETE FROM agent_memories WHERE id = ? AND user_id = ?`,
      [memoryId, userId],
      function (err) {
        if (err) return reject(err);
        resolve({ success: true, deletedCount: this.changes });
      }
    );
  });
}

// 清空用户记忆
function clearUserMemories(userId) {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('Memory database not initialized'));
    db.run(
      `DELETE FROM agent_memories WHERE user_id = ?`,
      [userId],
      function (err) {
        if (err) return reject(err);
        resolve({ success: true, deletedCount: this.changes });
      }
    );
  });
}

module.exports = {
  initMemoryDb,
  addMemory,
  getMemories,
  searchMemories,
  deleteMemory,
  clearUserMemories
};
