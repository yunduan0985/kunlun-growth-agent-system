import asyncio
from playwright.async_api import async_playwright
import json

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        url = "https://acnxzk6f4wv6.feishu.cn/wiki/JOAHwPYBpizqEpkCDBOcuxWbnsG"
        print(f"🌐 访问: {url}")
        await page.goto(url, wait_until="domcontentloaded", timeout=45000)
        await asyncio.sleep(4)
        
        title = await page.title()
        print(f"📌 标题: {title}")
        
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
        
        with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars_4.json", "w", encoding="utf-8") as f:
            json.dump(js_data, f, ensure_ascii=False, indent=2)
            
        print("✅ feishu_window_vars_4.json 成功生成！")
        await browser.close()

asyncio.run(main())
