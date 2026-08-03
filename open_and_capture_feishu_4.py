import asyncio
from playwright.async_api import async_playwright
import json
import time

async def main():
    print("🚀 正在为大帅弹窗打开第 4 篇飞书文档...")
    async with async_playwright() as p:
        # 打开带 UI 界面的 Chrome 浏览器
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(viewport={"width": 1400, "height": 900})
        page = await context.new_page()
        
        url = "https://acnxzk6f4wv6.feishu.cn/wiki/JOAHwPYBpizqEpkCDBOcuxWbnsG"
        print(f"🌐 访问: {url}")
        await page.goto(url)
        
        # 轮询 30 秒，一旦检测到页面文本渲染或 window.DATA
        for i in range(15):
            await asyncio.sleep(2)
            title = await page.title()
            print(f"[{i+1}/15] 当前页面标题: {title}")
            
            if "Log in" not in title and "登录" not in title:
                print("🎉 检测到页面已成功加载/进入文档！开始全量抓取...")
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
                print("✅ 已全量抓取到 feishu_window_vars_4.json ！")
                break
                
        await browser.close()

asyncio.run(main())
