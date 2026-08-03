import json
import re

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

# 寻找 clientVars 或 SERVER_DATA 中的 blocks / elements
server_data_str = raw_data.get('SERVER_DATA', '{}')
try:
    server_data = json.loads(server_data_str)
except:
    server_data = {}

# 深入提取飞书 Blocks 内容
blocks = []

def extract_text_from_node(node):
    if isinstance(node, dict):
        # 飞书文本节点通常包含 text 或 content 或 elements
        if 'text' in node and isinstance(node['text'], str):
            t = node['text'].strip()
            if t and not t.startswith('http') and len(t) > 1:
                blocks.append(t)
        if 'content' in node and isinstance(node['content'], str):
            t = node['content'].strip()
            if t and len(t) > 1:
                blocks.append(t)
        for k, v in node.items():
            extract_text_from_node(v)
    elif isinstance(node, list):
        for item in node:
            extract_text_from_node(item)

extract_text_from_node(server_data)

# 清理重复项
clean_blocks = []
for b in blocks:
    if b not in clean_blocks and not b.startswith('{"') and len(b) > 1:
        clean_blocks.append(b)

result_text = "\n\n".join(clean_blocks)
print(f"🎉 成功清洗出正文段落数: {len(clean_blocks)}, 总字符数: {len(result_text)}")

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_clean_article.txt", "w", encoding="utf-8") as f:
    f.write(result_text)

