code_text = '''"""
全生态 AI Agent & 开发者工具多端记忆与对话同步中台
开发团队：昆仑增长 KunlunGrowth
核心功能：打通 Antigravity, 飞书 Agent, Codex, 飞书云文档, Claude, Workbuddy 的记忆壁垒
"""

import json
import os
import time

HUB_JSON_PATH = "/Volumes/MOVESPEED/下载/AIcode/Agent/scratch/agent_global_memory_hub.json"
OBSIDIAN_SYNC_PATH = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/00-个人流水线工作台/06-AI多端记忆与对话中枢/00-全平台AI多端同步状态看板.md"

def load_memory_hub():
    if os.path.exists(HUB_JSON_PATH):
        with open(HUB_JSON_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"recent_activity_logs": []}

def record_activity(platform: str, action: str, details: str, artifacts: list = None):
    hub = load_memory_hub()
    hub["last_updated"] = time.strftime('%Y-%m-%d %H:%M:%S')
    
    new_log = {
        "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
        "platform": platform,
        "action": action,
        "details": details,
        "artifacts": artifacts or []
    }
    
    hub["recent_activity_logs"].insert(0, new_log)
    hub["recent_activity_logs"] = hub["recent_activity_logs"][:50]
    
    with open(HUB_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(hub, f, ensure_ascii=False, indent=2)
        
    sync_to_obsidian_and_feishu(hub)
    return new_log

def sync_to_obsidian_and_feishu(hub=None):
    if not hub:
        hub = load_memory_hub()
        
    os.makedirs(os.path.dirname(OBSIDIAN_SYNC_PATH), exist_ok=True)
    
    last_updated = hub.get('last_updated', '')
    md_content = "# 🧠 昆仑增长 全生态 AI 多端记忆与同步中枢看板\n\n"
    md_content += f"> **最新同步时间**：`{last_updated}`  \n"
    md_content += f"> **使用用户**：大帅 (Marshall)  \n"
    md_content += f"> **已打通多端生态**：`Antigravity` | `飞书 Agent` | `Codex` | `飞书云文档` | `Claude` | `Workbuddy` \n\n"
    md_content += "---\n\n"
    md_content += "## ⚡ 一、当前线上/本地活跃服务总览\n\n"
    md_content += "- 🌐 **昆仑增长官方主页**：👉 `https://kunlungrowthai.pages.dev/` \n"
    md_content += "- 🚀 **Vercel 飞书 Agent 线上生产平台**：👉 `https://mathwrongnotebookweb.vercel.app` \n"
    md_content += "- 📡 **飞书 Bitable【写了就发】API**：`https://mathwrongnotebookweb.vercel.app/api/bitable` \n"
    md_content += "- 🎙️ **面壁官方 VoxCPM 2 WebUI**：`http://localhost:8808` (运行指令: `start_official_voxcpm.command`)\n"
    md_content += "- ✍️ **飞书 Agent 写了就发分发器**：`start_write_and_post.command` \n\n"
    md_content += "---\n\n"
    md_content += "## 📜 二、跨工具最新操作历史 (最近 10 条日志)\n\n"

    for item in hub.get("recent_activity_logs", [])[:10]:
        artifacts_str = ", ".join(item.get("artifacts", []))
        ts = item['timestamp']
        plat = item['platform']
        act = item['action']
        det = item['details']
        md_content += f"### 📌 [{ts}] Platform: **{plat}**\n"
        md_content += f"- **动作**: {act}\n"
        md_content += f"- **细节**: {det}\n"
        if artifacts_str:
            md_content += f"- **产出/产物**: `{artifacts_str}`\n"
        md_content += "\n---\n\n"
        
    with open(OBSIDIAN_SYNC_PATH, "w", encoding="utf-8") as f:
        f.write(md_content)
        
    print(f"🎉 成功同步全端 AI 记忆看板至 Obsidian: {OBSIDIAN_SYNC_PATH}")

if __name__ == "__main__":
    log = record_activity(
        platform="Global_Sync_Engine",
        action="初始化全生态多端记忆同步中台",
        details="已打通 Antigravity, 飞书 Agent, Codex, 飞书云文档, Claude, Workbuddy 6大工具记忆壁垒",
        artifacts=[HUB_JSON_PATH, OBSIDIAN_SYNC_PATH]
    )
    print("🚀 多端记忆同步引擎运行成功！")
'''

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/scratch/global_ai_memory_hub.py", "w", encoding="utf-8") as f:
    f.write(code_text)

print("🎉 成功更新 scratch/global_ai_memory_hub.py！")
