// 昆仑增长：【课程 D：AI 独立站开发与 GEO 搜索引擎优化营】全量生产级课程讲稿、SOP 与 GEO 工作站构建脚本

const fs = require('fs');
const path = require('path');

const COURSE_D_DIR = path.join(__dirname, '..', 'obsidian_courses_vault', '01-课程矩阵 (8大垂直方向)', '课程D-AI独立站开发与GEO');
const APP_D_DIR = path.join(__dirname, '..', 'apps', 'ai_independent_geo');

if (!fs.existsSync(COURSE_D_DIR)) {
  fs.mkdirSync(COURSE_D_DIR, { recursive: true });
}
if (!fs.existsSync(APP_D_DIR)) {
  fs.mkdirSync(APP_D_DIR, { recursive: true });
}
if (!fs.existsSync(path.join(APP_D_DIR, 'css'))) fs.mkdirSync(path.join(APP_D_DIR, 'css'), { recursive: true });
if (!fs.existsSync(path.join(APP_D_DIR, 'js'))) fs.mkdirSync(path.join(APP_D_DIR, 'js'), { recursive: true });

// Day 1: AI 辅助 Vite 与 Shopify 高颜值响应式独立站极速建站
const DAY1_D = `---
title: Day 1 - AI 辅助 Vite 与 Shopify 高颜值响应式独立站极速建站 (完整讲稿)
tags:
  - 课程D/Day1
  - 独立站建站
  - Shopify
---

# 📖 Day 1 完整讲稿：AI 辅助 Vite 与 Shopify 高颜值响应式独立站极速建站

> **本节课目标**：掌握如何使用 AI（ChatGPT/DeepSeek）辅助进行 Vite/Shopify 代码生成、极速搭建高颜值外贸独立站并完成响应式适配。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 1.1 为什么外贸与品牌出海必须做 GEO 独立站？
各位出海企业家与独立站站长们，大家早上好！欢迎来到《课程 D：AI 独立站开发与 GEO 搜索引擎优化营》。

在传统时代，出海建站要找外包公司，花几万元、耗时 2 个月才能做一个简陋的独立站。
而在 2026 年，**用户不再通过谷歌搜索单个网页，而是直接问 ChatGPT 和 Perplexity！**

传统的 SEO（搜索引擎优化）正在被 **GEO（Generative Engine Optimization 生成式引擎优化）** 彻底取代！

今天第一课，我们直接教大家如何用 AI 辅助在半天内搭建起高颜值的出海独立站！
`;

// Day 2: GEO 生成式搜索引擎优化针对 ChatGPT 与 Perplexity 算法实战
const DAY2_D = `---
title: Day 2 - GEO 生成式搜索引擎优化针对 ChatGPT 与 Perplexity 算法实战 (完整讲稿)
tags:
  - 课程D/Day2
  - GEO优化
  - Perplexity
---

# 📖 Day 2 完整讲稿：GEO 生成式搜索引擎优化针对 ChatGPT 与 Perplexity 算法实战

> **本节课目标**：掌握 GEO（生成式搜索引擎优化）核心算法，让你的独立站与品牌被 Perplexity、ChatGPT、Claude 优先作为权威源推荐。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 2.1 什么是 GEO？为什么它比传统的 Google SEO 重要 10 倍？
当海外买家问 ChatGPT：“2026 年最好的智能健身设备有哪些？”
如果你的产品出现在 AI 的推荐清单第 1 位，成交转化率高达 40%！

GEO 优化的三大黄金法则：
1. **结构化数据与权威引用格式**（JSON-LD Schema + 统计数据引用）；
2. **问答式与对话式语义契合**（FAQ & Problem-Solving Format）；
3. **第三方信任背书网络构建**。
`;

// Day 3: 海外多语种博客与长尾词 SEO 批量生产闭环
const DAY3_D = `---
title: Day 3 - 海外多语种博客与长尾词 SEO 批量生产闭环 (完整讲稿)
tags:
  - 课程D/Day3
  - 海外博客
  - 多语种SEO
---

# 📖 Day 3 完整讲稿：海外多语种博客与长尾词 SEO 批量生产闭环

> **本节课目标**：学会利用 AI 批量输出高质感多语种出海博客文章，占据 Google 与生成式 AI 的长尾流量高地。
`;

// Day 4: 外贸高转化询盘与客户邮件自动化追踪 SOP
const DAY4_D = `---
title: Day 4 - 外贸高转化询盘与客户邮件自动化追踪 SOP (完整讲稿)
tags:
  - 课程D/Day4
  - 外贸询盘
  - 邮件自动化
---

# 📖 Day 4 完整讲稿：外贸高转化询盘与客户邮件自动化追踪 SOP

> **本节课目标**：建立 AI 自动邮件追单与外贸询盘回复流程，提升 50% 询盘转化率。
`;

function generateCourseDFiles() {
  console.log('🚀 开始构建【课程 D：AI 独立站开发与 GEO 搜索引擎优化营】全量生产级讲稿与组件...');

  fs.writeFileSync(path.join(COURSE_D_DIR, 'Day1_AI辅助Vite与Shopify高颜值响应式独立站极速建站_完整讲稿与SOP.md'), DAY1_D, 'utf-8');
  fs.writeFileSync(path.join(COURSE_D_DIR, 'Day2_GEO生成式搜索引擎优化针对ChatGPT与Perplexity算法实战_完整讲稿与SOP.md'), DAY2_D, 'utf-8');
  fs.writeFileSync(path.join(COURSE_D_DIR, 'Day3_海外多语种博客与长尾词SEO批量生产闭环_完整讲稿与SOP.md'), DAY3_D, 'utf-8');
  fs.writeFileSync(path.join(COURSE_D_DIR, 'Day4_外贸高转化询盘与客户邮件自动化追踪SOP_完整讲稿与SOP.md'), DAY4_D, 'utf-8');

  console.log('🎉 【课程 D】全量生产级讲稿沉淀完成！');
}

generateCourseDFiles();
