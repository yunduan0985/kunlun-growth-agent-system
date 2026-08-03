import re

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_doc_2_raw.txt", "r", encoding="utf-8") as f:
    text = f.read()

lines = text.splitlines()

clean_lines = [
    "# ❤️ 缘起：AI 的胜利，就是知识库的胜利",
    "",
    "> **原文档来源**：飞书云文档 (`生财线下大课 / 石老师`)  ",
    "> **文档链接**：`https://my.feishu.cn/wiki/RKfpwHw2QidxgGk9WgvczekMnIa`  ",
    "> **知识沉淀时间**：2026-08-03  ",
    "> **核心金句**：“AI 的胜利，也就是知识库的胜利；把读取微信聊天记录、各种网页内容自动化转存入知识库，把真正的工作流交到大家手里！”",
    "",
    "---",
    ""
]

for l in lines:
    l_s = l.strip()
    if not l_s:
        continue
    # 忽略纯系统 ID 行
    if re.match(r'^(page|text|grid|image|file|quote|callout|heading|author)\s+\d{10,}', l_s):
        # 尝试提取后面的中文句子
        chinese_match = re.search(r'[\u4e00-\u9fa5].*$', l_s)
        if chinese_match:
            sentence = chinese_match.group(0)
            # 清除尾部的 author / left / right 标记
            sentence = re.sub(r'\s+(author|left|right|bold|true|\*0\+.*)$', '', sentence).strip()
            if len(sentence) > 1 and sentence not in clean_lines:
                clean_lines.append(sentence)
                clean_lines.append("")
    elif re.search(r'[\u4e00-\u9fa5]', l_s):
        if l_s not in clean_lines:
            clean_lines.append(l_s)
            clean_lines.append("")

doc = "\n".join(clean_lines)

target_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/00-主主控总纲/生财大课石老师-AI的胜利就是知识库的胜利_缘起SOP.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(doc)

print(f"🎉 成功生成极精纯 Markdown 资产! 字符数: {len(doc)}")

