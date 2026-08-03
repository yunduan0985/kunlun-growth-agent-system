import asyncio
from playwright.async_api import async_playwright
import json
from bs4 import BeautifulSoup
import re

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        
        url = "https://scys.com/articleDetail/xq_topic/14422584218488442"
        print(f"🌐 正在访问生财有术文章: {url}")
        await page.goto(url, wait_until="networkidle", timeout=60000)
        await asyncio.sleep(4)
        
        title = await page.title()
        print(f"📌 页面 Title: {title}")
        
        # 提取页面全量 innerText
        inner_text = await page.evaluate("() => document.body.innerText")
        print(f"📄 提取到的全页文本长度: {len(inner_text)}")
        
        # 提取页面源码 HTML
        html = await page.content()
        
        with open("/Volumes/MOVESPEED/下载/AIcode/Agent/scys_article_raw.txt", "w", encoding="utf-8") as f:
            f.write(f"Title: {title}\nURL: {url}\n\n" + inner_text)
            
        await browser.close()

asyncio.run(main())
