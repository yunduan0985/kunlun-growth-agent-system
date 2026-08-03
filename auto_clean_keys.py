import os
import re

target_dir = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/engine/hku_deep_research"

pattern = re.compile(r'sk-[a-zA-Z0-9]{32,}')

count = 0
for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith(('.py', '.json', '.env', '.txt', '.js', '.ts', '.md', '.sh')):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                if pattern.search(content):
                    new_content = pattern.sub('sk-placeholder-desensitized', content)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"✅ 已脱敏硬编码密钥: {filepath}")
                    count += 1
            except Exception as e:
                pass

print(f"🎉 共计脱敏 {count} 处代码硬编码密钥！")
