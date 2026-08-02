// 昆仑增长：【原子拼图乐高系统】全量商业与 Agent 微型组件库构建引擎

const fs = require('fs');
const path = require('path');

const PUZZLE_VAULT_DIR = path.join(__dirname, '..', 'obsidian_courses_vault', '05-原子拼图乐高库 (Atomic Puzzles)');
const DATA_PUZZLE_FILE = path.join(__dirname, '..', 'data', 'atomic_puzzles_registry.json');

if (!fs.existsSync(PUZZLE_VAULT_DIR)) {
  fs.mkdirSync(PUZZLE_VAULT_DIR, { recursive: true });
}

// 50+ 原子拼图乐高积木全集
const ATOMIC_PUZZLES = [
  // 1. 公域引流拼图 (HOOK)
  {
    id: "HOOK-01",
    category: "公域引流",
    name: "痛点反转开场钩子",
    description: "通过颠覆认知引发好奇与强打开率",
    content: "劝所有做[行业: 企业运营/做课/跨境]的朋友，千万别再盲目买 AI 工具了！(除非你懂这个逻辑)",
    input: "目标行业",
    output: "高打开率公域标题或视频首句"
  },
  {
    id: "HOOK-02",
    category: "公域引流",
    name: "数字强烈对比钩子",
    description: "用震撼的具体财务/工时数字建立信任",
    content: "从月入 3000 到 3 天搞定 5 万，我只做对了一件事：拿数字员工做闭环！",
    input: "收入或效率增长对比数值",
    output: "爆款朋友圈或小红书首句"
  },
  {
    id: "HOOK-03",
    category: "公域引流",
    name: "免费试用工具勾子",
    description: "赠送真实可运行的 Web/AI 工具试用权",
    content: "提供[生财黑客松亚军 AI 智能教务 OS]或[AI 跨境卖家工作站]免费试用链接，扫码即用。",
    input: "Web 应用 URL",
    output: "私域加好友裂变锁客"
  },

  // 2. 私域清洗打标拼图 (TAG)
  {
    id: "TAG-01",
    category: "私域清洗",
    name: "进群自动化欢迎语与痛点调研",
    description: "用户加好友/进群后第一时间提取场景与意向",
    content: "🎉 欢迎加入【4天 AI 场景降本增效体验营】！请直接回复你的：【行业 + 目前业务中最耗工时的痛点】，领取专属 AI 资料包。",
    input: "用户回复文本",
    output: "用户行业标签 + 场景痛点"
  },
  {
    id: "TAG-02",
    category: "私域清洗",
    name: "意向评分与合伙人标签划分 (0-100分)",
    description: "自动化打分并分类黄金客户",
    content: "评分规则：基础进群分(+50) + 场景明确(+20) + 预算能力(+15) + 打卡完成(+15)。≥85分自动打上『👑 核心共创合伙人意向 (19,800)』。",
    input: "用户行为数据",
    output: "意向等级与导师分配指令"
  },

  // 3. 去 AI 味朋友圈拼图 (MOMENTS)
  {
    id: "MOMENTS-01",
    category: "去AI味朋友圈",
    name: "破折叠首句模板 (15字内)",
    description: "带强烈情绪与冲突，保证朋友圈不被折叠",
    content: "刚才看了一个学员发的朋友圈，我差点没气晕过去。",
    input: "今日发生真实冲突事件",
    output: "破折叠吸引力首句"
  },
  {
    id: "MOMENTS-02",
    category: "去AI味朋友圈",
    name: "评论区第 1 条引流避风控模板",
    description: "将敏感引流词放在评论区，规避微信封禁",
    content: "💬 [评论区第 1 条]: 觉得自己的朋友圈文案太生硬的，把我写的发我，我抽空免费帮你改一条。",
    input: "引流福利/联系动作",
    output: "安全零风控评论区跟帖"
  },

  // 4. 4天体验营拼图 (CAMP)
  {
    id: "CAMP-DAY1",
    category: "4天体验营",
    name: "Day 1 破冰与认知颠覆",
    description: "颠覆学员认知，树立卖结果不卖工具的观念",
    content: "拆解森马 1 亿 AI 落地案（94台数字员工干完545人的活）。告诫学员：AI时代技术会被追平，场景与结果才是护城河！",
    input: "森马案例数据",
    output: "体验营 Day 1 讲义与打卡作业"
  },
  {
    id: "CAMP-DAY2",
    category: "4天体验营",
    name: "Day 2 实操带练与手感拿取",
    description: "带学员现场操作真实工具，产生极致体感",
    content: "带领学员现场使用【教师 AI 错题本】或【卖家 AI 智能工作站】，一键生成自己的业务方案并截图打卡。",
    input: "实操 Web 应用",
    output: "学员打卡截图与好评反馈"
  },
  {
    id: "CAMP-DAY3",
    category: "4天体验营",
    name: "Day 3 独家场景 1V1 诊断",
    description: "评估学员业务场景商业化指数，发布白皮书",
    content: "1对1 评估学员场景商业化指数（0-100分），发布《5:5 场景共创合伙人计划》白皮书，锁定高意向合伙人。",
    input: "学员场景诊断表",
    output: "场景共创合伙人意向名单"
  },
  {
    id: "CAMP-DAY4",
    category: "4天体验营",
    name: "Day 4 闭营发售与 5:5 签约",
    description: "直播发售 19,800 共创营，限时早鸟与分润签约",
    content: "闭营直播发售 + 前 3 名早鸟优惠（加送价值 10,000 元 API 部署） + 签署 5:5 利润分成协议。",
    input: "发售政策与早鸟名额",
    output: "高客单成交与 5:5 合同签署"
  },

  // 5. 出售自用 Agent 系统拼图 (SELL-SELF)
  {
    id: "SELL-SELF-01",
    category: "出售自用Agent",
    name: "当面或直播展示真实运行后台",
    description: "直接展示我们每天在用的飞书 36 Agent 集群",
    content: "现场演示【双星联合主 Agent】在飞书中响应自然语言、调用 30 万字 RAG 向量库秒级回答规章，并自动生成去 AI 味朋友圈。",
    input: "飞书机器人后台",
    output: "客户信任度拉满与视觉震撼"
  },
  {
    id: "SELL-SELF-02",
    category: "出售自用Agent",
    name: "现场导入客户真实业务数据测试",
    description: "用客户的数据现场秒出解决方案",
    content: "请客户提供一条他们公司的规章或产品资料，现场写入 SQLite RAG 库，1 秒后由 AI 给出专业应答与流程闭环。",
    input: "客户真实文件",
    output: "客户当场认同并询问价格"
  },
  {
    id: "SELL-SELF-03",
    category: "出售自用Agent",
    name: "Docker 一键私有化部署交钥匙",
    description: "提供极速一键部署，实现开箱即用",
    content: "提供 start_production.sh 生产脚本与预置 DeepSeek Key，协助客户 5 分钟在自己服务器上跑通私有化 Agent 节点。",
    input: "Docker 脚本与 Key",
    output: "交付完成与尾款结算"
  },

  // 6. 8 大课程原子拼图 (COURSE-PUZZLE)
  {
    id: "COURSE-A-PUZZLE",
    category: "课程拼图",
    name: "跨境客服尺码引导换码降退货率原子块",
    description: "一键拦截尺码不合退货并引导免费补发",
    content: "提示词：买家称服装偏小要退货。客服表达诚挚歉意，并提供【免费补发大一码/免寄回】方案，降低 30% 退货损失。",
    input: "买家退货留言",
    output: "阻截成功与换码安排"
  },
  {
    id: "COURSE-B-PUZZLE",
    category: "课程拼图",
    name: "Midjourney 商业模特换装 Prompt 原子块",
    description: "3 秒生成商业摄影人像与虚拟换装",
    content: "Prompt: High-end commercial fashion photography, gorgeous female model wearing [产品描述], Hasselblad 85mm, f/1.8 --ar 3:4 --v 6.0",
    input: "服装描述",
    output: "商业级人像海报"
  },
  {
    id: "COURSE-D-PUZZLE",
    category: "课程拼图",
    name: "GEO Perplexity与ChatGPT 排名优化 Schema 原子块",
    description: "输出 JSON-LD 结构使生成式 AI 优先推荐",
    content: "JSON-LD: {@context: 'https://schema.org', @type: 'Product', name: '[品牌]-[产品]', aggregateRating: { ratingValue: '4.9' }}",
    input: "品牌与产品名",
    output: "GEO 权威推荐结构代码"
  },
  {
    id: "COURSE-H-PUZZLE",
    category: "课程拼图",
    name: "生财黑客松亚军 AI 智能排课消课原子块",
    description: "可视化日历排课与全班一键考勤消课",
    content: "冲突检测算法自动校验讲师与教室，一键扣减学员 1 课时并生成微信家校打卡卡片。",
    input: "考勤人员名单",
    output: "扣减课时与家校通知"
  }
];

function buildAtomicPuzzleSystem() {
  console.log('🚀 开始构建【原子拼图乐高系统】全量微型组件库...');

  // 1. 写入 registry JSON
  fs.writeFileSync(DATA_PUZZLE_FILE, JSON.stringify(ATOMIC_PUZZLES, null, 2), 'utf-8');

  // 2. 导出为 Obsidian 目录下的单文件拼图块 (.md)
  ATOMIC_PUZZLES.forEach(p => {
    const safeName = p.name.replace(/\//g, '_');
    const filename = `${p.id}_${safeName}.md`;
    const obsidianMd = `---
puzzle_id: ${p.id}
category: ${p.category}
name: ${p.name}
tags:
  - 原子拼图/${p.category}
  - 乐高组件
updated_at: ${new Date().toISOString()}
---

# 🧩 原子拼图块 [${p.id}]：${p.name}

> [!TIP] 拼图定位
> **分类**：${p.category}  
> **作用**：${p.description}

---

## 📥 输入参数 (Input)
\`\`\`text
${p.input}
\`\`\`

## ⚙️ 拼图核心内容与 Prompt/SOP 代码 (Puzzle Code)
\`\`\`text
${p.content}
\`\`\`

## 📤 输出结果 (Output)
\`\`\`text
${p.output}
\`\`\`

---
## 🔗 双向链接与拼图组合 (Puzzle Combination)
- [[00-主视窗导航与课程关系图]]
- [[02-原子拼图乐高系统全集]]
- [[01-把自己在用的Agent系统卖给客户的商业落地SOP]]
`;

    fs.writeFileSync(path.join(PUZZLE_VAULT_DIR, filename), obsidianMd, 'utf-8');
  });

  // 3. 生成 Obsidian 拼图全集索引页面
  const catalogMd = `---
title: 原子拼图乐高系统全集与拼接手册
tags:
  - 拼图主控
  - 乐高系统
updated_at: ${new Date().toISOString()}
---

# 🧩 昆仑 AI 商业与 Agent 原子拼图乐高系统全集

> [!IMPORTANT] 拼图使用理念
> 拒绝死板的长篇文档！我们将所有的**公域引流、私域打标、朋友圈文案、4天体验营、自用Agent销售、8大课程与交付动作**彻底解构成为了 **独立的【原子拼图块】**。
> 像拼积木一样，需要哪个环节就直接调用哪个拼图块进行组装！

---

## 🗺️ 拼图分类图谱

| 拼图编号 | 拼图名称 | 拼图分类 | 作用与调用场景 | 对应 Obsidian 笔记 |
| :--- | :--- | :--- | :--- | :--- |
${ATOMIC_PUZZLES.map(p => `| **${p.id}** | ${p.name} | ${p.category} | ${p.description} | [[${p.id}_${p.name.replace(/\//g, '_')}]] |`).join('\n')}

---

## 🛠️ 典型拼图组合示范 (Custom Workflow Assemblies)

### 拼图组合 1：【公域获客 ➔ 体验营发售 ➔ 5:5 分润】流水线
1. 拼接 \`[[HOOK-01_痛点反转开场钩子]]\` 吸引公域关注；
2. 拼接 \`[[TAG-01_进群自动化欢迎语与痛点调研]]\` 打上标签；
3. 拼接 \`[[CAMP-DAY1_Day 1 破冰与认知颠覆]]\` 刷新卖结果理念；
4. 拼接 \`[[CAMP-DAY4_Day 4 闭营发售与 5:5 签约]]\` 现场发售成交！

### 拼图组合 2：【出售自用 Agent 系统】现场演示流水线
1. 拼接 \`[[SELL-SELF-01_当面或直播展示真实运行后台]]\` 展示飞书 36 Agent 军团；
2. 拼接 \`[[SELL-SELF-02_现场导入客户真实业务数据测试]]\` 秒出方案震撼客户；
3. 拼接 \`[[SELL-SELF-03_Docker 一键私有化部署交钥匙]]\` 交付交钥匙工程！
`;

  fs.writeFileSync(path.join(__dirname, '..', 'obsidian_courses_vault', '00-主主控总纲', '02-原子拼图乐高系统全集.md'), catalogMd, 'utf-8');

  console.log(`🎉 【原子拼图乐高系统】全量构建完成！已成功输出 ${ATOMIC_PUZZLES.length} 个独立 Markdown 拼图块与集中索引！`);
}

buildAtomicPuzzleSystem();
