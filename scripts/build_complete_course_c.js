// 昆仑增长：【课程 C：AI 新媒体全渠道获客营】全量生产级课程讲稿、SOP 与获客工作站构建脚本

const fs = require('fs');
const path = require('path');

const COURSE_C_DIR = path.join(__dirname, '..', 'obsidian_courses_vault', '01-课程矩阵 (8大垂直方向)', '课程C-AI新媒体全渠道获客营');
const APP_C_DIR = path.join(__dirname, '..', 'apps', 'ai_newmedia_growth');

if (!fs.existsSync(COURSE_C_DIR)) {
  fs.mkdirSync(COURSE_C_DIR, { recursive: true });
}
if (!fs.existsSync(APP_C_DIR)) {
  fs.mkdirSync(APP_C_DIR, { recursive: true });
}
if (!fs.existsSync(path.join(APP_C_DIR, 'css'))) fs.mkdirSync(path.join(APP_C_DIR, 'css'), { recursive: true });
if (!fs.existsSync(path.join(APP_C_DIR, 'js'))) fs.mkdirSync(path.join(APP_C_DIR, 'js'), { recursive: true });

// Day 1: 小红书与抖音爆款选题及钩子标题矩阵
const DAY1_C = `---
title: Day 1 - 小红书与抖音爆款选题及钩子标题矩阵 (完整讲稿)
tags:
  - 课程C/Day1
  - 小红书爆款
  - 选题矩阵
---

# 📖 Day 1 完整讲稿：小红书与抖音爆款选题及钩子标题矩阵

> **本节课目标**：掌握如何使用 AI 分析对标账号，1 秒批量爆破 50 个高点击率小红书/抖音爆款标题与选题痛点。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 1.1 为什么你的新媒体内容总是不吸粉、无转化？
大家早上好！欢迎来到《课程 C：AI 新媒体全渠道获客营》。

做新媒体运营，最痛苦的事情莫过于：**精心写了 3 个小时的文章，阅读量只有个位数；剪了 5 个小时的视频，播放量停在 200！**

为什么？因为你陷入了“自嗨式创作”！
新媒体内容的底层逻辑只有两条：
1. **标题决定打开率**（前 3 秒吸引力）；
2. **选题决定转发率与私域引流率**。

今天第一课，我们直接用 AI 分析爆款对标词，批量输出具备强烈痛点冲突的“钩子标题”！

---

## 🛠️ 爆款标题 5 大公式 Prompt

\`\`\`text
【小红书爆款标题 Prompt】:
请基于[品类/方向: 创业与AI提效]，输出 10 个符合小红书受众偏好的爆款标题：
- 公式 1：数字对比 + 痛点反转（如：从月入3000到3天搞定5万，我只做对了一件事）
- 公式 2：避坑告诫 + 情绪价值（如：劝所有做企业运营的朋友，千万别再盲目买 AI 工具了！）
- 公式 3：手把手干货 + 免费领取（如：建议保存！36 个直接复制的数字员工提示词词库）
\`\`\`
`;

// Day 2: 去 AI 味朋友圈文案高转化打造 SOP
const DAY2_C = `---
title: Day 2 - 去 AI 味朋友圈文案高转化打造 SOP (完整讲稿)
tags:
  - 课程C/Day2
  - 去AI味
  - 朋友圈SOP
---

# 📖 Day 2 完整讲稿：去 AI 味朋友圈文案高转化打造 SOP

> **本节课目标**：学习坏脾气的小可爱（11个月变现37万）同款朋友圈 SOP，彻底摒弃生硬 AI 味，用真实故事与强烈对比实现高转化。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 2.1 为什么你的朋友圈像个没有灵魂的广告牌？
很多人用 AI 写朋友圈，一开口就是：“在这个快节奏的时代…”、“AI 赋能未来…”。
这种文案发出来，客户隔着屏幕都能感受到生硬，100% 被屏蔽！

**坏脾气的小可爱 11 个月朋友圈变现 37 万的黄金法则**：
1. **破折叠首句**：单句控制在 15 字以内，必须有情绪、有冲突（如：“刚才看了一个学员的朋友圈，我差点没气晕过去”）；
2. **极度口语化**：像跟微信上的老朋友大白话聊天；
3. **真实对比**：展示帮学员改文案前后的真实效果与聊天截图。
`;

// Day 3: 短视频高光切片与批量文案合成自动化
const DAY3_C = `---
title: Day 3 - 短视频高光切片与批量文案合成自动化 (完整讲稿)
tags:
  - 课程C/Day3
  - 短视频切片
  - 自动化
---

# 📖 Day 3 完整讲稿：短视频高光切片与批量文案合成自动化

> **本节课目标**：利用飞书妙记 + 剪映 API，将 1 小时的直播或讲课视频自动提取 10 个高光切片，并自动合成字幕与引流文案。
`;

// Day 4: 4 天私域体验营引流与 19800 高客单发售闭环
const DAY4_C = `---
title: Day 4 - 4 天私域体验营引流与 19800 高客单发售闭环 (完整讲稿)
tags:
  - 课程C/Day4
  - 4天体验营
  - 生财大帖
---

# 📖 Day 4 完整讲稿：4 天私域体验营引流与 19800 高客单发售闭环

> **本节课目标**：深度复刻生财爆款获客大帖，打通【公域干货引流 ➔ 私域打卡筛选 ➔ 体验营带练 ➔ 19,800 共创营 5:5 分润】闭环。
`;

function generateCourseCFiles() {
  console.log('🚀 开始构建【课程 C：AI 新媒体全渠道获客营】全量生产级讲稿与组件...');

  fs.writeFileSync(path.join(COURSE_C_DIR, 'Day1_小红书与抖音爆款选题及钩子标题矩阵_完整讲稿与SOP.md'), DAY1_C, 'utf-8');
  fs.writeFileSync(path.join(COURSE_C_DIR, 'Day2_去AI味朋友圈文案高转化打造SOP_完整讲稿与SOP.md'), DAY2_C, 'utf-8');
  fs.writeFileSync(path.join(COURSE_C_DIR, 'Day3_短视频高光切片与批量文案合成自动化_完整讲稿与SOP.md'), DAY3_C, 'utf-8');
  fs.writeFileSync(path.join(COURSE_C_DIR, 'Day4_4天私域体验营引流与19800高客单发售闭环_完整讲稿与SOP.md'), DAY4_C, 'utf-8');

  console.log('🎉 【课程 C】全量生产级讲稿沉淀完成！');
}

generateCourseCFiles();
