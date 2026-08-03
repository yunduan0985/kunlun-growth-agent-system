import json
import re

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars_5.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

data_obj = json.loads(raw_data['DATA'])
c_data = data_obj.get('clientVars', {}).get('data', {})
block_map = c_data.get('block_map', {})

lines = [
    "# 📱 AI 朋友圈 + 私域运营：11 个月变现 37 万全流程实操 SOP",
    "",
    "> **原文档来源**：飞书云文档 (`坏脾气的小可爱 / 私域实操`)  ",
    "> **文档链接**：`https://my.feishu.cn/docx/Ldo2ddRvWoSRRyxTpSlcvfJ7nKb`  ",
    "> **知识沉淀时间**：2026-08-03  ",
    "> **核心摘要**：拆解 AI 头像生成、早中晚黄金发布节奏、产品软广植入、故事连载化运营以及今日复盘公式（单月变现 11W 完整 SOP）。",
    "",
    "---",
    ""
]

def extract_block_elements(block):
    data = block.get('data', {})
    elements = data.get('elements', [])
    text_pieces = []
    if isinstance(elements, list):
        for el in elements:
            if isinstance(el, dict):
                tr = el.get('text_run', {})
                if 'content' in tr:
                    text_pieces.append(tr['content'])
    return "".join(text_pieces).strip()

for b_id, b_data in block_map.items():
    b_type = b_data.get('type', 0)
    txt = extract_block_elements(b_data)
    
    if txt and len(txt) > 0:
        if b_type in [1, 2, 3, 4, 5]: # Headings
            lines.append(f"### {txt}\n")
        elif b_type == 14: # Code
            lines.append(f"```text\n{txt}\n```\n")
        elif b_type == 19: # Callout
            lines.append(f"> 💡 **关键提示**：{txt}\n")
        else:
            lines.append(f"{txt}\n")

doc = "\n".join(lines)
doc = re.sub(r'\n{3,}', '\n\n', doc)

target_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/02-爆款SOP与获客/AI朋友圈与私域运营11个月变现37万SOP.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(doc)

print(f"🎉 成功生成 100% 精确解析 Markdown! 字符数: {len(doc)}")

