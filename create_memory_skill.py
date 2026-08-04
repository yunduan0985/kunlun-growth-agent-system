import os

skill_dir = "/Volumes/MOVESPEED/下载/AIcode/Agent/.agents/skills/global-memory-sync"
os.makedirs(skill_dir, exist_ok=True)

skill_md = """---
name: global-memory-sync
description: 全生态 AI Agent (Antigravity, 飞书 Agent, Codex, 飞书云文档, Claude, Workbuddy) 多端记忆与任务流全同步 SOP
---

# 🧠 全生态 AI 多端记忆与对话同步 SOP

为解决大帅 (Marshall) 在多 AI 工具（Antigravity / 飞书 Agent / Codex / 飞书云文档 / Claude / Workbuddy）之间切换时需反复手动同步状态的痛点，特建立本规范。

## 📌 一、核心共享记忆文件

1. **结构化记忆 JSON**：`scratch/agent_global_memory_hub.json`
2. **多端直观 Markdown 看板**：`obsidian_courses_vault/00-个人流水线工作台/06-AI多端记忆与对话中枢/00-全平台AI多端同步状态看板.md`

## 🚀 二、多端同步规范 (Multi-Agent Rule)

当任何 Agent 或 AI 工具节点完成以下任一动作时：
- 代码编译/部署成功 (如 Vercel, Cloudflare, Local WebUI)
- 新增飞书 Agent 【写了就发】卡片或多维表格路由
- 更新核心架构、SOP 或知识库

**必须自动触发调用**：
```bash
python3 /Volumes/MOVESPEED/下载/AIcode/Agent/scratch/global_ai_memory_hub.py
```
或在代码中导入：
```python
from scratch.global_ai_memory_hub import record_activity
record_activity(
    platform="Feishu_Agent / Claude / Codex / Antigravity",
    action="您完成的具体任务名称",
    details="对完成工作的简要阐述",
    artifacts=["相关文件路径或线上URL"]
)
```

## 💡 三、在新工具中恢复同频

当在 Claude、Codex 或飞书 Agent 中开始新对话时，AI 只需读取：
`obsidian_courses_vault/00-个人流水线工作台/06-AI多端记忆与对话中枢/00-全平台AI多端同步状态看板.md`
即可瞬间获取之前在其他所有工具中做过的全部工作，无需大帅重复解释！
"""

with open(os.path.join(skill_dir, "SKILL.md"), "w", encoding="utf-8") as f:
    f.write(skill_md)

print(f"🎉 成功生成多端记忆 Skill: {skill_dir}/SKILL.md")
