import json

path = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/tsconfig.json"

with open(path, "r", encoding="utf-8") as f:
    tsconfig = json.load(f)

tsconfig["compilerOptions"]["paths"] = {
    "@/*": ["./src/*"]
}

# 排除子模块与独立测试目录
tsconfig["exclude"] = [
    "node_modules",
    "engine/hku_deeptutor/web"
]

with open(path, "w", encoding="utf-8") as f:
    json.dump(tsconfig, f, indent=2)

print("🎉 已成功修缮 tsconfig.json exclude 规则！")

