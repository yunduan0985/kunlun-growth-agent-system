// 昆仑增长：Obsidian 全量知识库沉淀与“出售自用 Agent 系统”商业 SOP 导出引擎

const fs = require('fs');
const path = require('path');

const VAULT_DIR = path.join(__dirname, '..', 'obsidian_courses_vault');
const FEISHU_SYNC_DIR = path.join(__dirname, '..', 'data', 'feishu_docs_sync');

// 1. 创建全量分类目录
const DIRECTORIES = {
  master: path.join(VAULT_DIR, '00-主主控总纲'),
  courses: path.join(VAULT_DIR, '01-课程矩阵 (8大垂直方向)'),
  sop: path.join(VAULT_DIR, '02-生财爆款SOP与获客'),
  prompts: path.join(VAULT_DIR, '03-Prompt库与工具链'),
  codebase: path.join(VAULT_DIR, '04-代码工程与应用入口')
};

Object.values(DIRECTORIES).forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 2. 导出核心旗舰 SOP：《把自己在用的 Agent 系统卖给客户的商业落地 SOP》
function exportSellingSelfAgentSOP() {
  const content = `---
title: 把自己在用的 Agent 系统卖给客户的商业落地 SOP
tags:
  - 商业模式/把自己在用的卖给客户
  - Agent系统销售
  - 19800共创营
  - 企服交付
updated_at: ${new Date().toISOString()}
---

# 🚀 商业大招：把自己在用的 Agent 系统卖给客户的完整 SOP

> [!IMPORTANT] 核心商业判断 (Sell What You Use)
> **客户绝对不为单纯的软件付费，客户只为“正在跑通且产生结果的系统”付费！**
> 我们不卖未经验证的理想化工具。我们直接把**我们自己每天在用的 36 Agent 集群、飞书网关、RAG 向量库与 8 大 Web 工作站**全量复刻私有化部署给客户！

---

## 💡 为什么“卖自用系统”成交率高达 80%？

1. **零信任成本**：直接当面展示我们后台真实运行的飞书机器人、实时检索的 30 万字知识库与自动生成去 AI 味朋友圈的过程。客户亲眼看到“真东西”。
2. **卖结果不卖工具**：结合森马渊虹案例（94 台数字员工干完 545 人的活），告诉客户：我们卖给你的不是代码，而是**已经跑通的数字员工岗与商业闭环**。
3. **开箱即用**：提供 Docker 一键启动脚本 (\`start_production.sh\`)，预置 API Key，客户 5 分钟就能在自己的服务器或飞书里跑起来！

---

## 🎯 客户演示与成交 4 步法 (Demo to Close)

\`\`\`mermaid
graph TD
    Step1[1. 当面/直播演示自用系统] --> Step2[2. 现场录入客户业务数据测试]
    Step2 --> Step3[3. 输出 30%+40%+30% 交付方案]
    Step3 --> Step4[4. 19,800 共创签约 / 5:5 分润]

    Step1 --> S1(展示飞书 36 Agent 自然语言调度与去 AI 味朋友圈生成)
    Step2 --> S2(将客户的规章/产品资料现场写入 RAG 库，秒出专业回答)
    Step3 --> S3(30%内容 + 40%现场带练 + 30%保姆服务)
    Step4 --> S4(客户出场景+客户，我们提供系统，利润 5:5 平分)
\`\`\`

---

## 💰 阶梯定价与交付包规划

### 方案 A：19,800 元 场景共创合伙人包
- **包含**：复刻全套自用 Agent 源码、36 Agent 提示词库、8 大垂直 Web 工作站、4 天线上体验营带练、**客户出场景与流量，净利润 5:5 分成**。

### 方案 B：39,800 元 企业私有化私教部署包
- **包含**：方案 A 全部内容 + 部署至客户自有云服务器 + 飞书/企业微信机器人对接 + 1 年免费复训与升级 + 现场 1V1 企训带练。

---

## 🔗 相关双向链接

- [[00-主视窗导航与课程关系图]]
- [[00-昆仑增长商业总纲v6.0]]
- [[生财爆款获客与4天体验营像素级拆解指导手册]]
- [[03-36_Agent军团实操与提示词手册]]
`;

  fs.writeFileSync(path.join(DIRECTORIES.master, '01-把自己在用的Agent系统卖给客户的商业落地SOP.md'), content, 'utf-8');
  console.log('✅ 已成功生成旗舰 SOP 笔记：01-把自己在用的Agent系统卖给客户的商业落地SOP.md');
}

// 3. 将 feishu_docs_sync 目录下的所有同步文件导入 Obsidian Vault
function syncFeishuDocsToObsidian() {
  if (!fs.existsSync(FEISHU_SYNC_DIR)) return;

  const files = fs.readdirSync(FEISHU_SYNC_DIR).filter(f => f.endsWith('.md'));
  files.forEach(file => {
    const rawContent = fs.readFileSync(path.join(FEISHU_SYNC_DIR, file), 'utf-8');
    const noteName = file;
    const obsidianContent = `---
title: ${file.replace('.md', '')}
tags:
  - 飞书沉淀
  - 生财有术
  - 自用Agent资产
updated_at: ${new Date().toISOString()}
---

${rawContent}

---
## 🔗 双向链接导航
- [[00-主视窗导航与课程关系图]]
- [[01-把自己在用的Agent系统卖给客户的商业落地SOP]]
`;

    fs.writeFileSync(path.join(DIRECTORIES.sop, noteName), obsidianContent, 'utf-8');
    console.log(`📄 已成功沉淀文档至 Obsidian SOP 库: ${noteName}`);
  });
}

// 4. 将 36 Agent 手册与 Prompt 库沉淀至 Obsidian
function exportPromptsToObsidian() {
  const promptManualSrc = path.join(__dirname, '..', 'data', '昆仑增长_36_Agent_实操与提示词手册.md');
  if (fs.existsSync(promptManualSrc)) {
    const content = fs.readFileSync(promptManualSrc, 'utf-8');
    const obsidianContent = `---
title: 36 Agent 军团实操与提示词全集
tags:
  - Agent军团
  - 提示词库
  - 核心资产
updated_at: ${new Date().toISOString()}
---

${content}
`;
    fs.writeFileSync(path.join(DIRECTORIES.prompts, '03-36_Agent军团实操与提示词手册.md'), obsidianContent, 'utf-8');
    console.log('🤖 已成功沉淀 36 Agent 军团全量手册至 Obsidian！');
  }
}

// 5. 导出代码工程与部署入口指南
function exportCodebaseToObsidian() {
  const content = `---
title: 全量代码工程与 Web 应用开箱部署指南
tags:
  - 代码工程
  - Web应用
  - 部署指南
---

# 💻 昆仑 Agent 系统全量 Web 应用与部署脚本清单

> **面向客户可直接私有化复刻的代码资产表**

## 1. 8 大垂直 Web 智能工作站应用
- 📦 **课程 A**：[apps/ai_crossborder_ecommerce](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_crossborder_ecommerce/index.html) (AI 跨境电商卖家工作站)
- 🎨 **课程 B**：[apps/ai_commercial_design](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_commercial_design/index.html) (AI 商业视觉设计工作站)
- 📱 **课程 C**：[apps/ai_newmedia_growth](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_newmedia_growth/index.html) (AI 新媒体全渠道获客中枢)
- 🌐 **课程 D**：[apps/ai_independent_geo](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_independent_geo/index.html) (AI 独立站与 GEO 出海中枢)
- 🤖 **课程 E**：[apps/ai_opc_automation](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_opc_automation/index.html) (OPC 超级个体自动化中枢)
- 🛡️ **课程 F**：[apps/ai_enterprise_general](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_enterprise_general/index.html) (AI 企服通识与 PII 脱敏中枢)
- 📄 **课程 G**：[apps/ai_office_productivity](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_office_productivity/index.html) (AI 智能办公全员提效中枢)
- 🎓 **课程 H**：[apps/ai_education_system](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_education_system/index.html) (生财黑客松亚军 AI 智能教务 OS)

## 2. 后端守护与部署一键启动脚本
- 守护进程：\`services/feishu_bot_gateway.js\` (端口 8090，双星调度)
- 生产启动：\`apps/math_wrong_notebook_web/start_production.sh\`
- RAG 数据库：\`data/rag_knowledge.db\` (包含 326 个 FTS5 全文索引切片)
`;

  fs.writeFileSync(path.join(DIRECTORIES.codebase, '04-全量Web应用与部署脚本清单.md'), content, 'utf-8');
  console.log('💻 已成功沉淀代码工程指南至 Obsidian！');
}

function runMasterExport() {
  console.log('🚀 开始进行全量知识库与“出售自用 Agent”SOP 的 Obsidian 沉淀...');
  exportSellingSelfAgentSOP();
  syncFeishuDocsToObsidian();
  exportPromptsToObsidian();
  exportCodebaseToObsidian();
  console.log(`🎉 Obsidian 知识库全量沉淀完成！包含自用 Agent 销售经验与全部代码资产！`);
}

runMasterExport();
