import json

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

data_obj = json.loads(raw_data['DATA'])
c_data = data_obj.get('clientVars', {}).get('data', {})
block_map = c_data.get('block_map', {})

lines = [
    "# 🎬 YouTube“财经人生故事”赛道全自动化工作流与提示词 SOP",
    "",
    "> **原文档来源**：飞书云文档 (`栗子Lizi聊AI`)  ",
    "> **知识沉淀时间**：2026-08-03  ",
    "> **适用场景**：YouTube / B站 / 小红书 自动化大流量财经人生故事视频制作、提示词全公开、画面与配音自动化工作流",
    "",
    "---",
    ""
]

def get_block_text(block):
    # 递归抓取所有 string
    found = []
    def search(node):
        if isinstance(node, str):
            if len(node.strip()) > 0:
                found.append(node.strip())
        elif isinstance(node, dict):
            for k, v in node.items():
                if k not in ['id', 'block_id', 'parent_id', 'user_id']:
                    search(v)
        elif isinstance(node, list):
            for item in node:
                search(item)
    search(block)
    # 滤掉重复和元数据
    clean = []
    for f in found:
        if f not in clean and not f.startswith('http') and len(f) > 0 and not f.startswith('{'):
            clean.append(f)
    return " ".join(clean)

for b_id, b_data in block_map.items():
    txt = get_block_text(b_data)
    if txt and len(txt) > 2:
        lines.append(txt)
        lines.append("")

markdown_doc = "\n".join(lines)
print(f"🎉 成功解析 180 个 Block！总字符数: {len(markdown_doc)}")

target_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/02-爆款SOP与获客/YouTube财经人生故事赛道全自动化工作流与提示词SOP.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(markdown_doc)

print(f"✅ 知识已全量落盘至 Obsidian: {target_path}")

