const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('==================================================');
console.log('🛡️ 昆仑增长多智能体系统一键部署与配置自愈程序...');
console.log('==================================================\n');

// 1. 自动计算本地工作区相关路径
const WORKSPACE_DIR = path.resolve(__dirname, '..');
const ENV_FILE_PATH = path.join(WORKSPACE_DIR, '.env');
const DATA_DIR_PATH = path.join(WORKSPACE_DIR, 'data');
const DEFAULT_DB_PATH = path.join(DATA_DIR_PATH, 'wx_db.db');

console.log(`📂 本地工作区解析路径: ${WORKSPACE_DIR}`);

// 2. 检查并确保本地 data 文件夹存在
if (!fs.existsSync(DATA_DIR_PATH)) {
  try {
    fs.mkdirSync(DATA_DIR_PATH, { recursive: true });
    console.log('✨ 自动创建本地存放数据库的 data/ 文件夹成功。');
  } catch (err) {
    console.error('❌ 创建 data 文件夹失败:', err.message);
  }
}

// 3. 检查并自愈生成 .env 环境变量文件 (动态绑定当前电脑的相对物理路径)
if (!fs.existsSync(ENV_FILE_PATH)) {
  console.log('📖 未检测到 .env 配置文件，正在动态生成本地绿色配置...');
  const defaultEnvContent = `# 昆仑增长多智能体系统本地配置文件
PORT=8888
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
TIANYANCHA_TOKEN=tyc_token_xxxxxxxxxxxxxxxxxxxxxxxxxx
# 动态绑定的本地解密微信数据库路径 (解密导出后改名为 wx_db.db 放入 data 下即可)
WECHAT_DB_PATH=${DEFAULT_DB_PATH}
OPENCLAW_API_URL=http://localhost:18000
`;
  try {
    fs.writeFileSync(ENV_FILE_PATH, defaultEnvContent, 'utf-8');
    console.log('✅ 自愈生成 .env 配置文件成功，微信数据库已绑定至当前解压目录。');
  } catch (err) {
    console.error('❌ 写入 .env 失败:', err.message);
  }
} else {
  console.log('📖 已检测到 .env 配置文件，跳过覆盖以保留您先前的 API Key。');
}

// 4. 调用 setup_claude_desktop.js 一键挂载 MCP
const setupScriptPath = path.join(WORKSPACE_DIR, 'scripts', 'setup_claude_desktop.js');
console.log('🤖 正在调度挂载本地 Claude Desktop MCP 服务...');
try {
  const output = execSync(`node "${setupScriptPath}"`, { encoding: 'utf-8' });
  console.log(output);
} catch (err) {
  console.error('❌ 注册 MCP 失败，请检查写入权限或 Claude 是否安装:', err.message);
}

console.log('🎉 所有本地自愈部署已完成！');
console.log('1. 请把解密导出的微信 wx_db.db 放入当前目录下的 data/ 文件夹中；');
console.log('2. 运行 npm start 启动本地 8888 专属网关；');
console.log('3. 重启 Claude Desktop 客户端即可无缝使用。');
console.log('==================================================');
