/**
 * KUNLUN GROWTH Agent OS - 离线授权激活码生成工具
 * 
 * 用法：node scripts/generate_license.js <16位机器码>
 */
const crypto = require('crypto');

const LICENSE_SALT = 'KUNLUN_AGENT_SALT_2026_OFFLINE';
const mid = process.argv[2];

if (!mid || mid.trim().length !== 16) {
  console.error('\n❌ 错误：请提供 16 位的机器识别码 (Machine ID)。');
  console.log('用法示例: node scripts/generate_license.js F0C9CA6347CA86D3\n');
  process.exit(1);
}

const cleanMid = mid.trim().toUpperCase();
const lic = crypto.createHash('md5').update(cleanMid + LICENSE_SALT).digest('hex').toUpperCase().substring(0, 16);

console.log('\n==================================================');
console.log('🔑 昆仑增长 Agent OS - 授权中心');
console.log('--------------------------------------------------');
console.log(`   输入特征码:  ${cleanMid}`);
console.log(`   生成激活码:  ${lic}`);
console.log('==================================================\n');
