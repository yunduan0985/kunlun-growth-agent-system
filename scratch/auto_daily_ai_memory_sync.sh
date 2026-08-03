#!/bin/zsh
# 全平台 AI 聊天与记忆每日自动同步脚本
LOG_FILE="/tmp/ai_memory_sync.log"
echo "=== [$(date '+%Y-%m-%d %H:%M:%S')] 启动全平台 AI 聊天记录每日自动同步 ===" >> "$LOG_FILE"
/usr/bin/python3 /Users/dasean/.gemini/antigravity/brain/7be56826-0318-4792-bb9f-0046de0feaea/scratch/sync_all_ai_memories.py >> "$LOG_FILE" 2>&1
echo "=== [$(date '+%Y-%m-%d %H:%M:%S')] 同步完成 ===" >> "$LOG_FILE"
