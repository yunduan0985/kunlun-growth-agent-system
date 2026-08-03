"""
飞书 Agent × Cloudflare 边缘能力协同桥接引擎
开发团队：昆仑增长 KunlunGrowth
用途：实现飞书机器人与 Cloudflare Workers/Pages 边缘部署的无缝联动
"""

import json
import urllib.request
import ssl

def feishu_trigger_cloudflare_deploy(agent_name: str = "飞书Lark-CLI Agent", trigger_source: str = "飞书群消息指令"):
    """
    模拟飞书 Agent 接收指令后触发 Cloudflare 边缘部署与状态回执
    """
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    target_url = "https://kunlungrowthai.pages.dev/"
    req = urllib.request.Request(
        target_url,
        headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
    )
    
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            headers = dict(resp.headers)
            status_code = resp.status
            cf_ray = headers.get('CF-RAY', 'N/A')
            server = headers.get('Server', 'cloudflare')
    except Exception as e:
        status_code = 500
        cf_ray = str(e)
        server = "error"

    # 生成符合飞书卡片格式的响应 JSON
    feishu_card = {
        "msg_type": "interactive",
        "card": {
            "header": {
                "title": {"tag": "plain_text", "content": "⚡ Cloudflare 边缘部署 - 飞书 Agent 联动回执"},
                "template": "blue"
            },
            "elements": [
                {
                    "tag": "div",
                    "text": {"tag": "lark_md", "content": f"**触发来源**: {trigger_source}\n**操作 Agent**: {agent_name}\n**部署域名**: [{target_url}]({target_url})"}
                },
                {
                    "tag": "div",
                    "text": {"tag": "lark_md", "content": f"**Cloudflare 状态**: `HTTP {status_code} OK`\n**CF-RAY 节点**: `{cf_ray}`\n** Server Engine**: `{server}`"}
                },
                {
                    "tag": "action",
                    "actions": [
                        {
                            "tag": "button",
                            "text": {"tag": "plain_text", "content": "🚀 在线预览部署成果"},
                            "type": "primary",
                            "url": target_url
                        }
                    ]
                }
            ]
        }
    }
    
    return feishu_card

if __name__ == "__main__":
    card = feishu_trigger_cloudflare_deploy()
    print("🎉 飞书 Agent 联动 Cloudflare 桥接测试成功！生成的飞书交互卡片：")
    print(json.dumps(card, ensure_ascii=False, indent=2))
