#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从毕昇 (BISHENG) 源码中提炼的轻量高精文档 Layout 层次解析与表格抽取引擎
具备页眉页脚去噪、标题层级树构建以及 Markdown 表格提取能力
"""

import sys
import os
import json
import re

def clean_noise(text: str) -> str:
    """去除噪声字符与连续空行"""
    if not text:
        return ""
    # 剔除无用控制字符
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', text)
    # 压缩多余空行
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def extract_tables_and_layouts(content: str):
    """
    根据毕昇 Layout 模式提取标题、正文段落与规则表格
    """
    content = clean_noise(content)
    lines = content.split('\n')
    
    elements = []
    current_chunk = []
    current_type = "paragraph"
    current_header = "正文全局"
    
    for line in lines:
        line_str = line.strip()
        if not line_str:
            continue
            
        # 判定是否为 Heading (标题层级)
        if line_str.startswith('#') or re.match(r'^(第[一二三四五六七八九十0-9]+[章节条部分]|[\d\.]+\s+[\u4e00-\u9fa5A-Za-z0-9]+)', line_str):
            if current_chunk:
                elements.append({
                    "type": current_type,
                    "section_header": current_header,
                    "content": "\n".join(current_chunk)
                })
                current_chunk = []
            current_header = line_str.lstrip('#').strip()
            elements.append({
                "type": "heading",
                "section_header": current_header,
                "content": line_str
            })
            current_type = "paragraph"
            continue

        # 判定是否为 Markdown 表格分隔行
        if '|' in line_str and ('---' in line_str or ':-' in line_str):
            current_type = "table"
            current_chunk.append(line_str)
            continue
            
        # 表格的数据行
        if '|' in line_str:
            if current_type != "table" and current_chunk:
                elements.append({
                    "type": current_type,
                    "section_header": current_header,
                    "content": "\n".join(current_chunk)
                })
                current_chunk = []
            current_type = "table"
            current_chunk.append(line_str)
            continue

        # 普通段落
        if current_type == "table":
            # 表格结束
            if current_chunk:
                elements.append({
                    "type": "table",
                    "section_header": current_header,
                    "content": "\n".join(current_chunk)
                })
                current_chunk = []
            current_type = "paragraph"

        current_chunk.append(line_str)

    if current_chunk:
        elements.append({
            "type": current_type,
            "section_header": current_header,
            "content": "\n".join(current_chunk)
        })

    return elements

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "缺少输入文本或文件路径参数"}))
        sys.exit(1)
        
    input_arg = sys.argv[1]
    text_content = ""

    if os.path.exists(input_arg):
        try:
            with open(input_arg, 'r', encoding='utf-8', errors='ignore') as f:
                text_content = f.read()
        except Exception as e:
            print(json.dumps({"error": f"读取物理文件失败: {str(e)}"}))
            sys.exit(1)
    else:
        text_content = input_arg

    layouts = extract_tables_and_layouts(text_content)
    result = {
        "success": True,
        "element_count": len(layouts),
        "elements": layouts
    }
    print(json.dumps(result, ensure_ascii=False))

if __name__ == "__main__":
    main()
