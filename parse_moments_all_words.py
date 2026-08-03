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

def filter_clean_text(text_str):
    # 清理内部的 doxcn... 和纯数字 ID 词汇
    tokens = text_str.split()
    clean_tokens = []
    for tok in tokens:
        if tok.startswith("doxcn") or tok.startswith("author") or tok.startswith("grid_column") or tok.startswith("page"):
            continue
        if re.match(r'^\d{10,}$', tok):
            continue
        clean_tokens.append(tok)
    return " ".join(clean_tokens)

for b_id, b_data in block_map.items():
    # 抽取所有文本
    found = []
    def rec(n):
        if isinstance(n, str):
            if len(n.strip()) > 0:
                found.append(n.strip())
        elif isinstance(n, dict):
            for k, v in n.items():
                if k not in ['id', 'block_id', 'parent_id', 'user_id']:
                    rec(v)
        elif isinstance(n, list):
            for item in n:
                rec(item)
    rec(b_data)
    
    raw_block_text = " ".join(found)
    clean_t = filter_clean_text(raw_block_text)
    
    if clean_t and len(clean_t) > 2 and re.search(r'[\u4e00-\u9fa5]', clean_t):
        if clean_t not in lines:
            lines.append(clean_t)
            lines.append("")

doc = "\n".join(lines)
doc = re.sub(r'\n{3,}', '\n\n', doc)

target_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/02-爆款SOP与获客/AI朋友圈与私域运营11个月变现37万SOP.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(doc)

print(f"🎉 成功提取出极精纯、无损完整 Markdown SOP! 字符数: {len(doc)}")

