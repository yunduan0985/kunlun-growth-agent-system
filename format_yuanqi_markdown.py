import json
import re

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars_2.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

data_obj = json.loads(raw_data['DATA'])
c_data = data_obj.get('clientVars', {}).get('data', {})
block_map = c_data.get('block_map', {})

lines = [
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

def search_text(node):
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
    rec(node)
    clean = []
    for f in found:
        if f not in clean and not f.startswith('http') and not f.startswith('{') and len(f) > 0:
            clean.append(f)
    return " ".join(clean)

for b_id, b_data in block_map.items():
    t = search_text(b_data)
    if t and len(t) > 2:
        # 清理杂质
        if re.match(r'^(page|text|grid|image|view|callout)\s+\d{10,}', t):
            continue
        if t.startswith("doxcn") or "author" in t:
            # 提取纯文本
            t = re.sub(r'^[a-z0-9_]+\s+\d+\s+([a-z0-9_]+(\s+[a-z0-9_]+)*\s+)?(author\s+)?(bold\s+true\s+)?', '', t)
            t = re.sub(r'\*0\+.*$', '', t)
            t = re.sub(r'doxcn[a-zA-Z0-9]+', '', t)
            t = t.strip()
        if len(t) > 2:
            lines.append(f"{t}\n")

clean_md = "\n".join(lines)
clean_md = re.sub(r'\n{3,}', '\n\n', clean_md)

target_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/00-主主控总纲/生财大课石老师-AI的胜利就是知识库的胜利_缘起SOP.md"

with open(target_path, "w", encoding="utf-8") as f:
    f.write(clean_md)

print(f"🎉 成功生成 Obsidian Markdown 资产: {target_path}")

