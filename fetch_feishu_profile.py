import asyncio
from playwright.async_api import async_playwright
import os
import shutil
import json

async def main():
    src_dir = os.path.expanduser("~/Library/Application Support/Google/Chrome/Default")
    temp_profile = "/tmp/chrome_temp_profile"
    
    # 拷贝 Cookies 与 Local Storage 即可免登录
    if os.path.exists(temp_profile):
        shutil.rmtree(temp_profile)
    os.makedirs(os.path.join(temp_profile, "Default"), exist_ok=True)
    
    print("📦 正在同步 Chrome Cookies 与 凭证...")
    for item in ["Cookies", "Local Storage", "Network"]:
        src_item = os.path.join(src_dir, item)
        dst_item = os.path.join(temp_profile, "Default", item)
        if os.path.exists(src_item):
            try:
                if os.path.isdir(src_item):
                    shutil.copytree(src_item, dst_item)
                else:
                    shutil.copy2(src_item, dst_item)
            except Exception as e:
                pass
                
    async with async_playwright() as p:
        print("🚀 使用带有真实凭证的临时 Profile 启动 Chrome...")
        context = await p.chromium.launch_persistent_context(
            user_data_dir=temp_profile,
            headless=True,
            channel="chrome"
        )
        page = context.pages[0] if context.pages else await context.new_page()
        
        url = "https://acnxzk6f4wv6.feishu.cn/wiki/JOAHwPYBpizqEpkCDBOcuxWbnsG"
        print(f"🌐 访问: {url}")
        await page.goto(url, wait_until="networkidle", timeout=60000)
        await asyncio.sleep(5)
        
        title = await page.title()
        print(f"📌 页面 Title: {title}")
        
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
            
        print("🎉 飞书 4 隐藏数据已成功抓取！")
        await context.close()

asyncio.run(main())
