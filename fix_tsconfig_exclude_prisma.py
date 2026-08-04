import json

path = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/tsconfig.json"

with open(path, "r", encoding="utf-8") as f:
    tsconfig = json.load(f)

# 排除 prisma seed 文件与子模块
tsconfig["exclude"] = [
    "node_modules",
    "prisma",
    "engine/hku_deeptutor/web"
]

with open(path, "w", encoding="utf-8") as f:
    json.dump(tsconfig, f, indent=2)

print("🎉 成功添加 prisma 到 tsconfig.json exclude 列表中！")

