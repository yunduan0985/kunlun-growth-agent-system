# 🚀 Vercel 与飞书 Agent 【写了就发】线上部署与联通档案

> **沉淀时间**：2026-08-03  
> **面向场景**：飞书多维表格 (Bitable)、Vercel 线上 Serverless 部署、飞书群消息卡片  
> **归属团队**：`daseanles-projects` (Vercel)

---

## 📌 一、大帅 Vercel 线上 4 大已部署飞书 Agent 项目清单

| 项目名称 | Vercel 线上 Production 状态 | 核心逻辑 / 功能 |
| :--- | :--- | :--- |
| **`math_wrong_notebook_web`** | 🟢 **`HTTP 200 OK`** (最新部署) | 飞书 Bitable 【写了就发】分发路由 `/api/bitable` + 港大 DeepTutor |
| **`kunlun-growth-website`** | 🟢 **`HTTP 200 OK`** | 昆仑增长官网与全场景 Agent 控制台 |
| **`wechatmedia`** | 🟢 **`HTTP 200 OK`** | 微信/新媒体文案全自动写了就发 Agent |
| **`yiren-workbench`** | 🟢 **`HTTP 200 OK`** | 亿人工作台 Agent 系统 |

---

## 🛠️ 二、Vercel 线上环境变量 (Environment Variables) 绑定指南

为确保在 Vercel 线上点击“写了就发”能 100% 将消息群发至飞书群，在 Vercel 控制台的项目设置中配置以下变量：

```env
FEISHU_APP_ID="你的飞书自建应用ID"
FEISHU_APP_SECRET="你的飞书自建应用Secret"
BITABLE_APP_TOKEN="你的飞书多维表格App Token"
BITABLE_TABLE_ID="你的飞书多维表格Table ID"
FEISHU_WEBHOOK_URL="你的飞书群自定义机器人Webhook URL"
```

---

## 🌐 三、线上 API 直达与测试

- **写了就发 Bitable 分发 API**：`https://math-wrong-notebook-web.vercel.app/api/bitable`
- **新媒体写了就发站点**：`https://wechatmedia-m4fre7nj4-daseanles-projects.vercel.app`
