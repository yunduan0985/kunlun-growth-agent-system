// 昆仑增长：GitHub 零泄露远程 Push 执行脚本

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = path.join(__dirname, '..');
const envOptions = {
  cwd: PROJECT_DIR,
  encoding: 'utf-8',
  env: Object.assign({}, process.env, { GIT_CONFIG_GLOBAL: '/dev/null' })
};

function executePush() {
  console.log('🚀 准备向 GitHub 远程仓库执行 Push...');

  try {
    // 1. 检查是否存在 remote origin
    let remoteOutput = '';
    try {
      remoteOutput = execSync('git remote -v', envOptions);
    } catch (e) {}

    console.log('📡 当前 Remote 状态:', remoteOutput || '暂未绑定 Remote origin');

    if (!remoteOutput.includes('origin')) {
      // 自动绑定 Daseanle 的默认远端仓库
      const targetRemote = 'https://github.com/Daseanle/kunlun-growth-agent-system.git';
      console.log(`🔗 自动添加 Remote origin: ${targetRemote}`);
      execSync(`git remote add origin ${targetRemote}`, envOptions);
    }

    // 2. 尝试执行 push
    console.log('⬆️ 正在推送到 GitHub main 分支...');
    const pushRes = execSync('git push -u origin main', envOptions);
    console.log('🎉 GitHub Push 成功结果:\n', pushRes);

  } catch (e) {
    console.log('ℹ️ Push 执行反馈:', e.message);
    if (e.message.includes('Authentication failed') || e.message.includes('Permission denied') || e.message.includes('Repository not found')) {
      console.log('💡 提醒：GitHub 账号需要访问 Token 或 SSH 密钥配置，已为您准备好一键提交指令！');
    }
  }
}

executePush();
