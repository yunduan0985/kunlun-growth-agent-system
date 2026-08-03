import subprocess
import os

def purge_gitlinks():
    print("🧹 正在彻底扫描并清除全库 Git 索引中的 160000 gitlink 子模块卡顿节点...")
    result = subprocess.run(["git", "ls-files", "-s"], capture_output=True, text=True, cwd="/Volumes/MOVESPEED/下载/AIcode/Agent")
    lines = result.stdout.splitlines()
    
    submodule_paths = []
    for line in lines:
        if line.startswith("160000"):
            parts = line.split("\t")
            if len(parts) > 1:
                submodule_paths.append(parts[1])
                
    print(f"🗑️ 发现的 gitlink 节点: {submodule_paths}")
    
    for path in submodule_paths:
        print(f"正在强力清除 Git 索引: {path}")
        subprocess.run(["git", "rm", "--cached", "-f", path], cwd="/Volumes/MOVESPEED/下载/AIcode/Agent")
        
    # 同时删除根目录的 .gitmodules，彻底让它成为一个干净的单体仓库 (Monorepo)
    gitmodules_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/.gitmodules"
    if os.path.exists(gitmodules_path):
        os.remove(gitmodules_path)
        subprocess.run(["git", "rm", "--cached", "-f", ".gitmodules"], cwd="/Volumes/MOVESPEED/下载/AIcode/Agent")
        print("✅ 已彻底移除 .gitmodules 文件及索引！")

purge_gitlinks()
