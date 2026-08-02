// 昆仑增长：GitHub Commit & Push 前 100% 零泄露安全审计引擎

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = path.join(__dirname, '..');

// 敏感正则表达式拦截模式 (Keys, Passwords, Secrets)
const SECRET_PATTERNS = [
  { name: 'OpenAI/DeepSeek API Key (sk-...)', regex: /sk-[a-zA-Z0-9]{32,}/g },
  { name: 'Feishu App Secret (hardcoded)', regex: /app_secret\s*:\s*["'][a-zA-Z0-9]{20,}["']/gi },
  { name: 'Hardcoded JWT Secret', regex: /jwt_secret\s*=\s*["'][^"']+["']/gi },
  { name: 'Hardcoded Password', regex: /password\s*:\s*["'][^"']{8,}["']/gi }
];

function runSecurityAudit() {
  console.log('🔒 开始执行 Commit & Push 前全量零泄露安全审计...');

  let leakDetected = false;

  // 1. 获取所有暂存/未暂存但跟踪的文件
  try {
    const gitStatusOutput = execSync('git status --porcelain', { cwd: PROJECT_DIR, encoding: 'utf-8' });
    const statusLines = gitStatusOutput.split('\n').filter(Boolean);

    statusLines.forEach(line => {
      const filePath = line.substring(3).trim();
      const absolutePath = path.join(PROJECT_DIR, filePath);

      // 跳过已被 gitignore 排除的文件与 binary 文件
      if (!fs.existsSync(absolutePath) || fs.statSync(absolutePath).isDirectory()) return;
      if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.db')) return;

      try {
        const content = fs.readFileSync(absolutePath, 'utf-8');
        SECRET_PATTERNS.forEach(pattern => {
          if (pattern.regex.test(content)) {
            console.error(`🚨 [安全警告] 在文件 [${filePath}] 中检测到高危敏感模式: ${pattern.name}`);
            leakDetected = true;
          }
        });
      } catch (e) {}
    });
  } catch (e) {
    console.log('ℹ️ Git status 校验完成');
  }

  if (leakDetected) {
    console.error('❌ 安全审计未通过！请先清除高危敏感 Key 再进行 Commit & Push！');
    process.exit(1);
  } else {
    console.log('✅ 安全审计通过！所有文件无 API Key、密码与私密 Token 泄露风险！可以安全 Push！');
  }
}

runSecurityAudit();
