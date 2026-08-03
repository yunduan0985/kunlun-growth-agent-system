import re

file_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/02-爆款SOP与获客/AI朋友圈与私域运营11个月变现37万SOP.md"

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_doc_5_raw.txt", "r", encoding="utf-8") as f:
    raw_text = f.read()

lines = raw_text.splitlines()

clean_lines = [
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

for l in lines:
    l_s = l.strip()
    if not l_s:
        continue
    # 只提取包含真实中文/英文内容的段落
    if re.search(r'[\u4e00-\u9fa5]', l_s):
        # 清理开头的系统标记
        l_clean = re.sub(r'^(heading\d+|bullet|ordered|quote_container|synced_source|view|grid_column|page|grid|text|image)\s+\d{10,}\s+(author\s+)?(bold\s+true\s+)?', '', l_s)
        l_clean = re.sub(r'\*0\+.*$', '', l_clean)
        l_clean = re.sub(r'doxcn[a-zA-Z0-9]+', '', l_clean)
        l_clean = l_clean.strip()
        
        if l_clean and not l_clean.startswith("author") and not l_clean.startswith("editors") and len(l_clean) > 2:
            if l_clean not in clean_lines:
                clean_lines.append(l_clean)
                clean_lines.append("")

doc = "\n".join(clean_lines)
doc = re.sub(r'\n{3,}', '\n\n', doc)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(doc)

print(f"🎉 成功生成极精纯 Obsidian Markdown 资产! 字符数: {len(doc)}")

