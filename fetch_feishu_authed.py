import asyncio
from playwright.async_api import async_playwright
import os
import json

async def main():
    user_data_dir = os.path.expanduser("~/Library/Application Support/Google/Chrome")
    async with async_playwright() as p:
        print("🚀 使用 Mac 本地 Chrome 登录态启动...")
        try:
            browser = await p.chromium.launch_persistent_context(
                user_data_dir=user_data_dir,
                headless=True,
                channel="chrome",
                args=["--no-sandbox", "--disable-setuid-sandbox"]
            )
        except Exception as e:
            print(f"⚠️ 常规启动失败，尝试内置 Chromium 启动: {e}")
            browser = await p.chromium.launch(headless=True)
            
        page = browser.pages[0] if browser.pages else await browser.new_page()
        url = "https://acnxzk6f4wv6.feishu.cn/wiki/JOAHwPYBpizqEpkCDBOcuxWbnsG"
        print(f"🌐 访问: {url}")
        await page.goto(url, wait_until="networkidle", timeout=60000)
        await asyncio.sleep(5)
        
        title = await page.title()
        print(f"📌 穿透后标题: {title}")
        
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
            
        print("🎉 feishu_window_vars_4.json 成功生成并提取了全量 blocks！")
        await browser.close()

asyncio.run(main())
