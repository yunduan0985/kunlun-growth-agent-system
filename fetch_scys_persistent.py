import asyncio
from playwright.async_api import async_playwright
import os
import shutil

async def main():
    # 使用独立的临时 profile
    user_data_dir = "/tmp/chrome_scys_profile"
    os.makedirs(user_data_dir, exist_ok=True)
    
    async with async_playwright() as p:
        print("🚀 打开 Chrome 浏览器渲染生财有术文章...")
        context = await p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=False, # 弹出界面
            viewport={"width": 1400, "height": 900}
        )
        page = context.pages[0] if context.pages else await context.new_page()
        url = "https://scys.com/articleDetail/xq_topic/14422584218488442"
        print(f"🌐 访问: {url}")
        await page.goto(url)
        
        # 轮询 15 次监控标题或页面变动
        for i in range(12):
            await asyncio.sleep(2)
            title = await page.title()
            print(f"[{i+1}/12] 当前页面标题: {title}")
            
            # 如果成功跳过了微信登录页
            if "登录" not in title and "微信" not in title:
                print("🎉 检测到成功进入生财文章！开始抓取...")
                inner_text = await page.evaluate("() => document.body.innerText")
                with open("/Volumes/MOVESPEED/下载/AIcode/Agent/scys_article_captured.txt", "w", encoding="utf-8") as f:
                    f.write(f"Title: {title}\nURL: {url}\n\n" + inner_text)
                print(f"✅ 已抓取字符数: {len(inner_text)}")
                break
                
        await context.close()

asyncio.run(main())
