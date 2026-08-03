import re

file_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/02-爆款SOP与获客/AI朋友圈与私域运营11个月变现37万SOP.md"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

lines = text.splitlines()
clean_lines = []

for l in lines:
    l_s = l.strip()
    if not l_s:
        continue
    if l_s.startswith("#") or l_s.startswith(">") or l_s.startswith("---"):
        clean_lines.append(l_s)
        clean_lines.append("")
        continue
        
    # 清除各种格式化标记
    l_clean = re.sub(r'^(text|heading\d+|bullet|ordered|quote_container|synced_source|view|grid_column|page|grid)\s+', '', l_s)
    l_clean = re.sub(r'\*0\+[a-zA-Z0-9+\*]*', '', l_clean)
    l_clean = re.sub(r'\*1\+[a-zA-Z0-9+\*]*', '', l_clean)
    l_clean = re.sub(r'abbreviation-data\s+\{.*?\}', '', l_clean)
    l_clean = re.sub(r'doxcn[a-zA-Z0-9]+', '', l_clean)
    l_clean = l_clean.strip()
    
    if l_clean and len(l_clean) > 2 and not re.match(r'^\d{10,}$', l_clean):
        clean_lines.append(l_clean)
        clean_lines.append("")

doc = "\n".join(clean_lines)
doc = re.sub(r'\n{3,}', '\n\n', doc)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(doc)

print(f"🎉 已完美完成最终精纯排版! 字符数: {len(doc)}")
