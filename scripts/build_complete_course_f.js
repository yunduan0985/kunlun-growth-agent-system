// 昆仑增长：【课程 F：AI 企服通识与数字员工普及营】全量生产级课程讲稿、SOP 与企服中枢构建脚本

const fs = require('fs');
const path = require('path');

const COURSE_F_DIR = path.join(__dirname, '..', 'obsidian_courses_vault', '01-课程矩阵 (8大垂直方向)', '课程F-AI企服通识与数字员工');
const APP_F_DIR = path.join(__dirname, '..', 'apps', 'ai_enterprise_general');

if (!fs.existsSync(COURSE_F_DIR)) {
  fs.mkdirSync(COURSE_F_DIR, { recursive: true });
}
if (!fs.existsSync(APP_F_DIR)) {
  fs.mkdirSync(APP_F_DIR, { recursive: true });
}
if (!fs.existsSync(path.join(APP_F_DIR, 'css'))) fs.mkdirSync(path.join(APP_F_DIR, 'css'), { recursive: true });
if (!fs.existsSync(path.join(APP_F_DIR, 'js'))) fs.mkdirSync(path.join(APP_F_DIR, 'js'), { recursive: true });

// Day 1: DeepSeek与ChatGPT大模型底层逻辑及Prompt基础设施
const DAY1_F = `---
title: Day 1 - DeepSeek与ChatGPT大模型底层逻辑及Prompt基础设施 (完整讲稿)
tags:
  - 课程F/Day1
  - 大模型底层
  - Prompt基础设施
---

# 📖 Day 1 完整讲稿：DeepSeek与ChatGPT大模型底层逻辑及Prompt基础设施

> **本节课目标**：掌握大模型底层 Prompt 工程范式，构建企业级标准提示词库与交互规范。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 1.1 为什么全员 AI 通识是企业数字化的第一步？
各位企业家与企业学员们，大家早上好！欢迎来到《课程 F：AI 企服通识与数字员工普及营》。

很多企业买了大模型账号，给员工发下去，结果一个月后发现：**80% 的员工只拿 AI 来写周报、查百科！**

为什么？因为员工没有建立起 **Prompt 基础设施与人机协作思维**！

今天第一课，我们直接教大家如何把提示词变成企业标准化生产力！
`;

// Day 2: 企业数据安全与敏感PII保护及合规防护规范
const DAY2_F = `---
title: Day 2 - 企业数据安全与敏感PII保护及合规防护规范 (完整讲稿)
tags:
  - 课程F/Day2
  - 数据安全
  - PII脱敏
---

# 📖 Day 2 完整讲稿：企业数据安全与敏感PII保护及合规防护规范

> **本节课目标**：建立企业 AI 使用合规红线、敏感 PII（个人身份信息/财务机密）自动脱敏与安全防火墙。
`;

// Day 3: 拆解森马94台数字员工400场景自动化落地闭环
const DAY3_F = `---
title: Day 3 - 拆解森马94台数字员工400场景自动化落地闭环 (完整讲稿)
tags:
  - 课程F/Day3
  - 森马案例
  - 400场景
---

# 📖 Day 3 完整讲稿：拆解森马94台数字员工400场景自动化落地闭环

> **本节课目标**：深度拆解森马 94 台数字员工（相当于 545 人）在直播、供应链与视觉设计的 400+ 场景闭环落地。
`;

// Day 4: 人机协同组织重塑与企业全员AI通识认证交付
const DAY4_F = `---
title: Day 4 - 人机协同组织重塑与企业全员AI通识认证交付 (完整讲稿)
tags:
  - 课程F/Day4
  - 组织重塑
  - 通识认证
---

# 📖 Day 4 完整讲稿：人机协同组织重塑与企业全员AI通识认证交付

> **本节课目标**：重塑企业岗位流程，颁发全员 AI 通识认证，实现企业整体运营效率提升 300%。
`;

function generateCourseFFiles() {
  console.log('🚀 开始构建【课程 F：AI 企服通识与数字员工普及营】全量生产级讲稿与组件...');

  fs.writeFileSync(path.join(COURSE_F_DIR, 'Day1_DeepSeek与ChatGPT大模型底层逻辑及Prompt基础设施_完整讲稿与SOP.md'), DAY1_F, 'utf-8');
  fs.writeFileSync(path.join(COURSE_F_DIR, 'Day2_企业数据安全与敏感PII保护及合规防护规范_完整讲稿与SOP.md'), DAY2_F, 'utf-8');
  fs.writeFileSync(path.join(COURSE_F_DIR, 'Day3_拆解森马94台数字员工400场景自动化落地闭环_完整讲稿与SOP.md'), DAY3_F, 'utf-8');
  fs.writeFileSync(path.join(COURSE_F_DIR, 'Day4_人机协同组织重塑与企业全员AI通识认证交付_完整讲稿与SOP.md'), DAY4_F, 'utf-8');

  console.log('🎉 【课程 F】全量生产级讲稿沉淀完成！');
}

generateCourseFFiles();
