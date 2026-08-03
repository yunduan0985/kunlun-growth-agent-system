import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()
        
        url = "https://gi52wyhtwc.feishu.cn/wiki/Otrhwi9hSi6ekEkoRvrcNSd5nAh"
        print(f"🌐 访问页面: {url}")
        await page.goto(url, wait_until="networkidle", timeout=60000)
        
        # 模拟频繁平滑滚动触发所有节点展开
        for _ in range(15):
            await page.mouse.wheel(0, 1500)
            await asyncio.sleep(1)
            
        texts = []
        
        # 1. 抓取主 frame 的所有 element innerText
        main_elements = await page.query_selector_all("p, div, span, h1, h2, h3, code, pre")
        for el in main_elements:
            try:
                t = await el.inner_text()
                if t and len(t) > 5 and t not in texts:
                    texts.append(t)
            except:
                pass
                
        # 2. 抓取所有 iframes
        frames = page.frames
        print(f"📌 发现 {len(frames)} 个 frames...")
        for frame in frames:
            try:
                f_text = await frame.evaluate("() => document.body.innerText")
                if f_text and len(f_text) > 20:
                    texts.append(f"--- FRAME CONTENT ---\n" + f_text)
            except:
                pass
                
        full_result = "\n".join(texts)
        print(f"🎉 抓取到总字符数: {len(full_result)}")
        
        with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_deep_extracted.txt", "w", encoding="utf-8") as f:
            f.write(full_result)
            
        await browser.close()

asyncio.run(main())
