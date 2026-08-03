import json
import re

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

data_obj = json.loads(raw_data['DATA'])
client_vars = data_obj.get('clientVars', {})

print(f"📌 clientVars top keys: {list(client_vars.keys())}")

# 提取 apool 字符池与 initialAttributedTexts / blocks
lines = []

# 方法 1：提取 apool (文本池)
if 'apool' in client_vars:
    numToAttrib = client_vars['apool'].get('numToAttrib', {})
    for k, v in numToAttrib.items():
        if isinstance(v, list) and len(v) > 1:
            val = str(v[1])
            if len(val) > 2 and not val.startswith('http'):
                lines.append(val)

# 方法 2：提取 initialAttributedTexts 中的文本
if 'initialAttributedTexts' in client_vars:
    text_obj = client_vars['initialAttributedTexts']
    text_json = json.dumps(text_obj, ensure_ascii=False)
    # 抽取所有中文字符串和英文 Prompt 段落
    chunks = re.findall(r'[\u4e00-\u9fa5a-zA-Z0-9\s，。！？、（）《》：；“”‘’—–-]{4,}', text_json)
    for c in chunks:
        c_clean = c.strip()
        if c_clean and c_clean not in lines and len(c_clean) > 3:
            lines.append(c_clean)

# 方法 3：通用深度递归提取
def deep_extract(obj):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ['text', 'c', 'title', 'caption', 'code', 'prompt']:
                if isinstance(v, str) and len(v.strip()) > 2:
                    lines.append(v.strip())
            deep_extract(v)
    elif isinstance(obj, list):
        for item in obj:
            deep_extract(item)

deep_extract(client_vars)

# 整理清洗
unique_lines = []
for l in lines:
    if l not in unique_lines and not l.startswith('{') and not l.startswith('http'):
        unique_lines.append(l)

final_text = "\n\n".join(unique_lines)
print(f"🎉 成功提取出万字教程正文段落数: {len(unique_lines)}, 总字符数: {len(final_text)}")

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_final_tutorial.txt", "w", encoding="utf-8") as f:
    f.write(final_text)

