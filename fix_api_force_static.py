import os
import glob

api_dir = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/src/app/api"

for route_file in glob.glob(f"{api_dir}/**/route.ts", recursive=True):
    with open(route_file, "r", encoding="utf-8") as f:
        content = f.read()
    if "export const dynamic" not in content:
        content = "export const dynamic = 'force-static';\n" + content
        with open(route_file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"🎉 为 {route_file} 注入 export const dynamic = 'force-static'")

