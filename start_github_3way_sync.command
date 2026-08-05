#!/bin/bash
echo "============================================================"
echo "  🚀 昆仑增长 - GitHub 3大账号 (daseanle/yunduan0985/shaunlee0561) 镜像全量复刻中台"
echo "  💡 提示: 运行本工具将自动把全量代码同步推送到大帅旗下的 3 大 GitHub 账号中！"
echo "============================================================"
echo ""

cd "/Volumes/MOVESPEED/下载/AIcode/Agent"

python3 /Volumes/MOVESPEED/下载/AIcode/Agent/scratch/github_tri_account_sync.py

echo ""
read -p "✅ 3端全量镜像复刻同步完结！按任意键退出..." -n1 -s
