#!/usr/bin/env node
/**
 * 昆仑增长 Agent OS v2.0 — 一键安装脚本
 *
 * 使用方法:
 *   node scripts/setup.js          # 初次安装配置
 *   node scripts/setup.js --reset  # 重置管理员密码
 *   node scripts/setup.js --help   # 查看帮助
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

const WORKSPACE = path.resolve(__dirname, '..');
const DATA_DIR = path.join(WORKSPACE, 'data');
const ENV_PATH = path.join(WORKSPACE, '.env');
const USERS_PATH = path.join(DATA_DIR, 'users.json');
const JWT_SECRET_PATH = path.join(DATA_DIR, 'jwt_secret.txt');
const LICENSE_PATH = path.join(DATA_DIR, 'license.json');
const AGENT_STATUS_PATH = path.join(DATA_DIR, 'agent_status.json');
const PERMISSIONS_PATH = path.join(DATA_DIR, 'permissions.json');
const LLM_PROVIDERS_PATH = path.join(DATA_DIR, 'llm_providers.json');

const RESET_FLAG = process.argv.includes('--reset');
const HELP_FLAG = process.argv.includes('--help');

const c = {
  green:  (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red:    (s) => `\x1b[31m${s}\x1b[0m`,
  cyan:   (s) => `\x1b[36m${s}\x1b[0m`,
  bold:   (s) => `\x1b[1m${s}\x1b[0m`,
};

function divider(title) {
  const line = '\u2500'.repeat(Math.max(2, 50 - (title ? title.length : 0)));
  console.log('\n', line, title || '', line);
}

function printBanner() {
  console.log(c.cyan('  ╔══════════════════════════════════════════════╗'));
  console.log(c.cyan('  ║') + '  ' + c.bold('昆仑增长 Agent OS v2.0') + '              ' + c.cyan('║'));
  console.log(c.cyan('  ║') + '  Kunlun Growth Multi-Agent OS          ' + c.cyan('║'));
  console.log(c.cyan('  ║') + '  一键安装 - Zero-Click Setup            ' + c.cyan('║'));
  console.log(c.cyan('  ╚══════════════════════════════════════════════╝'));
  console.log();
}

function checkNodeVersion() {
  divider('环境检测');
  const verNum = parseInt(process.version.slice(1).split('.')[0], 10);
  if (verNum < 20) {
    console.log(' ' + c.red('✘') + ' Node.js 版本过低: ' + process.version + ' (需要 >= 20)');
    console.log('   请升级: https://nodejs.org');
    process.exit(1);
  }
  console.log(' ' + c.green('✔') + ' Node.js ' + process.version);
  console.log(' ' + c.green('✔') + ' 工作目录: ' + WORKSPACE);
}

function installDeps() {
  if (fs.existsSync(path.join(WORKSPACE, 'node_modules', 'express'))) {
    console.log(' ' + c.green('✔') + ' npm 依赖已安装');
    return;
  }
  console.log(' ' + c.yellow('⟳') + ' 安装 npm 依赖...');
  execSync('npm install', { cwd: WORKSPACE, stdio: 'inherit' });
  console.log(' ' + c.green('✔') + ' npm 依赖安装完成');
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log(' ' + c.green('✔') + ' 数据目录已创建: ' + DATA_DIR);
  } else {
    console.log(' ' + c.green('✔') + ' 数据目录已存在');
  }
  ['knowledge', 'uploads_tmp'].forEach((sub) => {
    const p = path.join(DATA_DIR, sub);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  });
}

function generateEnv() {
  if (fs.existsSync(ENV_PATH)) {
    console.log(' ' + c.green('✔') + ' .env 配置文件已存在（跳过）');
    return;
  }
  const envLines = [
    '# ============================================================',
    '# 昆仑增长 Agent OS v2.0 — 本地配置文件',
    '# 请将真实 API Key 填入下方对应位置',
    '# 含 "xxx" 或 "sk-ant-xxx" 的占位 key 会被自动跳过（不报错）',
    '# ============================================================',
    '',
    '# --------- 基础配置 ---------',
    'PORT=8888',
    '',
    '# --------- 大模型密钥 ---------',
    'CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'AGGREGATOR_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'AGGREGATOR_BASE_URL=https://api.example.com/v1',
    '',
    '# --------- 飞书 (Lark) ---------',
    'LARK_APP_ID=cli_xxxxxxxxxxxxxxxx',
    'LARK_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'LARK_TABLE_ID=',
    '',
    '# --------- 微信集成 ---------',
    'WECHAT_DB_PATH=',
    '',
    '# --------- WhatsApp ---------',
    'WHATSAPP_API_URL=http://localhost:19000',
    '',
    '# --------- X (Twitter) ---------',
    'TWITTER_API_TOKEN=',
    '',
    '# --------- 用户注册邀请码 ---------',
    'INVITE_CODE=KUNLUN2025',
    '',
    '# --------- 数据服务 ---------',
    'TIANYANCHA_TOKEN=tyc_token_xxxxxxxxxxxxxxxxxxxxxxxxxx',
    'OPENCLAW_API_URL=http://localhost:18000',
    '',
    '# === Coze / Codex ===',
    'COZE_API_KEY=',
    'COZE_BOT_ID=',
    'COZE_WORKFLOW_ID=',
    '',
    '# === n8n 工作流 ===',
    'N8N_HOST=http://localhost:5678',
    'N8N_API_KEY=',
    'N8N_PASSWORD=',
    '',
    '# === Dify 知识库 ===',
    'DIFY_API_URL=https://api.dify.ai/v1',
    'DIFY_API_KEY=',
    'DIFY_DEFAULT_DATASET_ID=',
    '',
    '# === Workbuddy ===',
    'WORKBUDDY_WEBHOOK=',
    'WORKBUDDY_APP_ID=',
    'WORKBUDDY_APP_SECRET=',
    '',
    '# === BISHENG 毕昇 ===',
    'BISHENG_API_URL=http://localhost:7860',
    'BISHENG_API_KEY=',
    'BISHENG_DEFAULT_PIPELINE_ID=',
    '',
  ];
  fs.writeFileSync(ENV_PATH, envLines.join('\n'), 'utf-8');
  console.log(' ' + c.green('✔') + ' .env 配置文件已生成');
  console.log('   路径: ' + ENV_PATH);
}

function generateJwtSecret() {
  if (fs.existsSync(JWT_SECRET_PATH)) {
    console.log(' ' + c.green('✔') + ' JWT 密钥已存在');
    return;
  }
  const secret = crypto.randomBytes(64).toString('hex');
  if (!fs.existsSync(path.dirname(JWT_SECRET_PATH))) {
    fs.mkdirSync(path.dirname(JWT_SECRET_PATH), { recursive: true });
  }
  fs.writeFileSync(JWT_SECRET_PATH, secret, 'utf-8');
  console.log(' ' + c.green('✔') + ' JWT 密钥已生成');
}

function setupAdminUser() {
  divider('管理员账号');
  let users = [];
  if (fs.existsSync(USERS_PATH)) {
    try { users = JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8')); } catch (e) { users = []; }
  }
  if (users.length > 0 && !RESET_FLAG) {
    console.log(' ' + c.green('✔') + ' 已有 ' + users.length + ' 个用户:');
    users.forEach((u) => { console.log('   · ' + u.display_name + ' (' + u.email + ') [' + u.role + ']'); });
    console.log('\n   如需重置管理员密码，请运行:');
    console.log('   ' + c.yellow('node scripts/setup.js --reset'));
    return;
  }
  let bcrypt;
  try { bcrypt = require('bcryptjs'); } catch (e) { bcrypt = null; }
  const adminPassword = crypto.randomBytes(3).toString('hex').toUpperCase() +
    String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  let hash;
  if (bcrypt) {
    hash = bcrypt.hashSync(adminPassword, 12);
  } else {
    hash = '$2b$12$' + crypto.randomBytes(53).toString('base64').replace(/\+/g, '.').slice(0, 53);
  }
  const adminUser = {
    id: crypto.randomBytes(16).toString('hex'),
    email: 'admin@kunlun.local',
    display_name: '超级管理员',
    password_hash: hash,
    role: 'admin',
    created_at: new Date().toISOString(),
    last_login: null,
  };
  if (RESET_FLAG) {
    const existingAdmin = users.find((u) => u.role === 'admin');
    if (existingAdmin) {
      existingAdmin.password_hash = hash;
      existingAdmin.last_login = null;
      console.log(' ' + c.yellow('⟳') + ' 管理员密码已重置');
    } else {
      users.push(adminUser);
      console.log(' ' + c.green('✔') + ' 管理员账号已创建');
    }
  } else {
    users = [adminUser];
    console.log(' ' + c.green('✔') + ' 管理员账号已创建');
  }
  saveUsers(users);
  console.log('\n   ' + c.bold('登录信息'));
  console.log('   ' + '\u2500'.repeat(30));
  console.log('   邮箱: ' + c.cyan('admin@kunlun.local'));
  console.log('   密码: ' + c.yellow(adminPassword));
  console.log('   ' + '\u2500'.repeat(30));
}

function saveUsers(users) {
  const dir = path.dirname(USERS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

function activateLicense() {
  if (fs.existsSync(LICENSE_PATH)) {
    console.log(' ' + c.green('✔') + ' 本地授权已激活');
    return;
  }
  const license = { license_key: 'LOCAL_DEV_MODE', activated_at: new Date().toISOString() };
  fs.writeFileSync(LICENSE_PATH, JSON.stringify(license, null, 2), 'utf-8');
  console.log(' ' + c.green('✔') + ' 本地授权已激活（开发模式）');
}

function initDefaultData() {
  divider('默认配置');
  if (!fs.existsSync(AGENT_STATUS_PATH)) {
    const s = { ai_sales_champion: true, risk_controller: true, manual_editor: true, claude_code: true, meeting_minutes_specialist: true };
    fs.writeFileSync(AGENT_STATUS_PATH, JSON.stringify(s, null, 2), 'utf-8');
    console.log(' ' + c.green('✔') + ' Agent 默认状态已配置');
  }
  if (!fs.existsSync(PERMISSIONS_PATH)) {
    const p = { admin: ['read', 'write', 'delete', 'admin'], editor: ['read', 'write'], viewer: ['read'] };
    fs.writeFileSync(PERMISSIONS_PATH, JSON.stringify(p, null, 2), 'utf-8');
    console.log(' ' + c.green('✔') + ' 权限配置已初始化');
  }
  if (!fs.existsSync(LLM_PROVIDERS_PATH)) {
    const lp = {
      claude: { name: 'Claude (Anthropic)', enabled: true, models: ['claude-sonnet-4-20250514', 'claude-3-haiku-20240307'] },
      deepseek: { name: 'DeepSeek', enabled: true, models: ['deepseek-chat'] },
      aggregator: { name: '聚合中转 (OpenAI Compatible)', enabled: true, models: ['gpt-4o', 'gpt-4o-mini'] },
    };
    fs.writeFileSync(LLM_PROVIDERS_PATH, JSON.stringify(lp, null, 2), 'utf-8');
    console.log(' ' + c.green('✔') + ' 模型供应商配置已初始化');
  }
}

function printHelp() {
  console.log('\n用法: node scripts/setup.js [选项]\n');
  console.log('选项:');
  console.log('  --reset    重置管理员账号密码');
  console.log('  --help     显示此帮助信息\n');
  console.log('说明:');
  console.log('  此脚本会自动完成初次安装的所有配置步骤，包括安装依赖、');
  console.log('  生成配置文件和创建管理员账号。之后只需 npm start 即可启动。\n');
  process.exit(0);
}

function printSummary() {
  divider('安装完成');
  console.log('\n  ' + c.bold('启动服务:'));
  console.log('    ' + c.cyan('npm start'));
  console.log('    或');
  console.log('    ' + c.cyan('bash start.sh'));
  console.log('\n  ' + c.bold('访问控制台:'));
  console.log('    浏览器打开 ' + c.cyan('http://localhost:8888'));
  console.log('\n  ' + c.bold('配置:'));
  console.log('    · 环境变量: ' + ENV_PATH);
  console.log('    · 数据目录: ' + DATA_DIR);
  console.log('\n  ' + c.bold('常见操作:'));
  console.log('    · 重置管理员密码:  ' + c.yellow('npm run setup -- --reset'));
  console.log('    · 修改 .env 配置 API Key');
  console.log('\n  ' + c.bold('注意:'));
  console.log('    · 当前 .env 中的 API Key 均为占位符，不影响服务启动');
  console.log('    · 含 "xxx" 或 "sk-ant-xxx" 的 Key 会被自动跳过');
}

function main() {
  if (HELP_FLAG) return printHelp();
  printBanner();
  checkNodeVersion();
  installDeps();
  ensureDataDir();
  generateEnv();
  generateJwtSecret();
  setupAdminUser();
  activateLicense();
  initDefaultData();
  printSummary();
}
main();
