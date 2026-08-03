---
title: 跨电脑与跨账号 AI 工具调用 Obsidian 知识库方案 (Multi-Device & Cross-Account RAG)
tags:
  - 跨设备
  - 多账号
  - Git同步
  - API网关
  - Obsidian
updated_at: 2026-08-02T23:59:00Z
---

# 🌐 跨电脑与跨账号 AI 工具调用 Obsidian 知识库方案

> **问题**：在其他电脑（办公电脑、异地 Windows/Mac、伙伴电脑）上使用不同 AI 账号时，如何让异地 AI 工具也能实时调用本知识库？

---

## 🚀 方案一：Git 私有仓库全自动多端同步（最推荐 · 免费高效）

把本设备的 Obsidian 知识库托管在 **GitHub / Gitee 私有仓库**，实现所有电脑无缝同步。

```
[本台电脑 / 移动硬盘] ──(git push)──> GitHub 私有仓库 ──(git pull)──> [异地电脑 B / C]
                                                                      │
                                                                      ▼
                                                          异地电脑上的 AI 工具
                                                        (ChatGPT/Claude/Codex)
                                                        直接读取本地同步的 Vault
```

### 🛠️ 其它电脑配置 3 步走：
1. **第一次拉取**：在异地电脑上运行 `git clone <私有仓库地址>` 把知识库下载到本地。
2. **AI 工具软链接**：在异地电脑上把该目录软链接到当地 AI 工具（如 `~/.codex/skills/` 或 Cursor 打开该文件夹）。
3. **无感定时同步**：在 Obsidian 开启 **Obsidian Git 插件**（设置每 5 分钟自动 Sync），或挂载后台 5 分钟 `git pull` 脚本。
- **效果**：你在主设备更新了 SOP，异地电脑 5 分钟内全自动同步，异地 AI 瞬间获得最新知识！

---

## 🔐 方案二：搭建 API 私有网关（适合 Web 端 / 跨系统 AI 调用）

如果异地电脑无法安装本地目录，可以通过 API 域名远程检索：

```
[异地电脑/手机上的 AI (Custom GPTs/Dify/Coze)]
                       │ (携带 API-Key 的 HTTP 请求)
                       ▼
         [Cloudflare Tunnel 加密域名]
                       │
                       ▼
      [本台电脑上的 Python RAG 检索服务] ──> 读取 Obsidian 知识库并返回结果
```

- **安全防线**：设置专属 API-Key 鉴权，防止越权访问。
- **使用场景**：异地手机微信、网页版 ChatGPT Custom GPTs 或第三代 AI 命令行远程调用。

---

## 💾 方案三：移动硬盘插拔即用（硬件级秒级生效）

由于我们的 Obsidian 知识库存放在移动硬盘 `/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault` 上：
- 将移动硬盘直接插到任何 Mac 或 Windows 电脑上；
- 异地电脑上的 AI 工具选择打开该移动硬盘目录，即可秒级读取全量知识！

---

## 🔗 双向链接
- [[00-主主控总纲]]
- [[全平台AI工具读取Obsidian知识库配置指南]]
- [[AGENTS.md岗位说明书与行为约束通用规范]]
