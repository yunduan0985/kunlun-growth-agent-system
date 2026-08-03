import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    print("🚀 启动 Playwright 无头 Chrome 浏览器抓取飞书 Wiki...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        
        try:
            url = "https://gi52wyhtwc.feishu.cn/wiki/Otrhwi9hSi6ekEkoRvrcNSd5nAh"
            print(f"🌐 正在访问: {url}")
            await page.goto(url, wait_until="networkidle", timeout=30000)
            await asyncio.sleep(5) # 等待飞书动态卡片与文本全量渲染
            
            title = await page.title()
            print(f"📌 页面 Title: {title}")
            
            # 提取全页面可见文本
            inner_text = await page.evaluate("() => document.body.innerText")
            print(f"📄 提取到字符数: {len(inner_text)}")
            
            with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_content.txt", "w", encoding="utf-8") as f:
                f.write(f"Title: {title}\n\n" + inner_text)
                
            print("✅ 飞书文档全量内容已成功抓取并写入 feishu_content.txt ！")
            
        except Exception as e:
            print(f"❌ 抓取出错: {e}")
        finally:
            await browser.close()

asyncio.run(main())
