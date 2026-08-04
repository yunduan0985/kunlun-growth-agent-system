import json
import time

memory_hub_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/scratch/agent_global_memory_hub.json"

initial_hub = {
    "system_name": "昆仑增长 全生态 AI Agent 多端记忆与对话同步中台",
    "owner": "大帅 (Marshall)",
    "last_updated": time.strftime('%Y-%m-%d %H:%M:%S'),
    "supported_platforms": [
        "Antigravity",
        "Feishu_Agent",
        "Codex",
        "Feishu_Docs",
        "Claude",
        "Workbuddy"
    ],
    "active_project_state": {
        "official_website": "https://kunlungrowthai.pages.dev/",
        "matrix_demo_site": "https://demo.kunlungrowth.cn",
        "vercel_production_app": "https://mathwrongnotebookweb.vercel.app",
        "voxcpm2_speech_engine": "http://localhost:8808 (OpenBMB Official app.py)",
        "feishu_write_and_post": "ACTIVE (/api/bitable & start_write_and_post.command)"
    },
    "recent_activity_logs": [
        {
            "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
            "platform": "Antigravity",
            "action": "Vercel与飞书Agent写了就发全量部署成功上线",
            "details": "已修缮tsconfig排除项，Vercel 生产环境 (mathwrongnotebookweb.vercel.app) READY，包含 /api/bitable 分发中台",
            "artifacts": ["https://mathwrongnotebookweb.vercel.app/api/bitable", "start_write_and_post.command"]
        },
        {
            "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
            "platform": "Feishu_Agent",
            "action": "飞书Agent与Cloudflare/Vercel联通验证",
            "details": "飞书Agent全量可复用Cloudflare Pages与Vercel Serverless接口，写了就发自动群发飞书卡片",
            "artifacts": ["scratch/feishu_write_and_post_agent.py"]
        },
        {
            "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
            "platform": "Codex",
            "action": "OpenBMB 官方原装 VoxCPM 2 WebUI 本地部署",
            "details": "在 localhost:8808 部署面壁官方原版 app.py，双击 start_official_voxcpm.command 启动",
            "artifacts": ["http://localhost:8808", "start_official_voxcpm.command"]
        }
    ]
}

with open(memory_hub_path, "w", encoding="utf-8") as f:
    json.dump(initial_hub, f, ensure_ascii=False, indent=2)

print(f"🎉 成功初始化全局多端 AI 记忆中台: {memory_hub_path}")
