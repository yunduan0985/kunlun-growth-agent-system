const fs = require('fs');
const path = require('path');

// 36 大 Agent 根目录
const AGENTS_ROOT = path.join(__dirname, '..', 'agents');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'feishu_36_agents_bitable_export.json');

const GROUPS = [
  '01_agent_organization',
  '02_data_group',
  '03_content_group',
  '04_management_group',
  '05_combat_group',
  '06_operation_group'
];

function syncAllAgents() {
  console.log('🚀 开始扫描并整理昆仑增长 36 大飞书 Agent 军团...\n');
  const agentMatrix = {};
  let totalCount = 0;

  GROUPS.forEach(groupName => {
    const groupPath = path.join(AGENTS_ROOT, groupName);
    if (!fs.existsSync(groupPath)) return;

    agentMatrix[groupName] = [];
    const agentFolders = fs.readdirSync(groupPath).filter(f => {
      return fs.statSync(path.join(groupPath, f)).isDirectory();
    });

    agentFolders.forEach(agentFolder => {
      const agentPath = path.join(groupPath, agentFolder);
      const promptFile = path.join(agentPath, 'system_prompt.md');
      const toolsFile = path.join(agentPath, 'tools.json');
      const readmeFile = path.join(agentPath, 'README.md');

      let systemPrompt = '';
      let toolsJson = null;
      let description = '';

      if (fs.existsSync(promptFile)) {
        systemPrompt = fs.readFileSync(promptFile, 'utf-8');
      }

      if (fs.existsSync(toolsFile)) {
        try {
          toolsJson = JSON.parse(fs.readFileSync(toolsFile, 'utf-8'));
        } catch (e) {
          toolsJson = null;
        }
      }

      if (fs.existsSync(readmeFile)) {
        description = fs.readFileSync(readmeFile, 'utf-8').slice(0, 300);
      }

      agentMatrix[groupName].push({
        id: `${groupName}/${agentFolder}`,
        name: agentFolder,
        group: groupName,
        hasPrompt: !!systemPrompt,
        promptLength: systemPrompt.length,
        hasTools: !!toolsJson,
        systemPrompt,
        toolsJson,
        description
      });

      totalCount++;
      console.log(`  ✅ [${groupName}] ${agentFolder} - Prompt: ${systemPrompt ? '就绪' : '缺失'}, Tools: ${toolsJson ? '有' : '无'}`);
    });
  });

  // 写入 JSON 导出文件，方便一键同步给飞书多维表格与机器人
  const dirPath = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(agentMatrix, null, 2), 'utf-8');
  console.log(`\n🎉 整理完成！共计扫描 ${totalCount} 个 Agent。`);
  console.log(`💾 飞书 Bitable / Bot 数据包已保存至: ${OUTPUT_FILE}`);
}

syncAllAgents();
