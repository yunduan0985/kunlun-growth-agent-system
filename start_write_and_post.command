#!/bin/bash
echo "============================================================"
echo "  🚀 昆仑增长 - 飞书 Agent 【写了就发】双击一键分发器"
echo "  💡 提示: 在下方输入任意草稿文本，按下回车即可全网分发！"
echo "============================================================"
echo ""

cd "/Volumes/MOVESPEED/下载/AIcode/Agent"

read -p "✍️ 请输入您想发送的草稿内容 (回车确定): " USER_TEXT

if [ -z "$USER_TEXT" ]; then
    USER_TEXT="今天在 EFC 接待了 3 位聊 AI 数字大脑落地的朋友！"
fi

echo ""
echo "⚡ 正在调度飞书 Agent 进行去 AI 味改写并发送群卡片..."

python3 /Volumes/MOVESPEED/下载/AIcode/Agent/scratch/feishu_write_and_post_agent.py "$USER_TEXT"

echo ""
read -p "✅ 分发完成！按任意键退出..." -n1 -s
