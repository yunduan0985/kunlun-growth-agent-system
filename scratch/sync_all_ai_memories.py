"""
昆仑 Agent 全局知识库与“缘起”信条同步引擎
核心信条：“AI 的胜利，也就是知识库的胜利。”
来源：https://my.feishu.cn/wiki/RKfpwHw2QidxgGk9WgvczekMnIa
"""

import os
import json

CORE_PHILOSOPHY = {
    "philosophy": "AI 的胜利，也就是知识库的胜利。",
    "key_workflows": [
        "1. 本地微信聊天记录全量/增量解析与资产沉淀 (yichen-wechat-local-vault)",
        "2. 网页与飞书云文档全量 HTML/JSON Blocks 无损抓取并存入 Obsidian",
        "3. 5大学段 (幼/小/初/高/大) 教师差异化 30分钟访谈 SOP",
        "4. Live Demo 100% 真实交互与 PDF/Word 真实文件导出"
    ],
    "feishu_source": "https://my.feishu.cn/wiki/RKfpwHw2QidxgGk9WgvczekMnIa",
    "updated_at": "2026-08-03"
}

def sync_agent_memory():
    out_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/scratch/agent_core_philosophy.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(CORE_PHILOSOPHY, f, ensure_ascii=False, indent=2)
    print(f"✅ Agent 核心知识信条已同步保存: {out_path}")

if __name__ == "__main__":
    sync_agent_memory()
