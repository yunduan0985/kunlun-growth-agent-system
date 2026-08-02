---
title: 全量代码工程与 Web 应用开箱部署指南
tags:
  - 代码工程
  - Web应用
  - 部署指南
---

# 💻 昆仑 Agent 系统全量 Web 应用与部署脚本清单

> **面向客户可直接私有化复刻的代码资产表**

## 1. 8 大垂直 Web 智能工作站应用
- 📦 **课程 A**：[apps/ai_crossborder_ecommerce](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_crossborder_ecommerce/index.html) (AI 跨境电商卖家工作站)
- 🎨 **课程 B**：[apps/ai_commercial_design](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_commercial_design/index.html) (AI 商业视觉设计工作站)
- 📱 **课程 C**：[apps/ai_newmedia_growth](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_newmedia_growth/index.html) (AI 新媒体全渠道获客中枢)
- 🌐 **课程 D**：[apps/ai_independent_geo](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_independent_geo/index.html) (AI 独立站与 GEO 出海中枢)
- 🤖 **课程 E**：[apps/ai_opc_automation](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_opc_automation/index.html) (OPC 超级个体自动化中枢)
- 🛡️ **课程 F**：[apps/ai_enterprise_general](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_enterprise_general/index.html) (AI 企服通识与 PII 脱敏中枢)
- 📄 **课程 G**：[apps/ai_office_productivity](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_office_productivity/index.html) (AI 智能办公全员提效中枢)
- 🎓 **课程 H**：[apps/ai_education_system](file:///Volumes/MOVESPEED/下载/AIcode/Agent/apps/ai_education_system/index.html) (生财黑客松亚军 AI 智能教务 OS)

## 2. 后端守护与部署一键启动脚本
- 守护进程：`services/feishu_bot_gateway.js` (端口 8090，双星调度)
- 生产启动：`apps/math_wrong_notebook_web/start_production.sh`
- RAG 数据库：`data/rag_knowledge.db` (包含 326 个 FTS5 全文索引切片)
