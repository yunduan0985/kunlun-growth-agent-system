const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const LARK_CLI = '/Users/dasean/.npm-global/bin/lark-cli';
const OUTPUT_DIR = path.join(__dirname, '..', 'data', 'feishu_docs_sync');

// 核心要同步的飞书云文档/Wiki 节点 Token 列表
const TARGET_DOC_TOKENS = [
  { name: '00-《教师AI实战训练营》课程总设计.docx', token: 'UgJQd8hkaofFgPxu85kcB7g3nwh' },
  { name: '闭环系统与AI商业化判断.docx', token: 'H9rzwebWWizNvVkp5k0ck5Yqnuf' },
  { name: 'AI培训师高阶交付与保姆级服务SOP.docx', token: 'Epcmdcw4booK0FxUAe2c9e8dnFy' },
  { name: '朋友圈高转化去AI味文案SOP.docx', token: 'Ldo2ddRvWoSRRyxTpSlcvfJ7nKb' },
  { name: 'AI七天极速做课与发售SOP.docx', token: 'BqBudZKt2o2JIJx1s6YcBOhknge' }
];

function syncFeishuDocs() {
  console.log('🔄 开始从飞书拉取最新云文档与 Wiki 节点...\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  TARGET_DOC_TOKENS.forEach(doc => {
    try {
      console.log(`📡 正在通过 lark-cli 拉取文档 [${doc.name}] (${doc.token})...`);
      const cmd = `${LARK_CLI} api GET "/open-apis/docx/v1/documents/${doc.token}/raw_content" --jq ".data.content"`;
      const content = execSync(cmd, { encoding: 'utf-8' });

      if (content && content.trim()) {
        const filePath = path.join(OUTPUT_DIR, `${doc.name.replace(/\.[^/.]+$/, '')}.md`);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`  ✅ 成功同步并写至: ${filePath} (${content.length} 字符)`);
      } else {
        console.log(`  ⚠️ 文档 [${doc.name}] 内容为空或无读取权限。`);
      }
    } catch (e) {
      console.error(`  ❌ 拉取文档 [${doc.name}] 失败:`, e.message);
    }
  });

  console.log('\n🎉 飞书 Wiki 与云文档 RAG 同步任务执行完毕！');
}

syncFeishuDocs();
