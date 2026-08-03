import json
import re

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    
print("📌 正在解析 window 数据对象...")

extracted_texts = []

for key in ['SERVER_DATA', 'DATA', '__SSR_DOC_INFO__', 'SERVER_RUNTIME_DATA']:
    if key in data:
        print(f"🔍 正在深度递归解析键: {key}")
        raw_val = data[key]
        try:
            val_obj = json.loads(raw_val) if isinstance(raw_val, str) else raw_val
            
            # 正则匹配所有 Chinese / English 文本块
            text_str = json.dumps(val_obj, ensure_ascii=False)
            
            # 匹配连续的中文和英文段落
            matches = re.findall(r'"text":\s*"([^"]+)"', text_str)
            if matches:
                print(f"🎉 从 {key} 中匹配到 {len(matches)} 条核心文本/提示词！")
                extracted_texts.extend(matches)
            else:
                # 尝试通用字符串提纯
                strings = re.findall(r'[\u4e00-\u9fa5a-zA-Z0-9\s，。！？、（）《》：；“”‘’—–-]{6,}', text_str)
                print(f"🎉 从 {key} 提取到 {len(strings)} 条长文本！")
                extracted_texts.extend(strings)
        except Exception as e:
            print(f"解析 {key} 报错: {e}")

# 去重并格式化
clean_lines = []
for t in extracted_texts:
    t_clean = t.strip()
    if t_clean and t_clean not in clean_lines and len(t_clean) > 2:
        clean_lines.append(t_clean)
        
final_doc = "\n\n".join(clean_lines)
print(f"✨ 最终提纯出的飞书万字干货总字符数: {len(final_doc)}")

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_parsed_course.txt", "w", encoding="utf-8") as f:
    f.write(final_doc)

