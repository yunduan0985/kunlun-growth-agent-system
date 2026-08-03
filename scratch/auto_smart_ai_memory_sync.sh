#!/bin/zsh
# 全平台 AI 聊天与记忆【智能动态触发】自动同步脚本
# 触发规则：
# 1. 连续 30 分钟未操作电脑 (Idle Time >= 1800s)
# 2. 连续与 AI 工作 5 小时 (Distance from Last Sync >= 18000s)
# 3. 每日例行定时同步

LOG_FILE="/tmp/ai_memory_sync.log"
TIME_STAMP_FILE="/tmp/ai_memory_last_sync_timestamp"
IDLE_SYNC_LOCK="/tmp/ai_memory_idle_sync_lock"

CURRENT_TIME=$(date +%s)

# 1. 获取 Mac 系统键盘/鼠标空闲秒数
IDLE_SECONDS=$(ioreg -c IOHIDSystem | awk '/HIDIdleTime/ {print int($NF/1000000000); exit}')

# 2. 读取上一次同步的时间戳
LAST_SYNC=0
if [ -f "$TIME_STAMP_FILE" ]; then
  LAST_SYNC=$(cat "$TIME_STAMP_FILE")
fi
ELAPSED_SINCE_LAST=$((CURRENT_TIME - LAST_SYNC))

SHOULD_SYNC=0
REASON=""

# 条件 1：用户连续 30 分钟（1800秒）未操作电脑
if [ "$IDLE_SECONDS" -ge 1800 ]; then
  # 避免在空闲状态下每10分钟重复同步，检查空闲锁
  if [ ! -f "$IDLE_SYNC_LOCK" ] || [ $((CURRENT_TIME - $(cat "$IDLE_SYNC_LOCK"))) -ge 1800 ]; then
    SHOULD_SYNC=1
    REASON="检测到用户连续 30 分钟未操作电脑 (空闲 ${IDLE_SECONDS} 秒)"
    echo "$CURRENT_TIME" > "$IDLE_SYNC_LOCK"
  fi
fi

# 条件 2：连续与 AI 工作已满 5 小时（18000秒）
if [ "$ELAPSED_SINCE_LAST" -ge 18000 ]; then
  SHOULD_SYNC=1
  REASON="检测到连续与 AI 工作已满 5 小时 (距上次同步 ${ELAPSED_SINCE_LAST} 秒)"
fi

# 如果满足任意触发条件，执行同步
if [ "$SHOULD_SYNC" -eq 1 ]; then
  echo "=== [$(date '+%Y-%m-%d %H:%M:%S')] 触发智能同步: ${REASON} ===" >> "$LOG_FILE"
  /usr/bin/python3 /Users/dasean/.gemini/antigravity/brain/7be56826-0318-4792-bb9f-0046de0feaea/scratch/sync_all_ai_memories.py >> "$LOG_FILE" 2>&1
  echo "$CURRENT_TIME" > "$TIME_STAMP_FILE"
  echo "=== [$(date '+%Y-%m-%d %H:%M:%S')] 同步完成 ===" >> "$LOG_FILE"
fi
