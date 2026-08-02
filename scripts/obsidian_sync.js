// 昆仑增长：Obsidian 课程沉淀与知识库双向同步引擎

const fs = require('fs');
const path = require('path');

const VAULT_DIR = path.join(__dirname, '..', 'obsidian_courses_vault');

// 确保目录结构存在
const FOLDERS = [
  '00-主主控总纲',
  '01-课程矩阵 (8大垂直方向)',
  '02-生财爆款SOP与获客',
  '03-Prompt库与工具链',
  '04-代码工程与应用入口'
];

function initVaultStructure() {
  FOLDERS.forEach(folder => {
    const dir = path.join(VAULT_DIR, folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  console.log('📁 Obsidian 知识库目录结构初始化完成！');
}

// 1. 生成 Obsidian 导航主页 (Index Note)
function generateIndexNote() {
  const content = `---
title: 昆仑 AI 课程沉淀与知识图谱主中枢
tags:
  - AI课程/主控
  - Obsidian/导航
updated_at: ${new Date().toISOString()}
---

# 🚀 昆仑 AI 课程沉淀与全图景知识库 (Obsidian 双向链接版)

> [!IMPORTANT] 说明
> 本 Obsidian 知识库由 Agent 系统自动实时沉淀与更新。支持 Wikilinks 标签导航、Dataview 检索与可视化图谱（Graph View）。

## 🗺️ 8 大垂直课程矩阵概览

\`\`\`mermaid
graph TD
    Root[昆仑 8 大 AI 垂直课程矩阵] --> A[[课程A-AI跨境电商爆破营]]
    Root --> B[[课程B-AI商业视觉设计实战营]]
    Root --> C[[课程C-AI新媒体全渠道获客营]]
    Root --> D[[课程D-AI独立站开发与GEO]]
    Root --> E[[课程E-OPC内容自动化爆破营]]
    Root --> F[[课程F-AI企服通识与数字员工]]
    Root --> G[[课程G-AI智能办公全员提效营]]
    Root --> H[[课程H-AI教师实战与智能教务OS]]
\`\`\`

## 📚 快速双向链接跳转

- 📋 **商业总纲**：[[00-昆仑增长商业总纲v6.0]]
- 🎯 **获客 SOP**：[[02-生财爆款4天体验营全流程SOP]]
- 🤖 **Agent 军团**：[[03-36_Agent军团实操与提示词手册]]
- 💻 **Web 系统**：
  - [[课程A-卖家智能工作站]] (apps/ai_crossborder_ecommerce)
  - [[课程H-智能教务OS系统]] (apps/ai_education_system)
`;

  fs.writeFileSync(path.join(VAULT_DIR, '00-主主控总纲', '00-主视窗导航与课程关系图.md'), content, 'utf-8');
}

// 2. 生成 8 大课程的 Obsidian Markdown 笔记
function generateCourseNotes() {
  const courses = [
    {
      code: '课程A',
      name: 'AI跨境电商爆破营',
      tags: ['AI课程/跨境电商', 'Amazon', 'TikTok'],
      desc: '亚马逊/TikTok/独立站卖家选品、Listing、TikTok短视频与客服换码降退货率闭环',
      appPath: 'apps/ai_crossborder_ecommerce'
    },
    {
      code: '课程B',
      name: 'AI商业视觉设计实战营',
      tags: ['AI课程/视觉设计', 'Midjourney', 'ComfyUI'],
      desc: '全行业 Midjourney/ComfyUI 商业摄影、模特换装、电商主图与 3D 渲染降本 90% SOP',
      appPath: ''
    },
    {
      code: '课程C',
      name: 'AI新媒体全渠道获客营',
      tags: ['AI课程/新媒体', '去AI味', '朋友圈SOP'],
      desc: '爆款选题、去 AI 味朋友圈文案、短视频切片与 4 天体验营高转化闭环',
      appPath: ''
    },
    {
      code: '课程D',
      name: 'AI独立站开发与GEO',
      tags: ['AI课程/独立站', 'GEO', 'SEO'],
      desc: 'Vite/Shopify 建站与 GEO 针对 Perplexity/ChatGPT 生成式搜索引擎排名优化',
      appPath: ''
    },
    {
      code: '课程E',
      name: 'OPC内容自动化爆破营',
      tags: ['AI课程/OPC', 'n8n', 'Coze'],
      desc: '超级个体一人公司矩阵、n8n/Coze 工作流自动化与数字人口播全网分发',
      appPath: ''
    },
    {
      code: '课程F',
      name: 'AI企服通识与数字员工',
      tags: ['AI课程/企服通识', 'DeepSeek', '数字员工'],
      desc: 'Prompt 基础设施、森马 94 台数字员工拆解与人机协同组织重塑',
      appPath: ''
    },
    {
      code: '课程G',
      name: 'AI智能办公全员提效营',
      tags: ['AI课程/办公提效', '标书风控', 'ExcelAI'],
      desc: 'AI 标书风控初稿、Excel/VBA 智能处理、发票识别与合同合规比对',
      appPath: ''
    },
    {
      code: '课程H',
      name: 'AI教师实战与智能教务OS',
      tags: ['AI课程/教育', 'SuperTA', '教务OS'],
      desc: 'SuperTA 9 维防刷试卷、1秒互动教案、生财黑客松亚军 AI 智能教务 OS 系统',
      appPath: 'apps/ai_education_system'
    }
  ];

  courses.forEach(c => {
    const filename = `${c.code}-${c.name}.md`;
    const content = `---
title: ${c.code}-${c.name}
tags:
${c.tags.map(t => `  - ${t}`).join('\n')}
created_at: ${new Date().toISOString()}
status: 已构建
---

# 📖 ${c.code}：${c.name}

> [!NOTE] 课程定位
> **受众与适合企业**：${c.desc}  
> **双向链接总纲**：[[00-主视窗导航与课程关系图]] | [[00-昆仑增长商业总纲v6.0]]

---

## 💡 课程四大交付模块

1. **核心逻辑**：精准解决行业真实业务痛点，不讲空泛理论。
2. **工具实操**：配套专用 AI 工具链与自动化脚本。
3. **SOP 提示词**：全套一键复制调用的高转化 Prompt 词库。
4. **配套系统**：${c.appPath ? `已开箱落地专用 Web 应用：${c.appPath}` : '提供 30%+40%+30% 保姆级带练流程'}

---

## 🔗 相关资源与双向引用

- [[02-生财爆款4天体验营全流程SOP]]
- [[03-36_Agent军团实操与提示词手册]]
`;

    fs.writeFileSync(path.join(VAULT_DIR, '01-课程矩阵 (8大垂直方向)', filename), content, 'utf-8');
  });
}

function syncAllToObsidian() {
  console.log('🚀 开始将所有课程、SOP 与 Prompt 沉淀至 Obsidian 知识库...');
  initVaultStructure();
  generateIndexNote();
  generateCourseNotes();
  console.log(`🎉 全量课程沉淀完成！Obsidian Vault 保存路径: ${VAULT_DIR}`);
}

syncAllToObsidian();
