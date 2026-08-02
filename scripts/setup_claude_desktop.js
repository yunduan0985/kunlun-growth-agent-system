const fs = require('fs');
const path = require('path');

// Mac Claude Desktop 配置文件的标准绝对路径
const CLAUDE_CONFIG_DIR = path.join(
  process.env.HOME,
  'Library',
  'Application Support',
  'Claude'
);
const CLAUDE_CONFIG_FILE = path.join(CLAUDE_CONFIG_DIR, 'claude_desktop_config.json');

console.log('==================================================');
console.log('🤖 开始配置 Mac 本地 Claude Desktop MCP 挂载...');
console.log(`📂 目标文件路径: ${CLAUDE_CONFIG_FILE}`);

// 确保 Claude 配置目录存在
if (!fs.existsSync(CLAUDE_CONFIG_DIR)) {
  try {
    fs.mkdirSync(CLAUDE_CONFIG_DIR, { recursive: true });
    console.log('✨ 创建了 Claude Desktop 配置文件夹。');
  } catch (err) {
    console.error('❌ 创建配置文件夹失败，请检查写入权限：', err.message);
    process.exit(1);
  }
}

// 读取现有配置或初始化空配置
let currentConfig = { mcpServers: {} };
if (fs.existsSync(CLAUDE_CONFIG_FILE)) {
  try {
    const rawData = fs.readFileSync(CLAUDE_CONFIG_FILE, 'utf-8');
    if (rawData.trim()) {
      currentConfig = JSON.parse(rawData);
    }
    console.log('📖 检测到已存在的 Claude 配置文件。');
  } catch (err) {
    console.warn('⚠️ 读取旧配置文件失败，将使用新配置覆盖。报错原因：', err.message);
  }
}

if (!currentConfig.mcpServers) {
  currentConfig.mcpServers = {};
}

// 定义昆仑增长 Gateway MCP 服务的注册 Schema
const SERVER_KEY = 'kunlun-growth-gateway';
const GATEWAY_SCRIPT_PATH = path.resolve(__dirname, '../src/index.js');

currentConfig.mcpServers[SERVER_KEY] = {
  command: 'node',
  args: [GATEWAY_SCRIPT_PATH],
  env: {
    PORT: '8888',
    PATH: process.env.PATH // 保证本地 cli 如 claude, git 等能在 node 中被正确寻址
  }
};

// 写入文件
try {
  fs.writeFileSync(CLAUDE_CONFIG_FILE, JSON.stringify(currentConfig, null, 2), 'utf-8');
  console.log('✅ 配置成功写入！');
  console.log('👉 现在请重启您的 Claude Desktop 客户端，您将在右下角看到工具栏激活。');
  console.log('==================================================');
} catch (err) {
  console.error('❌ 写入配置文件失败：', err.message);
  process.exit(1);
}
