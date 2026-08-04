import urllib.request
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

sites = [
    "https://kunlun-growth-website-1nt9w52vk-daseanles-projects.vercel.app",
    "https://wechatmedia-m4fre7nj4-daseanles-projects.vercel.app",
    "https://yiren-workbench-n53oa31kk-daseanles-projects.vercel.app"
]

print("🔍 正在诊断大帅在 Vercel 上部署的全部 3 个飞书 Agent 与新媒体项目...")

for url in sites:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            print(f"🌐 站点: {url}")
            print(f"   Status: HTTP {resp.status} OK")
            print(f"   Server: {resp.headers.get('Server', 'Vercel')}")
            body = resp.read().decode('utf-8')
            print(f"   页面大小: {len(body)} 字节")
    except Exception as e:
        print(f"❌ 站点 {url} 异常: {e}")

