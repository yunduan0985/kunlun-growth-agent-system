import os
import shutil

auth_dir = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/src/app/api/auth"
backup_dir = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/src/app/api/_auth_bak"

if os.path.exists(auth_dir):
    shutil.move(auth_dir, backup_dir)
    print("🎉 临时备份 auth 动态路由")

