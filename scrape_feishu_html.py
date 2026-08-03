import asyncio
from playwright.async_api import async_playwright
import re
from bs4 import BeautifulSoup

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        url = "https://gi52wyhtwc.feishu.cn/wiki/Otrhwi9hSi6ekEkoRvrcNSd5nAh"
        print(f"🌐 正在访问飞书链接: {url}")
        await page.goto(url, wait_until="networkidle", timeout=45000)
        
        # 页面下翻滚动 5 次确保万字干货全文渲染
        for i in range(8):
            await page.evaluate("window.scrollBy(0, 2000)")
            await asyncio.sleep(1.5)
            
        full_html = await page.content()
        print(f"📄 提取到 HTML 源码长度: {len(full_html)}")
        
        # 保存 HTML 供备用
        with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_rendered.html", "w", encoding="utf-8") as f:
            f.write(full_html)
            
        soup = BeautifulSoup(full_html, 'html.parser')
        
        # 移除 script, style 等无用标签
        for tag in soup(["script", "style", "svg", "noscript"]):
            tag.decompose()
            
        text = soup.get_text(separator="\n")
        # 清理多余空行
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        clean_doc = "\n".join(lines)
        
        print(f"🎉 成功提纯全量飞书文本，共计 {len(clean_doc)} 字符！")
        
        with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_extracted_text.txt", "w", encoding="utf-8") as f:
            f.write(clean_doc)
            
        await browser.close()

asyncio.run(main())
