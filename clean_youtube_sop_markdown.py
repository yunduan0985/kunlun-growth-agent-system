import re

file_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/02-爆款SOP与获客/YouTube财经人生故事赛道全自动化工作流与提示词SOP.md"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# 移除形如 page 71925621185... 或 text 71925621185... 的纯系统杂质行
lines = text.splitlines()
clean_lines = []

for line in lines:
    line_s = line.strip()
    if re.match(r'^(text|page|view|grid_column|image|file)\s+\d{10,}', line_s):
        continue
    if line_s.startswith("doxcn") or "author inline-component" in line_s:
        continue
    clean_lines.append(line)

clean_md = "\n".join(clean_lines)

# 清理连续空行
clean_md = re.sub(r'\n{3,}', '\n\n', clean_md)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(clean_md)

print("🎉 已成功精纯清洗 Markdown 格式！")
