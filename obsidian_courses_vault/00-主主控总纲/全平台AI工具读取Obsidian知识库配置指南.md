---
title: 全平台 AI 工具自动调用 Obsidian 知识库配置指南 (Universal Context Injection)
tags:
  - AI知识库
  - 工具联动
  - 上下文注入
  - Obsidian
updated_at: 2026-08-02T23:55:00Z
---

# 🔗 全平台 AI 工具自动调用 Obsidian 知识库配置指南

> **目标**：让 Antigravity, OpenAI Codex, Claude Code, ChatGPT 桌面版, Hermes 微信 Agent 等所有 AI 工具，在执行任务时**100% 全自动感知并优先调用 Obsidian 中的方法论、SOP 与项目进度**。

---

## 🛠️ 1. 已全自动为您在系统底层打通的项目 (零手动配置)

通过符号软链接 (Symbolic Link)，我们已经将 Obsidian 知识库桥接到各个 AI 工具的底座中：

1. **Antigravity Agent**：
   - 默认工作区原生绑定 `/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault`。
   - 自动优先读取 `AGENTS.md` 和所有 `.md` 知识库。

2. **OpenAI Codex CLI**：
   - 已建立软链接：`~/.codex/skills/obsidian_vault` $\rightarrow$ Obsidian 知识库。
   - Codex 执行命令或查询时，自动扫描知识库内的 SOP。

3. **Claude Code**：
   - 已建立软链接：`~/.claude/skills/obsidian_vault` $\rightarrow$ Obsidian 知识库。
   - Claude 在命令行回答时自动包含全量 Obsidian 上下文。

4. **Hermes 微信 Agent**：
   - 已建立软链接：`~/.hermes/skills/obsidian_vault` $\rightarrow$ Obsidian 知识库。
   - 在微信与 Hermes 对话时，Hermes 会自动从 Obsidian 知识库中提取答案。

---

## 💬 2. 桌面客户端类 AI (ChatGPT 桌面版 / 网页版) 一键配置

由于 ChatGPT 桌面版为沙盒应用，建议在 **ChatGPT 软件的「Custom Instructions / 自定义指令」** 中粘贴以下这一段通用指导（复制即用）：

### 📋 复制粘贴到 ChatGPT Custom Instructions：
```markdown
# 知识库与输出行为规范
1. 本地知识库位于: `/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/`。
2. 在回答关于商业、8大课程、去AI味文案或项目进度时，优先遵循该知识库内的 SOP 与 AGENTS.md 规范。
3. 保持文字“极致人感与口语化”，单句控制在 15 字以内，单句独立换行，严禁使用“此外、综上所述、赋能”等生硬 AI 腔。
```

---

## 📌 3. 在任何 AI 工具里呼叫知识库的统一口令

以后无论您在哪个 AI 工具（ChatGPT、Claude、Codex、Hermes 微信）中打字，只要包含以下口令，AI 就会立刻去查 Obsidian：

- **查找 SOP**：“*参考 Obsidian 里的【小红书四路搜索 SOP】帮我出 5 个选题*”
- **查看进度**：“*读取 Obsidian 里的【全局项目进度看板】，看看课程 A 谁在做*”
- **生成内容**：“*遵照 Obsidian 里的【去 AI 味铁律】，帮我写一段朋友圈*”

---

## 🔗 双向链接
- [[00-主主控总纲]]
- [[AGENTS.md岗位说明书与行为约束通用规范]]
- [[昆仑增长多AI协同与项目进度全局看板]]
