// 昆仑增长：全盘项目资产深度盘点与 Obsidian 商业大地图构建脚本

const fs = require('fs');
const path = require('path');

const VAULT_DIR = path.join(__dirname, '..', 'obsidian_courses_vault');
const INVENTORY_DIR = path.join(VAULT_DIR, '06-全盘资产与项目盘点中枢 (Master Inventory)');

if (!fs.existsSync(INVENTORY_DIR)) {
  fs.mkdirSync(INVENTORY_DIR, { recursive: true });
}

// 全盘资产数据库 (Master Asset Registry)
const MASTER_ASSETS = [
  // 1. 客户演示与商业展示资产 (DEMO-SHOWCASE)
  {
    id: "ASSET-01",
    name: "生财黑客松亚军 AI 智能教务 OS",
    category: "客户展示资产",
    status: "100% 生产级可演示",
    path: "apps/ai_education_system/index.html",
    description: "学员画像 + 五维雷达图 + 智能排课消课 + 1秒生成互动教案 + 课时预警。可免费提供给校长/老师现场试用！",
    useCases: ["客户当面/直播 Demo", "教育行业企训突破口", "引流高客单共创营"],
    trafficStrategy: "小红书发布《9小时怎么用 AI 开发教务系统获得亚军？》，附试用链接引流私域。",
    tutorialPotential: "可直接作为【课程 H：AI 教师实战营】的核心实操案例。"
  },
  {
    id: "ASSET-02",
    name: "AI 跨境电商卖家智能工作站 (课程 A)",
    category: "客户展示资产",
    status: "100% 生产级可演示",
    path: "apps/ai_crossborder_ecommerce/index.html",
    description: "多语言 Listing & Amazon A9 SEO 生成 + TikTok 黄金 Hook 脚本 + 智能客服尺码引导换码降退货率闭环。",
    useCases: ["亚马逊/TikTok 卖家当面 Demo", "跨境电商线下沙龙展示"],
    trafficStrategy: "跨境卖家群发布《如何利用客服换码降低 30% 退货运费？》，诱导加企微领 SOP。",
    tutorialPotential: "全套转换为【课程 A：AI 跨境电商爆破营】实操大纲。"
  },
  {
    id: "ASSET-03",
    name: "AI 商业视觉设计工作站 (课程 B)",
    category: "客户展示资产",
    status: "100% 生产级可演示",
    path: "apps/ai_commercial_design/index.html",
    description: "Midjourney/ComfyUI 商业摄影与模特换装 + Octane 3D 渲染爆款主图 + ControlNet 姿势控图。",
    useCases: ["服装/电商企业美工 Demo", "设计降本 90% 企训"],
    trafficStrategy: "小红书发布前后对比图《AI 代替 3000元/小时外籍模特全过程》，引发美工爆赞。",
    tutorialPotential: "作为【课程 B：AI 商业视觉设计实战营】核心课程。"
  },
  {
    id: "ASSET-04",
    name: "AI 新媒体全渠道获客中枢 (课程 C)",
    category: "客户展示资产",
    status: "100% 生产级可演示",
    path: "apps/ai_newmedia_growth/index.html",
    description: "小红书爆款选题 + 破折叠去 AI 味朋友圈文案 + 4天体验营引流闭环。",
    useCases: ["新媒体团队 Demo", "私域操盘手企训"],
    trafficStrategy: "微信朋友圈直接发布生成的去 AI 味文案，评论区第 1 条跟帖锁客。",
    tutorialPotential: "作为【课程 C：AI 新媒体全渠道获客营】核心教程。"
  },
  {
    id: "ASSET-05",
    name: "飞书 36 Agent 常驻守护网关",
    category: "客户展示资产",
    status: "100% 运行守护 (端口 8090)",
    path: "services/feishu_bot_gateway.js",
    description: "【亦仁 × AI帅总】双星联合主 Agent 常驻后台，响应自然语言，智能调度 36 大 Agent 军团与 SQLite RAG 知识库。",
    useCases: ["当面/直播展示真正的 AI 架构", "飞书企服私有化部署"],
    trafficStrategy: "拍摄《带你看看我的 36 人 AI 虚拟公司是怎么工作的？》短视频爆款。",
    tutorialPotential: "作为【36 Agent 军团部署教程】与私有化交付包。"
  },
  {
    id: "ASSET-06",
    name: "教师 AI 错题本 Web 生产端应用",
    category: "客户展示资产",
    status: "100% 生产级可演示 (Docker 启动)",
    path: "apps/math_wrong_notebook_web/start_production.sh",
    description: "错题高拍仪切题 + SymPy 逻辑防错 + 自适应试卷 PDF 导出 + Docker 一键部署脚本。",
    useCases: ["教培机构防刷打卷 Demo", "学校私有化部署"],
    trafficStrategy: "教师群发布《一秒生成自适应错题试卷 PDF》，吸引教务老师试用。",
    tutorialPotential: "教育 AI 核心硬件/软件一体化教程。"
  },

  // 2. 高价值引流与流量放大资产 (TRAFFIC-FLYFORUM)
  {
    id: "ASSET-07",
    name: "7.8 万字 36 Agent 实操与提示词手册",
    category: "引流与流量资产",
    status: "100% 完备 (Markdown 导出)",
    path: "data/昆仑增长_36_Agent_实操与提示词手册.md",
    description: "教研、营销、获客、转化全链路 36 个 Agent 提示词与架构图，全网顶级重磅干货。",
    useCases: ["公域引流第一大钩子资产", "进群包邮免费资料"],
    trafficStrategy: "全网推文《免费送：7.8万字 36 个直接复制的数字员工提示词》，加好友即送。",
    tutorialPotential: "作为《36 Agent 军团实操全书》付费教程。"
  },
  {
    id: "ASSET-08",
    name: "微信本地数据库解密与密钥提取工具",
    category: "引流与流量资产",
    status: "90% 脚本就绪",
    path: "scripts/wechat_decryptor.py",
    description: "自动提取微信本地 DB 密钥，解密聊天记录，用于私域数据分析与客户画像挖掘。",
    useCases: ["私域黑科技引流", "客户聊天数据分析"],
    trafficStrategy: "B 站/知乎发布《如何导出并用 AI 分析你的微信聊天记录？》，程序员/极客圈引流。",
    tutorialPotential: "作为《Python + AI 私域数据挖掘黑科技》进阶教程。"
  },
  {
    id: "ASSET-09",
    name: "毕昇文档 AI 智能解析工具",
    category: "引流与流量资产",
    status: "90% 脚本就绪",
    path: "scripts/bisheng_doc_parser.py",
    description: "解析复杂 PDF、Word、Excel 表格与结构化文档，精准转换 Markdown 写入 RAG 向量库。",
    useCases: ["企业标书/规章解析", "知识库批量构建"],
    trafficStrategy: "发布《1秒把 300 页标书转成 AI 知识库》干货视频。",
    tutorialPotential: "作为【课程 G：AI 智能办公】标书解析实操教程。"
  },

  // 3. 商业授权与私有化交付资产 (COMMERCIAL-IP)
  {
    id: "ASSET-10",
    name: "商业 License 授权与激活验证系统",
    category: "商业授权资产",
    status: "100% 可用",
    path: "scripts/generate_license.js",
    description: "支持生成加密机器码 License，控制系统授权期限与功能模块解锁，防止盗版。",
    useCases: ["私有化软件授权控制", "按年收费许可验证"],
    trafficStrategy: "作为 39,800 私有化交付包的内置安全锁。",
    tutorialPotential: "作为《AI 软件商业化与授权控制》教学案例。"
  },
  {
    id: "ASSET-11",
    name: "SQLite FTS5 326 切片 RAG 向量知识库",
    category: "商业授权资产",
    status: "100% 完备",
    path: "data/rag_knowledge.db",
    description: "包含森马案例、生财大帖、全套 SOP 与 36 Agent 的 326 个全文检索切片。",
    useCases: ["自用知识库脑库", "私有化知识库复刻"],
    trafficStrategy: "现场展示秒级查答案能力，诱导客户购买私有化知识库。",
    tutorialPotential: "作为《如何搭建企业级零成本 RAG 数据库》教程。"
  }
];

// 导出 Master Inventory 报告
function buildInventoryReport() {
  console.log('🚀 开始全盘整理项目资产并构建 Obsidian 商业大地图...');

  // 1. 生成汇总主文档
  const masterContent = `---
title: 全盘项目与资产盘点中枢 (Master Inventory)
tags:
  - 资产盘点
  - 项目地图
  - 商业转化
updated_at: ${new Date().toISOString()}
---

# 🗺️ 昆仑 Agent 系统全盘项目与资产盘点中枢

> [!IMPORTANT] 商业盘点核心目的
> 本文档对我们电脑和系统中的**所有项目、Web 应用、脚本工具、数据库与知识资产**进行了全量盘点与分类。
> 方便您随时调取：**哪些可以给客户当面 Demo 展示、哪些可以作为公域引流勾子、哪些可以做成教程/课程变现**！

---

## 📊 资产全景统计与分类

| 资产编号 | 资产名称 | 分类 | 完成度/状态 | 商业用途与展示场景 | 流量与教程转化策略 |
| :--- | :--- | :--- | :--- | :--- | :--- |
${MASTER_ASSETS.map(a => `| **${a.id}** | [${a.name}](file:///${path.join(__dirname, '..', a.path)}) | ${a.category} | \`${a.status}\` | ${a.useCases.join(', ')} | ${a.trafficStrategy} |`).join('\n')}

---

## 🎯 4 大分类专项检索

- 🖥️ [[01-客户当面与直播Demo展示资产清单]]
- 🚀 [[02-公域引流与流量爆破勾子资产清单]]
- 📚 [[03-8大垂直课程与教程化转换清单]]
- 🔒 [[04-商业授权私有化与技术IP资产清单]]
`;

  fs.writeFileSync(path.join(INVENTORY_DIR, '00-全盘项目与资产盘点中枢.md'), masterContent, 'utf-8');

  // 2. 生成专项清单 1：客户 Demo 展示资产
  const demoAssets = MASTER_ASSETS.filter(a => a.category === '客户展示资产');
  const demoContent = `---
title: 客户当面与直播 Demo 展示资产清单
tags:
  - 客户Demo
  - 演示清单
---

# 🖥️ 客户当面与直播 Demo 展示资产清单

> **成交铁律**：当面或直播演示时，直接展示以下开箱即用的 100% 生产级系统，绝不拿 PPT 空谈！

${demoAssets.map(a => `
### 📌 [${a.id}] ${a.name}
- **完成度状态**：\`${a.status}\`
- **代码/应用路径**：[${a.path}](file:///${path.join(__dirname, '..', a.path)})
- **核心功能**：${a.description}
- **现场 Demo 演练动作**：
  1. 演示 ${a.useCases.join('；')}；
  2. 现场录入客户业务数据，看 AI 秒级输出结果；
  3. 引出 19,800 共创营或 39,800 私有化部署。
`).join('\n---\n')}
`;
  fs.writeFileSync(path.join(INVENTORY_DIR, '01-客户当面与直播Demo展示资产清单.md'), demoContent, 'utf-8');

  // 3. 生成专项清单 2：引流与流量资产
  const trafficAssets = MASTER_ASSETS.filter(a => a.category === '引流与流量资产');
  const trafficContent = `---
title: 公域引流与流量爆破勾子资产清单
tags:
  - 公域引流
  - 流量勾子
---

# 🚀 公域引流与流量爆破勾子资产清单

> **引流铁律**：用全网最顶级的重磅干货和黑科技工具作为勾子，吸引老板/校长/创作者主动加企微锁客！

${trafficAssets.map(a => `
### 📌 [${a.id}] ${a.name}
- **文件/脚本路径**：[${a.path}](file:///${path.join(__dirname, '..', a.path)})
- **资产价值**：${a.description}
- **全网爆破引流策略**：${a.trafficStrategy}
`).join('\n---\n')}
`;
  fs.writeFileSync(path.join(INVENTORY_DIR, '02-公域引流与流量爆破勾子资产清单.md'), trafficContent, 'utf-8');

  console.log('🎉 全盘项目资产盘点与 Obsidian 商业大地图构建完成！');
}

buildInventoryReport();
