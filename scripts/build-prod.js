/**
 * KUNLUN GROWTH Agent OS - 混淆打包发布脚本
 * 
 * 用法：node scripts/build-prod.js --mac 或 --win
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targetArgs = process.argv.slice(2).join(' ') || '--mac';
const projectRoot = path.join(__dirname, '..');

const srcPath = path.join(projectRoot, 'src');
const srcBackupPath = path.join(projectRoot, 'src_backup');

console.log('🛡️  开始商业化安全打包流程...');

// 1. 备份原始 src 目录
try {
  if (fs.existsSync(srcBackupPath)) {
    console.log('⚠️ 发现上次未成功还原的原始代码备份，正在自动回滚恢复...');
    fs.rmSync(srcPath, { recursive: true, force: true });
    fs.renameSync(srcBackupPath, srcPath);
  }
  
  console.log('📦 备份原始代码...');
  fs.cpSync(srcPath, srcBackupPath, { recursive: true });
  
  // 2. 执行高强度代码混淆
  console.log('⚡ 正在对后台网关与智能体核心进行高强度控制流混淆...');
  
  function obfuscateDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        obfuscateDir(fullPath);
      } else if (file.endsWith('.js')) {
        const code = fs.readFileSync(fullPath, 'utf-8');
        
        // 高强度防反编译配置项
        const obfuscatedResult = JavaScriptObfuscator.obfuscate(code, {
          compact: true,
          controlFlowFlattening: true,          // 控制流平坦化（极大增加反编译阅读难度）
          controlFlowFlatteningThreshold: 0.75,
          deadCodeInjection: true,              // 注入死代码
          deadCodeInjectionThreshold: 0.4,
          debugProtection: true,                // 开启反调试，一旦按 F12 浏览器直接死循环卡死
          debugProtectionInterval: 4000,
          disableConsoleOutput: false,           // 保留控制台输出用于日志查阅
          identifierNamesGenerator: 'hexadecimal',
          log: false,
          renameGlobals: false,                  // 防止 Express 导出对象找不到
          rotateStringArray: true,              // 字符串混淆与旋转
          selfDefending: true,                  // 自我防卫：若代码被格式化或改动，直接运行崩溃
          stringArray: true,
          stringArrayEncoding: ['base64', 'rc4'],
          stringArrayThreshold: 0.75
        });
        
        fs.writeFileSync(fullPath, obfuscatedResult.getObfuscatedCode(), 'utf-8');
        console.log(`   - 混淆完成: ${path.relative(projectRoot, fullPath)}`);
      }
    });
  }
  
  obfuscateDir(srcPath);
  console.log('✅ 核心代码混淆完成！');

  // 3. 调用 electron-builder 执行打包
  const buildCmd = `npx electron-builder ${targetArgs}`;
  console.log(`🚀 执行编译打包命令: ${buildCmd}`);
  execSync(buildCmd, { stdio: 'inherit', cwd: projectRoot });
  console.log('🎉 编译打包成功！安装包已输出至 dist 目录。');

} catch (err) {
  console.error('❌ 打包流程异常终止:', err.message);
} finally {
  // 4. 无论成功与否，必须物理还原代码，防止开发环境被混淆覆盖
  console.log('🧹 还原原始开发代码...');
  if (fs.existsSync(srcBackupPath)) {
    fs.rmSync(srcPath, { recursive: true, force: true });
    fs.renameSync(srcBackupPath, srcPath);
    console.log('✅ 代码还原完毕，您的开发环境是安全的。');
  }
}
