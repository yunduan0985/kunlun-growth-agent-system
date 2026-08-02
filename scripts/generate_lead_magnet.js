const fs = require('fs');
const path = require('path');

const AGENTS_DATA_FILE = path.join(__dirname, '..', 'data', 'feishu_36_agents_bitable_export.json');
const OUTPUT_LEAD_MAGNET = path.join(__dirname, '..', 'data', '昆仑增长_36_Agent_实操与提示词手册.md');

function generateLeadMagnet() {
  console.log('🚀 开始生成公域引流勾子：《昆仑增长 36 Agent 实操与提示词手册》...');

  if (!fs.existsSync(AGENTS_DATA_FILE)) {
    console.error('❌ 未找到 agent 数据文件:', AGENTS_DATA_FILE);
    return;
  }

  const agentData = JSON.parse(fs.readFileSync(AGENTS_DATA_FILE, 'utf-8'));
  let markdown = `# 📘 《昆仑增长 36 Agent 实操与提示词手册》 (2026 商业实战版)

> **前言**：本手册收录了昆仑增长团队 6 大军团共 36 个商业级 AI Agent 的系统提示词 (System Prompt)、工具配置与实操 SOP。您可以直接复制这些提示词输入给 DeepSeek、ChatGPT 或飞书多维表格 AI 字段中使用！

---

## 目录
- [01 架构管理组](#01-架构管理组)
- [02 智能数据组](#02-智能数据组)
- [03 爆款内容组](#03-爆款内容组)
- [04 战略决策组](#04-战略决策组)
- [05 战术情报组](#05-战术情报组)
- [06 运营交付组](#06-运营交付组)

---
`;

  const groupTitles = {
    '01_agent_organization': '01 架构管理组',
    '02_data_group': '02 智能数据组',
    '03_content_group': '03 爆款内容组',
    '04_management_group': '04 战略决策组',
    '05_combat_group': '05 战术情报组',
    '06_operation_group': '06 运营交付组'
  };

  for (const groupKey in agentData) {
    const groupName = groupTitles[groupKey] || groupKey;
    markdown += `\n## ${groupName}\n\n`;

    const agents = agentData[groupKey];
    agents.forEach((agent, index) => {
      markdown += `### ${index + 1}. Agent 名称：${agent.name}\n`;
      markdown += `* **归属分组**：\`${groupKey}\` \n`;
      markdown += `* **系统提示词 (System Prompt)**：\n\n\`\`\`markdown\n${agent.systemPrompt || '暂无 Prompt'}\n\`\`\`\n\n`;
      markdown += `---\n\n`;
    });
  }

  fs.writeFileSync(OUTPUT_LEAD_MAGNET, markdown, 'utf-8');
  console.log(`✅ 成功生成引流手册！保存至: ${OUTPUT_LEAD_MAGNET} (${markdown.length} 字符)`);
}

generateLeadMagnet();
