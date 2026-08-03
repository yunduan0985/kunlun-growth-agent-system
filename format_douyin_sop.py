import re

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_doc_3_raw.txt", "r", encoding="utf-8") as f:
    text = f.read()

lines = text.splitlines()

clean_lines = [
    "# 🚀 从 YouTube 创作转向抖音独家伙伴计划：四个月稳定月入 10W 全流程 SOP",
    "",
    "> **原文档来源**：飞书云文档 (`生财大课实操专栏`)  ",
    "> **文档链接**：`https://my.feishu.cn/docx/PmK6dneg0oSKA1xPcwQc1ZVgn1g`  ",
    "> **知识沉淀时间**：2026-08-03  ",
    "> **核心摘要**：拆解抖音伙伴计划收益计算公式（5秒有效观看 + 推荐页流量）、赛道避坑法则、英文睡眠故事/生活剧玩法以及从 0 到 1 稳定月入 10W 破局心法。",
    "",
    "---",
    ""
]

for l in lines:
    l_s = l.strip()
    if not l_s:
        continue
    # 清除纯系统 ID 行
    if re.match(r'^(page|text|grid|image|file|quote|callout|heading|author|synced|view)\s+\d{10,}', l_s):
        chinese_match = re.search(r'[\u4e00-\u9fa5].*$', l_s)
        if chinese_match:
            sentence = chinese_match.group(0)
            sentence = re.sub(r'\s+(author|left|right|bold|true|\*0\+.*)$', '', sentence).strip()
            if len(sentence) > 1 and sentence not in clean_lines:
                clean_lines.append(sentence)
                clean_lines.append("")
    elif re.search(r'[\u4e00-\u9fa5a-zA-Z0-9]', l_s):
        if l_s not in clean_lines and not l_s.startswith("doxcn"):
            clean_lines.append(l_s)
            clean_lines.append("")

doc = "\n".join(clean_lines)
doc = re.sub(r'\n{3,}', '\n\n', doc)

target_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/02-爆款SOP与获客/从YouTube转向抖音独家伙伴计划4个月月入10W全流程SOP.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(doc)

print(f"🎉 成功生成极精纯 Obsidian Markdown 资产! 字符数: {len(doc)}")

