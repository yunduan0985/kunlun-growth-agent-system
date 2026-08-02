---
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
