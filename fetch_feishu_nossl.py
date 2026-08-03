import urllib.request
import ssl
import re
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://gi52wyhtwc.feishu.cn/wiki/Otrhwi9hSi6ekEkoRvrcNSd5nAh"
req = urllib.request.Request(
    url, 
    headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
    }
)

try:
    with urllib.request.urlopen(req, context=ctx) as response:
        html = response.read().decode('utf-8')
        print(f"📄 HTML 字节长度: {len(html)}")
        
        with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_page.html", "w", encoding="utf-8") as f:
            f.write(html)
            
        # 寻找飞书数据
        patterns = [
            r'window\.SSR_DATA\s*=\s*({.*?});',
            r'window\.__INITIAL_STATE__\s*=\s*({.*?});',
            r'window\.PRELOADED_STATE\s*=\s*({.*?});',
            r'<script id="SSR_DATA" type="application/json">(.*?)</script>'
        ]
        
        found = False
        for p in patterns:
            m = re.search(p, html, re.DOTALL)
            if m:
                print(f"🎉 成功匹配数据模式: {p[:30]}...")
                with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_data.json", "w", encoding="utf-8") as f:
                    f.write(m.group(1))
                found = True
                break
                
        if not found:
            print("🔍 提取 title 与 页面内 text 标记...")
            title_match = re.search(r'<title>(.*?)</title>', html)
            if title_match:
                print(f"📌 页面 Title: {title_match.group(1)}")
            
            # 使用 Playwright 抓取渲染后的 DOM 内容
            print("🚀 即将启动 Chrome 抓取 DOM 内容...")

except Exception as e:
    print(f"❌ 抓取失败: {e}")

