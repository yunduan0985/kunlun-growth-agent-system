import re

file_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/02-爆款SOP与获客/从YouTube转向抖音独家伙伴计划4个月月入10W全流程SOP.md"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

lines = text.splitlines()
clean_lines = []

for line in lines:
    l = line.strip()
    if not l:
        continue
    # 清理行首的系统标记
    l = re.sub(r'^(heading\d+|bullet|ordered|quote_container|synced_source|view|grid_column)\s+\d{10,}\s+(author\s+)?(bold\s+true\s+)?', '', l)
    l = re.sub(r'\*0\+.*$', '', l)
    l = re.sub(r'doxcn[a-zA-Z0-9]+', '', l)
    l = l.strip()
    
    if l and not l.startswith("author") and not l.startswith("quote_container") and len(l) > 1:
        clean_lines.append(l)
        clean_lines.append("")

clean_md = "\n".join(clean_lines)
clean_md = re.sub(r'\n{3,}', '\n\n', clean_md)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(clean_md)

print(f"🎉 已成功精纯格式化 Markdown! 字符数: {len(clean_md)}")
