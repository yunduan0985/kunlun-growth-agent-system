import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # 设置大窗口尺寸
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})
        url = "https://gi52wyhtwc.feishu.cn/wiki/Otrhwi9hSi6ekEkoRvrcNSd5nAh"
        print(f"🌐 打开页面: {url}")
        await page.goto(url, wait_until="domcontentloaded", timeout=60000)
        
        # 循环向下滚动触发 DOM 懒加载
        for i in range(10):
            await page.evaluate("window.scrollBy(0, 1500)")
            await asyncio.sleep(1)
            
        # 等待文本节点加载
        await page.wait_for_selector(".render-unit-outer, .docx-viewer, .suite-wiki-page", timeout=10000)
        
        # 获取飞书文档核心容器内部的所有文本
        content = await page.evaluate('''() => {
            const container = document.querySelector('.suite-wiki-page') || document.querySelector('.docx-viewer') || document.body;
            return container.innerText;
        }''')
        
        print(f"🎉 成功抓取全量飞书万字干货字符数: {len(content)}")
        
        with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_content_full.txt", "w", encoding="utf-8") as f:
            f.write(content)
            
        await browser.close()

asyncio.run(main())
