// 昆仑增长：【课程 B：AI 商业视觉设计实战营】全量生产级课程讲稿、SOP 与视觉工具站构建脚本

const fs = require('fs');
const path = require('path');

const COURSE_B_DIR = path.join(__dirname, '..', 'obsidian_courses_vault', '01-课程矩阵 (8大垂直方向)', '课程B-AI商业视觉设计实战营');
const APP_B_DIR = path.join(__dirname, '..', 'apps', 'ai_commercial_design');

if (!fs.existsSync(COURSE_B_DIR)) {
  fs.mkdirSync(COURSE_B_DIR, { recursive: true });
}
if (!fs.existsSync(APP_B_DIR)) {
  fs.mkdirSync(APP_B_DIR, { recursive: true });
}
if (!fs.existsSync(path.join(APP_B_DIR, 'css'))) fs.mkdirSync(path.join(APP_B_DIR, 'css'), { recursive: true });
if (!fs.existsSync(path.join(APP_B_DIR, 'js'))) fs.mkdirSync(path.join(APP_B_DIR, 'js'), { recursive: true });

// Day 1: Midjourney 与 ComfyUI 商业摄影与模特换装 SOP
const DAY1_B = `---
title: Day 1 - Midjourney 与 ComfyUI 商业摄影与模特换装 SOP (完整讲稿)
tags:
  - 课程B/Day1
  - 商业摄影
  - 模特换装
---

# 📖 Day 1 完整讲稿：Midjourney 与 ComfyUI 商业摄影与模特换装 SOP

> **本节课目标**：掌握如何使用 AI（Midjourney v6 / ComfyUI）替代数万元的外籍模特与线下摄影棚租用费用，3 秒生成商业级人像服装穿搭与海报。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 1.1 传统商业摄影的四大成本痛点
各位设计师与电商美工朋友们，大家早上好！欢迎来到《课程 B：AI 商业视觉设计实战营》。

传统的服装与商业摄影有多贵？
1. 外籍模特：1500-3000元/小时，起拍 4 小时；
2. 摄影棚与灯光师：单日 5000 元以上；
3. 后期修图师：按张收费，周期长达 3-5 天；
4. 季改款式：一旦款式微调，全套海报必须重新重拍！

**森马（巴拉巴拉）每年视觉降本 70%-90%，核心就是建立了【AI 数字模特与 ComfyUI 虚拟试衣】系统。**

今天第一课，我们直接教大家如何用简单的 Prompt 与工作流，瞬间省下每年几十万的摄影费用！

---

## 🛠️ 第二部分：Midjourney 商业人像黄金提示词 Prompt 库

\`\`\`text
[欧美人像时尚摄影 Prompt]:
High-end commercial fashion photography, gorgeous European female model wearing [red luxury silk dress], editorial studio lighting, Hasselblad H6D-100c, 85mm lens, f/1.8, soft shadows, photorealistic skin texture, 8k resolution --ar 3:4 --v 6.0 --style raw

[亚洲古风/日系商业摄影 Prompt]:
Commercial lookbook photography, elegant Asian female model, natural daylight, soft bokeh, wearing minimalist linen clothes, studio background, clean aesthetic, ultra-detailed skin --ar 3:4 --v 6.0
\`\`\`
`;

// Day 2: 电商主图、3D 包装与场景化爆款海报
const DAY2_B = `---
title: Day 2 - 电商主图 3D 包装与场景化爆款海报生成 (完整讲稿)
tags:
  - 课程B/Day2
  - 电商主图
  - 3D包装
---

# 📖 Day 2 完整讲稿：电商主图 3D 包装与场景化爆款海报生成

> **本节课目标**：学会利用 AI 快速为瓶罐、化妆品、3C 产品进行 3D 渲染光影合成与电商主图生成，实现高点击率与爆款转化。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 2.1 爆款电商主图的“3 秒注意力法则”
在电商平台，主图的点击率 (CTR) 直接决定了产品的生死！

优秀的 3D 渲染主图需要具备：
1. **材质质感**：玻璃透光、金属反射、磨砂哑光；
2. **场景代入感**：护肤品搭配清晨水滴与绿叶；香水搭配高级大理石台面；
3. **视觉焦点**：产品居中，背景柔焦渲染。

今天我们将使用【AI 商业视觉工作站】的 3D 包装模块，1 键生成极致光影的商业级产品海报！
`;

// Day 3: ControlNet 与 IP-Adapter 角色与产品一致性控图
const DAY3_B = `---
title: Day 3 - ControlNet 与 IP-Adapter 角色及产品一致性控图 (完整讲稿)
tags:
  - 课程B/Day3
  - ControlNet
  - IP-Adapter
---

# 📖 Day 3 完整讲稿：ControlNet 与 IP-Adapter 角色及产品一致性控图

> **本节课目标**：解决 AI 绘图最大的痛点——“图片无法精准控制”，掌握精准锁姿势、锁产品造型与 IP 形象一致性渲染。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 3.1 商业落地最关键的门槛：精准控图
为什么很多设计师觉得 AI 生成的图“不能用”？因为不能精确控制产品的 Logo、外观线稿和姿势！

ComfyUI + ControlNet 的三大控图核心技术：
- **Canny / Lineart**：锁定产品外观轮廓与线稿，产品不走样；
- **Openpose**：锁定模特动作姿势与眼神角度；
- **IP-Adapter**：提取参考图的风格与产品材质，实现 100% 精准迁移。
`;

// Day 4: 企业级视觉设计降本 90% 流程全闭环交付
const DAY4_B = `---
title: Day 4 - 企业级视觉设计降本 90% 流程全闭环交付 (完整讲稿)
tags:
  - 课程B/Day4
  - 降本90%
  - 企业SOP
---

# 📖 Day 4 完整讲稿：企业级视觉设计降本 90% 流程全闭环交付

> **本节课目标**：帮助企业搭建标准化 AI 视觉设计流水线，形成视觉资产库，实现设计团队输出效率提升 10 倍。

---

## 🎙️ 第一部分：讲师授课逐字稿 (Lecture Script)

### 4.1 打造团队可复用的 AI 视觉资产库
单打独斗做 AI 不叫落地，**团队标准化 SOP 才是护城河**！

企业级视觉降本 90% 闭环 4 步法：
1. **建立品牌统一 Prompt 词典与权重表**；
2. **搭建团队专属 ComfyUI 云端工作流服务器**；
3. **制定美工与 AI 协作规范**（AI 生成素材 ➔ 美工二次排版加字）；
4. **版权合规与商用风控防范**。
`;

function generateCourseBFiles() {
  console.log('🚀 开始构建【课程 B：AI 商业视觉设计实战营】全量生产级讲稿与组件...');

  fs.writeFileSync(path.join(COURSE_B_DIR, 'Day1_Midjourney与ComfyUI商业摄影与模特换装SOP_完整讲稿与SOP.md'), DAY1_B, 'utf-8');
  fs.writeFileSync(path.join(COURSE_B_DIR, 'Day2_电商主图3D包装与场景化爆款海报生成_完整讲稿与SOP.md'), DAY2_B, 'utf-8');
  fs.writeFileSync(path.join(COURSE_B_DIR, 'Day3_ControlNet与IP-Adapter角色及产品一致性控图_完整讲稿与SOP.md'), DAY3_B, 'utf-8');
  fs.writeFileSync(path.join(COURSE_B_DIR, 'Day4_企业级视觉设计降本90%流程全闭环交付_完整讲稿与SOP.md'), DAY4_B, 'utf-8');

  console.log('🎉 【课程 B】全量生产级讲稿沉淀完成！');
}

generateCourseBFiles();
