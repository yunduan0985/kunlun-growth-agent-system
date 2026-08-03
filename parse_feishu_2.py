import json
import re

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars_2.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

data_obj = json.loads(raw_data['DATA'])
c_data = data_obj.get('clientVars', {}).get('data', {})
block_map = c_data.get('block_map', {})

print(f"📌 搜寻到《❤️缘起》文档 Block 节点数: {len(block_map)}")

blocks_text = []

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
        blocks_text.append(t)

full_doc_text = "\n\n".join(blocks_text)
print(f"🎉 成功提取《❤️缘起》正文字符数: {len(full_doc_text)}")

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_doc_2_raw.txt", "w", encoding="utf-8") as f:
    f.write(full_doc_text)

