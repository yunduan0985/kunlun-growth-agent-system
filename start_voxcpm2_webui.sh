#!/bin/bash
echo "============================================================"
echo "  🚀 昆仑增长 - VoxCPM 2 48kHz 语音大模型 WebUI 启动器"
echo "  ⚡ 驱动支持: Apple M4 Metal MPS 加速"
echo "============================================================"

VENV_PATH="/Volumes/MOVESPEED/下载/AIcode/Agent/.venv_voxcpm/bin/activate"

if [ -f "$VENV_PATH" ]; then
    source "$VENV_PATH"
fi

python3 /Volumes/MOVESPEED/下载/AIcode/Agent/voxcpm2_webui.py
