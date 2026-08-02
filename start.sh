#!/bin/bash
# =============================================================
# 昆仑增长 Agent OS — 一键启动脚本 (Web 模式，无需 Electron)
# 适用于服务器部署 / Docker / 非图形化环境
# =============================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 检测 Node.js 版本
if ! command -v node &> /dev/null; then
  echo "❌ Node.js 未安装。请先安装 Node.js >= 20.0.0"
  echo "   下载地址: https://nodejs.org"
  exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "⚠️  Node.js 版本过低 (当前: $(node -v))，推荐升级至 v20+"
fi

# 自动安装依赖（首次启动）
if [ ! -d "node_modules/express" ]; then
  echo "📦 首次启动，自动安装依赖..."
  npm install --production 2>&1
  echo "✅ 依赖安装完成！"
fi

# 端口自动探测（从 8888 开始找空闲端口）
PORT=8888
while lsof -i :$PORT &>/dev/null 2>&1; do
  echo "⚡️ 端口 $PORT 被占用，尝试下一个..."
  PORT=$((PORT+1))
done

export PORT=$PORT

echo ""
echo "=================================================="
echo " 🚀 昆仑增长 Agent OS v2.0"
echo "    启动端口: http://localhost:$PORT"
echo "=================================================="
echo ""
echo " ▶ 在浏览器中打开以下地址访问控制台："
echo "   👉 http://localhost:$PORT"
echo ""
echo " 按 Ctrl+C 关闭服务"
echo "--------------------------------------------------"

# 启动网关
node src/index.js
