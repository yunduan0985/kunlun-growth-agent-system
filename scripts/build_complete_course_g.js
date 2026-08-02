// 昆仑增长：【课程 G：AI 智能办公全员提效营】全量生产级课程讲稿、SOP 与办公中枢构建脚本

const fs = require('fs');
const path = require('path');

const COURSE_G_DIR = path.join(__dirname, '..', 'obsidian_courses_vault', '01-课程矩阵 (8大垂直方向)', '课程G-AI智能办公全员提效营');
const APP_G_DIR = path.join(__dirname, '..', 'apps', 'ai_office_productivity');

if (!fs.existsSync(COURSE_G_DIR)) {
  fs.mkdirSync(COURSE_G_DIR, { recursive: true });
}
if (!fs.existsSync(APP_G_DIR)) {
  fs.mkdirSync(APP_G_DIR, { recursive: true });
}
if (!fs.existsSync(path.join(APP_G_DIR, 'css'))) fs.mkdirSync(path.join(APP_G_DIR, 'css'), { recursive: true });
if (!fs.existsSync(path.join(APP_G_DIR, 'js'))) fs.mkdirSync(path.join(APP_G_DIR, 'js'), { recursive: true });

// Day 1: AI标书快速解析资质匹配与风控初稿生成
const DAY1_G = `---
title: Day 1 - AI标书快速解析资质匹配与风控初稿生成 (完整讲稿)
tags:
  - 课程G/Day1
  - 标书解析
  - 风控初稿
---

# 📖 Day 1 完整讲稿：AI标书快速解析资质匹配与风控初稿生成

> **本节课目标**：掌握如何使用 AI 解析几百页招标文件，10 秒匹配公司资质要求，自动生成响应方案初稿与废标风险清查。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 1.1 销售与商务团队最头疼的“标书加班噩梦”
各位职场精英与企业白领们，大家早上好！欢迎来到《课程 G：AI 智能办公全员提效营》。

相信做销售、商务和行政的朋友都有过这个经历：**拿到一份 300 页的招标文件，全员熬夜通宵拉表、找资质、对格式，一不小心因为某个细微废标条款导致全盘皆输！**

2026 年高效企业怎么做？**用 AI 10 秒提取废标项，自动填充标书架构，提效 10 倍！**

今天第一课，我们直接教大家建立【AI 标书极速解析与风控模型】！
`;

// Day 2: Excel与Python复杂表格及财务发票智能处理
const DAY2_G = `---
title: Day 2 - Excel与Python复杂表格及财务发票智能处理 (完整讲稿)
tags:
  - 课程G/Day2
  - ExcelAI
  - 财务发票
---

# 📖 Day 2 完整讲稿：Excel与Python复杂表格及财务发票智能处理

> **本节课目标**：学会利用 AI 自然语言生成复杂 Excel 公式/VBA/Python 脚本，实现财务发票 OCR 识别与报表自动合并。
`;

// Day 3: 智能会议纪要提取与工作周报待办归纳
const DAY3_G = `---
title: Day 3 - 智能会议纪要提取与工作周报待办归纳 (完整讲稿)
tags:
  - 课程G/Day3
  - 会议纪要
  - 工作周报
---

# 📖 Day 3 完整讲稿：智能会议纪要提取与工作周报待办归纳

> **本节课目标**：掌握飞书妙记/录音文件到结构化《会议纪要 + 待办责任人 + 周报模板》自动提炼流程。
`;

// Day 4: 合同风险合规扫描与法律条款自动比对闭环
const DAY4_G = `---
title: Day 4 - 合同风险合规扫描与法律条款自动比对闭环 (完整讲稿)
tags:
  - 课程G/Day4
  - 合同风控
  - 条款比对
---

# 📖 Day 4 完整讲稿：合同风险合规扫描与法律条款自动比对闭环

> **本节课目标**：建立 AI 合同审查机器人，自动扫描违约金陷阱、账期漏洞与权责模糊条款。
`;

function generateCourseGFiles() {
  console.log('🚀 开始构建【课程 G：AI 智能办公全员提效营】全量生产级讲稿与组件...');

  fs.writeFileSync(path.join(COURSE_G_DIR, 'Day1_AI标书快速解析资质匹配与风控初稿生成_完整讲稿与SOP.md'), DAY1_G, 'utf-8');
  fs.writeFileSync(path.join(COURSE_G_DIR, 'Day2_Excel与Python复杂表格及财务发票智能处理_完整讲稿与SOP.md'), DAY2_G, 'utf-8');
  fs.writeFileSync(path.join(COURSE_G_DIR, 'Day3_智能会议纪要提取与工作周报待办归纳_完整讲稿与SOP.md'), DAY3_G, 'utf-8');
  fs.writeFileSync(path.join(COURSE_G_DIR, 'Day4_合同风险合规扫描与法律条款自动比对闭环_完整讲稿与SOP.md'), DAY4_G, 'utf-8');

  console.log('🎉 【课程 G】全量生产级讲稿沉淀完成！');
}

generateCourseGFiles();
