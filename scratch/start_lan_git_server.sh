#!/bin/zsh
# 在 Mac 上启动局域网 Git 共享服务器
IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
PORT=8000
echo "=== 🚀 局域网 Git 共享服务启动中... ==="
echo "Mac 局域网 IP: $IP"
echo "在 Windows PowerShell 中只需运行："
echo "git clone http://${IP}:${PORT}/kunlun-growth-agent-system.git"
echo "=========================================="
cd /Volumes/MOVESPEED/Backup
python3 -m http.server $PORT
