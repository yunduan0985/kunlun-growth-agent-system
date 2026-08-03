#!/bin/bash
echo "============================================================"
echo "  🚀 面壁智能 (OpenBMB) 官方原版 VoxCPM WebUI 启动器"
echo "  📦 源码仓库: OpenBMB/VoxCPM (原汁原味 100% 官方原版)"
echo "============================================================"

export HF_ENDPOINT="https://hf-mirror.com"
cd "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/VoxCPM"

VENV_PATH="/Volumes/MOVESPEED/下载/AIcode/Agent/.venv_voxcpm/bin/activate"
if [ -f "$VENV_PATH" ]; then
    source "$VENV_PATH"
fi

python3 app.py
