import os

rule_dir = "/Volumes/MOVESPEED/下载/AIcode/Agent/.agents/rules"
os.makedirs(rule_dir, exist_ok=True)

rule_content = """# 🧠 全生态 AI 零人工干预·自动记忆同频元规则 (Auto-Memory System Instruction)

## 📌 核心最高指令 (Priority 0)
从即日起，所有 AI 节点（包括 Antigravity、飞书 Agent、Codex、Claude、Workbuddy）：

1. **在每次对话初始化或响应大帅 (Marshall) 的任何请求前，必须静默自动读取**：
   - 📄 看板路径：`obsidian_courses_vault/00-个人流水线工作台/06-AI多端记忆与对话中枢/00-全平台AI多端同步状态看板.md`
   - 📄 JSON路径：`scratch/agent_global_memory_hub.json`
2. **严禁要求大帅手动提示**“请去读取看板”或“请同步记忆”。AI 必须做到**启动即自动读取、静默完成上下文融合**！
3. **在每次回答开头或决策推理中**，自动融合看板中的最新部署域名、已运行服务与跨端最新操作记录。

---

## ⚡ 自动化执行链路
- 启动 / 接收消息 -> 0 毫秒静默加载看板 -> 继承全端最新上下文 -> 执行交付
"""

rule_path = os.path.join(rule_dir, "00-global-memory-auto-read.md")
with open(rule_path, "w", encoding="utf-8") as f:
    f.write(rule_content)

print(f"🎉 成功生成静默自动读取元规则: {rule_path}")

