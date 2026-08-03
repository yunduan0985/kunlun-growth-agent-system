import urllib.request
import re
import json

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
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        print(f"📄 HTML 字节长度: {len(html)}")
        
        # 寻找飞书网页注入的 initial_data / client_vars
        with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_page.html", "w", encoding="utf-8") as f:
            f.write(html)
            
        # 搜寻页面里的 SSR 数据或 JSON 串
        matches = re.findall(r'window\.SSR_DATA\s*=\s*({.*?});', html, re.DOTALL)
        if matches:
            print("🎉 成功提取 window.SSR_DATA !")
            with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_ssr.json", "w", encoding="utf-8") as f:
                f.write(matches[0])
        else:
            print("🔍 尝试正则提纯 HTML 中的文本内容...")
            clean_text = re.sub(r'<script.*?>.*?</script>', '', html, flags=re.DOTALL)
            clean_text = re.sub(r'<style.*?>.*?</style>', '', clean_text, flags=re.DOTALL)
            clean_text = re.sub(r'<.*?>', ' ', clean_text)
            clean_text = re.sub(r'\s+', ' ', clean_text)
            print("提取的前 1000 字符预览:")
            print(clean_text[:1000])

except Exception as e:
    print(f"❌ 抓取失败: {e}")

