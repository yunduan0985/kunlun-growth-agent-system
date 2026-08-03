import json
import re

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

data_obj = json.loads(raw_data['DATA'])
c_data = data_obj.get('clientVars', {}).get('data', {})

block_map = c_data.get('block_map', {})

print(f"📌 共找到 {len(block_map)} 个飞书 Blocks 节点！")

# 按照飞书 Block 结构解析 Markdown
markdown_lines = [
    "# 🎬 YouTube“财经人生故事”赛道全自动化工作流与提示词 SOP\n",
    "> **原文档来源**：飞书云文档 (`栗子Lizi聊AI`)  ",
    "> **知识沉淀时间**：2026-08-03  ",
    "> **适用场景**：YouTube/B站/小红书 自动化大流量财经故事视频制作、提示词全公开、画面与配音自动化工作流\n",
    "---",
    "\n"
]

def extract_text_from_elements(elements):
    text_parts = []
    if isinstance(elements, list):
        for el in elements:
            if isinstance(el, dict):
                # 文本元素
                text_run = el.get('text_run', {})
                if 'content' in text_run:
                    text_parts.append(text_run['content'])
                # 代码元素
                code_run = el.get('code_run', {})
                if 'content' in code_run:
                    text_parts.append(code_run['content'])
    return "".join(text_parts)

for block_id, block in block_map.items():
    block_type = block.get('type', 0)
    data = block.get('data', {})
    
    # 标题或文本
    elements = data.get('elements', [])
    txt = extract_text_from_elements(elements)
    
    if not txt and 'title' in data:
        txt = extract_text_from_elements(data.get('title', {}).get('elements', []))
        
    if not txt:
        continue
        
    # 判断 Block 类型转 Markdown 语法
    # 1: Page/Heading1, 2: Heading2, 3: Heading3, 4: Paragraph, 14: CodeBlock, 19: Callout
    if block_type == 1:
        markdown_lines.append(f"## {txt}\n")
    elif block_type == 2:
        markdown_lines.append(f"### {txt}\n")
    elif block_type == 3:
        markdown_lines.append(f"#### {txt}\n")
    elif block_type == 14: # Code block (Prompt 提示词)
        markdown_lines.append(f"```prompt\n{txt}\n```\n")
    elif block_type == 19: # Callout
        markdown_lines.append(f"> 💡 **关键提示**：{txt}\n")
    else:
        markdown_lines.append(f"{txt}\n")

full_md = "\n".join(markdown_lines)
print(f"🎉 成功转换为精美 Markdown！总长度: {len(full_md)} 字符！")

target_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/obsidian_courses_vault/02-爆款SOP与获客/YouTube财经人生故事赛道全自动化工作流与提示词SOP.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(full_md)

print(f"✅ 知识已沉淀至 Obsidian: {target_path}")

