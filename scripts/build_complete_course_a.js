// 昆仑增长：【课程 A：AI 跨境电商爆破营】全量生产级课程讲稿、SOP 与教案构建引擎

const fs = require('fs');
const path = require('path');

const COURSE_A_DIR = path.join(__dirname, '..', 'obsidian_courses_vault', '01-课程矩阵 (8大垂直方向)', '课程A-AI跨境电商爆破营');
const APPS_DIR = path.join(__dirname, '..', 'apps', 'ai_crossborder_ecommerce', 'data');

if (!fs.existsSync(COURSE_A_DIR)) {
  fs.mkdirSync(COURSE_A_DIR, { recursive: true });
}
if (!fs.existsSync(APPS_DIR)) {
  fs.mkdirSync(APPS_DIR, { recursive: true });
}

// Day 1 完整讲稿与 SOP
const DAY1_CONTENT = `---
title: Day 1 - AI 爆品选品与竞品买家痛点深度挖掘 (完整讲稿)
tags:
  - 课程A/Day1
  - 选品SOP
  - 竞品分析
---

# 📖 Day 1 完整讲稿：AI 爆品选品与竞品买家痛点深度挖掘

> **本节课目标**：掌握如何使用 AI 工具链（DeepSeek/ChatGPT）对亚马逊/TikTok/独立站上 10,000+ 真实买家评价进行毫秒级抓取与清洗，精准提取攻击性卖点、差评避坑点与 A9 高权重搜索词。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 1.1 为什么传统的跨境选品方法在 2026 年彻底失效？
各位跨境卖家的学员们，大家早上好！欢迎来到《AI 跨境电商爆破营》第一天。

在过去，很多亚马逊和 TikTok 卖家选品怎么做？靠经验、靠感觉、或者死盯着 Jungle Scout / Keepa 看排名。等你看出某个品卖得火的时候，全网已经有几百个中国卖家在大打价格战了！

**2026 年真正的选品逻辑是：先找买家未被满足的痛点，再反向定制产品。**

森马（巴拉巴拉）做到了 94 台数字员工干了 500 人的活，他们的核心秘诀就是**场景化数据挖掘**。今天，我们要带大家用 AI 替代繁重的表单分析，5 分钟挖掘出一个蓝海赛道！

---

## 🛠️ 第二部分：实战 SOP 步骤与工具链

### SOP 步骤一：抓取竞品 10,000+ 买家真实评论
使用 Chrome 插件或 Python 脚本，将竞品 Top 10 Listing 的 1-star 到 5-star 评论全量导出为 CSV 格式。

### SOP 步骤二：AI 评论清洗与归因提示词 (Prompt)

\`\`\`markdown
你是一名拥有 10 年经验的亚马逊选品专家与消费者行为分析师。
请对附带的 500 条竞品买家评价进行深度归因分析，输出以下 JSON 结构：

1. [High-Converting Selling Points]: 买家提到频率最高且满意的 3 个特征（附带原声引用）
2. [Critical Pain Points & Flaws]: 买家最痛恨、导致退货的 3 大缺陷（附带改进建议）
3. [Search Keywords]: 买家在表达需求时使用的高频真实搜索词表
4. [Unmet Needs]: 市场上目前尚无卖家完美解决的隐形需求
\`\`\`

---

## 📝 第三部分：课后实操作业

1. 选择你目前在售或准备上架的 1 款跨境产品；
2. 导出竞品 100 条差评，使用 Day 1 Prompt 进行归因分析；
3. 提交一份包含《3 大卖点 + 3 大改进点 + 10 个高权重搜索词》的选品报告。
`;

// Day 2 完整讲稿与 SOP
const DAY2_CONTENT = `---
title: Day 2 - 多语言 Listing 与 Amazon A9 SEO 优化实战 (完整讲稿)
tags:
  - 课程A/Day2
  - Listing生成
  - A9SEO
---

# 📖 Day 2 完整讲稿：多语言 Listing 与 Amazon A9 SEO 优化实战

> **本节课目标**：学会一键生成符合亚马逊 A9 算法、搜索权重极高、支持英/德/日/西多语种的高转化爆款 Listing、5 点描述与 A+ 品牌文案。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 2.1 亚马逊 A9 算法喜欢什么样的 Listing？
大家好！今天我们进入第二天课程。

很多做跨境的朋友经常问我：“为什么我的 Listing 砸了 CPC 广告还是没有出单？”
答案很简单：**你的 Listing 没有通过 A9 算法的语义匹配与转化率双重考核！**

亚马逊 A9 算法对 Listing 有三个硬性要求：
1. **标题 (Title)** 必须包含核心高搜词，且 200 字符内不堆砌；
2. **5点描述 (Bullet Points)** 必须解决买家顾虑，首词大写带强烈情绪；
3. **小语种（德语/日语/西班牙语）** 绝不能直接用谷歌翻译，必须符合当地语法与消费习惯。

今天我们直接用工作站的【多语言 Listing 生成器】，1 秒完成欧美日全市场 Listing 生成！

---

## 🛠️ 第二部分：爆款 Listing 生成提示词模板

\`\`\`markdown
请为[产品名称: 智能降噪运动耳机]生成一套符合 Amazon A9 算法与当地消费心理的[德语] Listing：

【标题规范】：
- 200字符内，格式：[品牌] + [核心高搜词] + [差异化卖点] + [适用场景/人群]

【5点描述规范】：
- Bullet 1: 【45dB AKTIVE GERÄUSCHUNTERDRÜCKUNG】突出降噪深度与办公/健身体验
- Bullet 2: 【48 STUNDEN WIEDERGABEZEIT】突出续航与 LED 充电仓
- Bullet 3: 【IPX8 WASSERDICHT & SCHWEISSECHT】突出防水防汗性能
- Bullet 4: 【ERGANOMISCHER TRAGEKOMFORT】突出耳塞佩戴稳定性与无痛感
- Bullet 5: 【SCHNELLE AUTOMATISCHE KOPPLUNG】突出蓝牙 5.4 极速配对
\`\`\`
`;

// Day 3 完整讲稿与 SOP
const DAY3_CONTENT = `---
title: Day 3 - TikTok 爆款短视频脚本与多语种 AI 数字人口播 (完整讲稿)
tags:
  - 课程A/Day3
  - TikTok
  - 数字人脚本
---

# 📖 Day 3 完整讲稿：TikTok 爆款短视频脚本与多语种 AI 数字人口播

> **本节课目标**：掌握 TikTok 黄金 3 秒 Hook 爆款带货脚本撰写、场景化展示与多语种 AI 数字人口播带货视频自动化闭环。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 3.1 TikTok 短视频带货的“黄金 3 秒法则”
欢迎来到第三天！今天我们聚焦全网流量爆发最猛的渠道——**TikTok Shop**。

TikTok 上的用户滑动视频速度极快。如果你的视频在**前 3 秒 (Hook)** 没有抓住他们的眼球，后面的内容再精彩也是零！

爆款 TikTok 带货脚本公式：
- **0-3 秒 (Hook)**：反常识/痛苦痛点夸张展示/惊人对比（如“Stop Buying $8 Smoothies!”）；
- **4-15 秒 (Demo)**：视觉冲击力极强的硬核功能展示（打碎冰块、防水实验）；
- **16-30 秒 (CTA)**：引导点击小黄车限时特惠，临门一脚发售！

---

## 🎬 第三部分：黄金 Hook 脚本模板库

\`\`\`text
[HOOK 1 (反常识钩子)]:
"You've been using your Blender ALL WRONG! Watch this..."

[HOOK 2 (省钱攻心钩子)]:
"Stop wasting $10 every morning at juice bars. This $19 mini blender paid for itself in 2 days!"
\`\`\`
`;

// Day 4 完整讲稿与 SOP
const DAY4_CONTENT = `---
title: Day 4 - 智能客服尺码引导换码降低 30% 退货率闭环 (完整讲稿)
tags:
  - 课程A/Day4
  - 客服换码
  - 降退货率
---

# 📖 Day 4 完整讲稿：智能客服尺码引导换码降低 30% 退货率闭环

> **本节课目标**：搭建智能客服交互流程，在买家因尺码问题要退货前自动引导“免费补发大一码/免寄回包邮”，直接降低 30% 跨境退货物流损耗！

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 4.1 跨境电商最痛的伤口：退货运费吞噬全部利润！
今天是《课程 A》的收官之战。

做服装、鞋帽和户外用品的跨境卖家都有一个共同的痛点：**退货率高高达 20%-35%！** 国际退货运费昂贵，寄回国内不现实，销毁又是纯亏。

但是根据大数据统计，**近 60% 的退货仅仅是因为“尺码偏大或偏小”！**

如果我们能在买家点击“退货申请”的第 1 时间，通过 AI 客服给买家推送“**免寄回、免费补发大一码**”的挽留方案，不仅买家大喜过望，卖家更省下了巨额退货物流费与差评风险！

---

## 💬 智能客服拦截话术 SOP

\`\`\`text
Dear [Customer Name],

Thank you for contacting us! We're so sorry to hear that the size didn't fit as expected.

Instead of bothering to pack and ship the item back to Amazon (which takes 7-10 days), we want to make things super easy for you:

🎁 Option 1: We will ship you a brand new, LARGER SIZE for FREE immediately. You can keep the current one!
💳 Option 2: 50% instant partial refund, and you keep the product to gift to a friend.

Please let us know your choice, and we'll process it within 2 hours!
\`\`\`
`;

function buildAllCourseFiles() {
  console.log('🚀 开始构建【课程 A：AI 跨境电商爆破营】全量生产级讲稿与教案...');

  fs.writeFileSync(path.join(COURSE_A_DIR, 'Day1_AI爆品选品与竞品买家痛点深度挖掘_完整讲稿与SOP.md'), DAY1_CONTENT, 'utf-8');
  fs.writeFileSync(path.join(COURSE_A_DIR, 'Day2_多语言Listing与Amazon_A9_SEO优化实战_完整讲稿与SOP.md'), DAY2_CONTENT, 'utf-8');
  fs.writeFileSync(path.join(COURSE_A_DIR, 'Day3_TikTok爆款短视频脚本与多语种AI数字人口播_完整讲稿与SOP.md'), DAY3_CONTENT, 'utf-8');
  fs.writeFileSync(path.join(COURSE_A_DIR, 'Day4_智能客服尺码引导换码降低30%退货率闭环_完整讲稿与SOP.md'), DAY4_CONTENT, 'utf-8');

  // 同时导出全量大纲 JSON 给应用使用
  const fullCourseData = {
    courseId: 'COURSE-A',
    title: 'AI 跨境电商爆破营 (全量生产级版)',
    totalDays: 4,
    status: 'COMPLETE',
    day1: DAY1_CONTENT,
    day2: DAY2_CONTENT,
    day3: DAY3_CONTENT,
    day4: DAY4_CONTENT
  };

  fs.writeFileSync(path.join(APPS_DIR, 'full_course_a_data.json'), JSON.stringify(fullCourseData, null, 2), 'utf-8');

  console.log('🎉 【课程 A】全量生产级讲稿与 SOP 构建完成！');
}

buildAllCourseFiles();
