import asyncio
from playwright.async_api import async_playwright
import json
import re

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        url = "https://gi52wyhtwc.feishu.cn/wiki/Otrhwi9hSi6ekEkoRvrcNSd5nAh"
        print(f"🌐 访问页面: {url}")
        await page.goto(url, wait_until="networkidle", timeout=60000)
        
        # 提取飞书页面内部所有挂载在 window 上的数据对象
        js_data = await page.evaluate('''() => {
            const result = {};
            for (let key in window) {
                if (key.includes('DATA') || key.includes('STATE') || key.includes('DOC') || key.includes('WIKI') || key.includes('vars') || key.includes('client')) {
                    try {
                        result[key] = JSON.stringify(window[key]);
                    } catch(e) {}
                }
            }
            return result;
        }''')
        
        print(f"📌 搜集到的 window 数据键名: {list(js_data.keys())}")
        
        # 保存到文本文件
        with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars.json", "w", encoding="utf-8") as f:
            json.dump(js_data, f, ensure_ascii=False, indent=2)
            
        # 同时抓取整页所有节点的 textContent（包括隐藏节点）
        all_text = await page.evaluate('''() => {
            function getTexts(node) {
                let str = "";
                if (node.nodeType === Node.TEXT_NODE) {
                    str += node.textContent + "\n";
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // 穿透 Shadow DOM
                    if (node.shadowRoot) {
                        for (let child of node.shadowRoot.childNodes) {
                            str += getTexts(child);
                        }
                    }
                    for (let child of node.childNodes) {
                        str += getTexts(child);
                    }
                }
                return str;
            }
            return getTexts(document.body);
        }''')
        
        print(f"🎉 穿透 Shadow DOM 抓取到字符数: {len(all_text)}")
        with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_shadow_text.txt", "w", encoding="utf-8") as f:
            f.write(all_text)
            
        await browser.close()

asyncio.run(main())
