import os
import shutil

auth_dir = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/src/app/api/auth"
backup_dir = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/src/app/api/_auth_bak"

if os.path.exists(backup_dir):
    shutil.move(backup_dir, auth_dir)
    print("🎉 已恢复 auth 动态路由")

