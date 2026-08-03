import json
import re

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

data_obj = json.loads(raw_data['DATA'])
c_data = data_obj.get('clientVars', {}).get('data', {})

if isinstance(c_data, str):
    try:
        c_data = json.loads(c_data)
    except:
        pass

print(f"📌 c_data type: {type(c_data)}, top keys: {list(c_data.keys()) if isinstance(c_data, dict) else 'Not Dict'}")

# 全量递归检索 Chinese/English 长句
strings = []
def search_strings(node):
    if isinstance(node, str):
        if len(node) > 5 and not node.startswith('http') and not node.startswith('{'):
            strings.append(node)
    elif isinstance(node, dict):
        for k, v in node.items():
            search_strings(v)
    elif isinstance(node, list):
        for item in node:
            search_strings(item)

search_strings(c_data)

print(f"🎉 从 c_data 全量搜索到 {len(strings)} 条长文本！")

clean_content = []
for s in strings:
    s_clean = s.strip()
    if s_clean and s_clean not in clean_content:
        clean_content.append(s_clean)

final_out = "\n\n".join(clean_content)
print(f"✨ 最终万字教程提取总字符数: {len(final_out)}")

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_youtube_tutorial_full.txt", "w", encoding="utf-8") as f:
    f.write(final_out)

