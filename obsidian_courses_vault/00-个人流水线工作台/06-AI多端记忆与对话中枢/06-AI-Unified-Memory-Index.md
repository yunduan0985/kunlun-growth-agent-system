---
title: 全平台 AI 聊天记录、对话与记忆统一同步中枢 (Unified AI Brain)
tags:
  - AI记忆
  - 聊天同步
  - 多模型中枢
  - Hermes Agent
  - Obsidian
updated_at: 2026-08-02T23:35:00Z
---

# 🧠 全平台 AI 聊天记录、对话与记忆统一同步中枢 (Unified AI Brain)

> **目标**：打通 Antigravity, OpenAI Codex, Hermes Agent, Workbuddy, ChatGPT 桌面版, Claude 桌面版及网页端的所有 AI 对话、推理记忆与成果，全量自动化同步至 Obsidian 本地知识库。

---

## 📂 统一数据架构与路由索引

```
Obsidian Vault
└── 00-个人流水线工作台/06-AI多端记忆与对话中枢/
    ├── 01-Antigravity对话库/       ← (12 篇) 包含 Agent 自愈推理与架构对话
    ├── 02-ChatGPT桌面版对话库/    ← (64 篇) 包含 ChatGPT Desktop 本地对话与 Session 缓存
    ├── 03-Claude桌面版对话库/       ← (3 篇)  包含 Claude Code 与 Desktop 智能对话
    ├── 04-Codex对话库/            ← (56 篇) 包含 Codex 命令行与技能调用 Session
    ├── 07-HermesAgent微信与社群对话库/ ← (657 篇) 包含 Hermes 微信网关、网关与社群对话
    └── 05-Workbuddy与网页版对话库/  ← 包含 Workbuddy 及全网 AI 工具聊天记录
```

---

## 🛠️ 自动化同步工具

- **核心同步脚本**：`scratch/sync_all_ai_memories.py` (V3.0 深入全平台解包版)
- **使用方法**：系统已被挂载到后台，按以下规则全自动运行（也可手动调用）：
  1. 每天凌晨 03:00 与 中午 12:00 例行无感同步；
  2. 连续半小时不碰电脑自动空闲同步；
  3. 连续与 AI 工作满 5 小时自动保护性同步。

---

## 📌 当前已同步状态

- ✅ **全平台提取记录**: 已成功同步 **792 篇 Markdown 聊天与记忆文件**！
- ✅ **全平台支持**: 已支持 Antigravity, ChatGPT, Codex, Claude, Hermes Agent！

---

## 🔗 双向链接
- [[AGENTS.md岗位说明书与行为约束通用规范]]
- [[00-主主控总纲]]
- [[SYSTEM-04_IMA收-Obsidian炼-飞书享-Agent调四大工具分工与真实验收SOP]]
