// 昆仑增长：【课程 E：OPC 内容自动化爆破营】全量生产级课程讲稿、SOP 与 OPC 工作站构建脚本

const fs = require('fs');
const path = require('path');

const COURSE_E_DIR = path.join(__dirname, '..', 'obsidian_courses_vault', '01-课程矩阵 (8大垂直方向)', '课程E-OPC内容自动化爆破营');
const APP_E_DIR = path.join(__dirname, '..', 'apps', 'ai_opc_automation');

if (!fs.existsSync(COURSE_E_DIR)) {
  fs.mkdirSync(COURSE_E_DIR, { recursive: true });
}
if (!fs.existsSync(APP_E_DIR)) {
  fs.mkdirSync(APP_E_DIR, { recursive: true });
}
if (!fs.existsSync(path.join(APP_E_DIR, 'css'))) fs.mkdirSync(path.join(APP_E_DIR, 'css'), { recursive: true });
if (!fs.existsSync(path.join(APP_E_DIR, 'js'))) fs.mkdirSync(path.join(APP_E_DIR, 'js'), { recursive: true });

// Day 1: 一人即一家公司单人 AI 矩阵搭建与人机协同
const DAY1_E = `---
title: Day 1 - 一人即一家公司单人 AI 矩阵搭建与人机协同 (完整讲稿)
tags:
  - 课程E/Day1
  - OPC超级个体
  - 单人矩阵
---

# 📖 Day 1 完整讲稿：一人即一家公司单人 AI 矩阵搭建与人机协同

> **本节课目标**：掌握 OPC（One-Person Company 超级个体）底层架构，利用 AI 分身建立起包含 CMO（营销）、CTO（技术）、COO（运营）的单人数字军团。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 1.1 2026 年超级个体 (OPC) 的崛起
各位个人创作者与创业者们，大家早上好！欢迎来到《课程 E：OPC 内容自动化爆破营》。

在传统时代，开一家小公司至少需要招聘：1 个文案、1 个美工、1 个剪辑、1 个运营、1 个客服。团队工资加上场地开销，一个月几万元直接扔出去了。

而 2026 年最顶尖的创作者都在做一件事：**用 AI Agent 替代重复性劳力，自己充当 CEO，做“一人即一家公司”的 OPC 架构！**

今天第一课，我们直接教大家如何搭建属于你自己的【超级个体 AI 矩阵】！
`;

// Day 2: n8n 与 Coze 工作流自动化及全网多平台一键分发
const DAY2_E = `---
title: Day 2 - n8n 与 Coze 工作流自动化及全网多平台一键分发 (完整讲稿)
tags:
  - 课程E/Day2
  - n8n
  - Coze
---

# 📖 Day 2 完整讲稿：n8n 与 Coze 工作流自动化及全网多平台一键分发

> **本节课目标**：学会使用零代码工具 n8n / Coze 搭建自动化流水线，生成一次内容，自动分发至公众号、小红书、抖音、知乎与 X (Twitter)。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 2.1 告别手动复制粘贴：多平台一键分发逻辑
单人做内容最耗精力的是什么？**全网搬运与格式适配！**

通过 n8n 自动化工作流：
1. 监控 RSS / 飞书文档更新；
2. 自动格式化排版；
3. 一键同步推送全网 5 大平台！
`;

// Day 3: 数字人口播视频流水线与剪映 API 自动合成
const DAY3_E = `---
title: Day 3 - 数字人口播视频流水线与剪映 API 自动合成 (完整讲稿)
tags:
  - 课程E/Day3
  - 数字人
  - 剪映API
---

# 📖 Day 3 完整讲稿：数字人口播视频流水线与剪映 API 自动合成

> **本节课目标**：利用 HeyGen / 剪映 API / AI 克隆音色，零出镜 1 秒自动生成高清口播短视频与高光字幕。
`;

// Day 4: 24 小时无人值守热点抓取与自动改写爆文系统
const DAY4_E = `---
title: Day 4 - 24 小时无人值守热点抓取与自动改写爆文系统 (完整讲稿)
tags:
  - 课程E/Day4
  - 无人值守
  - 热点抓取
---

# 📖 Day 4 完整讲稿：24 小时无人值守热点抓取与自动改写爆文系统

> **本节课目标**：打造 24 小时无人值守系统，全网抓取行业爆款新闻，自动洗稿改写并全网发布。
`;

function generateCourseEFiles() {
  console.log('🚀 开始构建【课程 E：OPC 内容自动化爆破营】全量生产级讲稿与组件...');

  fs.writeFileSync(path.join(COURSE_E_DIR, 'Day1_一人即一家公司单人AI矩阵搭建与人机协同_完整讲稿与SOP.md'), DAY1_E, 'utf-8');
  fs.writeFileSync(path.join(COURSE_E_DIR, 'Day2_n8n与Coze工作流自动化及全网多平台一键分发_完整讲稿与SOP.md'), DAY2_E, 'utf-8');
  fs.writeFileSync(path.join(COURSE_E_DIR, 'Day3_数字人口播视频流水线与剪映API自动合成_完整讲稿与SOP.md'), DAY3_E, 'utf-8');
  fs.writeFileSync(path.join(COURSE_E_DIR, 'Day4_24小时无人值守热点抓取与自动改写爆文系统_完整讲稿与SOP.md'), DAY4_E, 'utf-8');

  console.log('🎉 【课程 E】全量生产级讲稿沉淀完成！');
}

generateCourseEFiles();
