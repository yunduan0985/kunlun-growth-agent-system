import subprocess
import os

def fix_all_submodules():
    print("🔍 正在扫描全库所有 160000 子模块节点...")
    result = subprocess.run(["git", "ls-files", "-s"], capture_output=True, text=True, cwd="/Volumes/MOVESPEED/下载/AIcode/Agent")
    lines = result.stdout.splitlines()
    
    submodule_paths = []
    for line in lines:
        if line.startswith("160000"):
            parts = line.split("\t")
            if len(parts) > 1:
                submodule_paths.append(parts[1])
                
    print(f"📌 扫描到的所有子模块节点: {submodule_paths}")
    
    # 构建完美的 .gitmodules 内容
    gitmodules_content = ""
    for path in submodule_paths:
        gitmodules_content += f'[submodule "{path}"]\n\tpath = {path}\n\turl = https://github.com/yunduan0985/kunlun-growth-agent-system.git\n\n'
        
    with open("/Volumes/MOVESPEED/下载/AIcode/Agent/.gitmodules", "w", encoding="utf-8") as f:
        f.write(gitmodules_content)
        
    print("✅ .gitmodules 已补全全量子模块 url 映射！")

fix_all_submodules()
