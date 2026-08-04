import json

path = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/tsconfig.json"

with open(path, "r", encoding="utf-8") as f:
    tsconfig = json.load(f)

# 更新 paths 配置支持多别名映射
tsconfig["compilerOptions"]["paths"] = {
    "@/*": ["./src/*", "./engine/hku_deeptutor/web/*"]
}

with open(path, "w", encoding="utf-8") as f:
    json.dump(tsconfig, f, indent=2)

print("🎉 已成功修缮 tsconfig.json 别名配置！")

