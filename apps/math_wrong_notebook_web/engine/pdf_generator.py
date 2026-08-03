#!/usr/bin/env python3
"""
pdf_generator.py
基于 Playwright 的高精度试卷 PDF 导出引擎。
支持防作弊水印、多页智能分页与高质量渲染。
"""

import asyncio
import os
import sys
from playwright.async_api import async_playwright

async def generate_pdf(html_content: str, output_path: str):
    """
    使用 Playwright 将 HTML 渲染为 PDF
    """
    print(f"[*] 开始生成 PDF: {output_path}")
    async with async_playwright() as p:
        # 使用 chromium 无头模式
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        # 加载 HTML 内容
        await page.set_content(html_content, wait_until="networkidle")
        
        # 注入防作弊水印样式
        watermark_css = """
        body::after {
            content: 'AI Math Wrong Notebook - Confidential';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 60px;
            color: rgba(200, 200, 200, 0.2);
            z-index: 9999;
            pointer-events: none;
        }
        """
        await page.add_style_tag(content=watermark_css)
        
        # 导出 PDF，强制 A4，保留背景色
        await page.pdf(
            path=output_path,
            format="A4",
            print_background=True,
            margin={"top": "20mm", "bottom": "20mm", "left": "15mm", "right": "15mm"}
        )
        
        await browser.close()
    print(f"[+] PDF 导出成功: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python pdf_generator.py <input.html> <output.pdf>")
        sys.exit(1)
        
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    if not os.path.exists(input_file):
        print(f"[!] Input file not found: {input_file}")
        sys.exit(1)
        
    with open(input_file, "r", encoding="utf-8") as f:
        html_data = f.read()
        
    asyncio.run(generate_pdf(html_data, output_file))
