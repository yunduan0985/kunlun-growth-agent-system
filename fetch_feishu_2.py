import asyncio
from playwright.async_api import async_playwright
import json

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        
        url = "https://my.feishu.cn/wiki/RKfpwHw2QidxgGk9WgvczekMnIa"
        print(f"🌐 正在访问飞书链接: {url}")
        await page.goto(url, wait_until="networkidle", timeout=60000)
        
        # 获取页面 Title
        title = await page.title()
        print(f"📌 页面 Title: {title}")
        
        # 提取 window 上挂载的 DATA JSON 对象
        js_data = await page.evaluate('''() => {
            const result = {};
            for (let key in window) {
                if (key.includes('DATA') || key.includes('STATE') || key.includes('DOC') || key.includes('clientVars')) {
                    try {
                        result[key] = JSON.stringify(window[key]);
                    } catch(e) {}
                }
            }
            return result;
        }''')
        
        print(f"📌 捕获到的 window 变量键名: {list(js_data.keys())}")
        
        with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars_2.json", "w", encoding="utf-8") as f:
            json.dump(js_data, f, ensure_ascii=False, indent=2)
            
        await browser.close()

asyncio.run(main())
