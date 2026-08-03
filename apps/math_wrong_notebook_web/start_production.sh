#!/bin/bash
# =================================================================
# 港大 DeepTutor x 昆仑增长教育 AI 体系 - 云服务器一键部署脚本
# =================================================================

echo "🚀 [1/4] 开始检查部署环境..."

# 检查 Docker
if ! command -v docker &> /dev/null; then
    echo "❌ [错误] 服务器未安装 Docker。请运行: curl -fsSL https://get.docker.com | bash"
    exit 1
fi

# 检查 Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "⚠️ [提示] 未找到 docker-compose，正在尝试以 docker compose 模式执行..."
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

# 检查环境配置文件 .env
if [ ! -f .env ]; then
    echo "📝 [2/4] 创建默认生产环境变量文件 .env ..."
    cat <<EOT > .env
DEEPSEEK_API_KEY="${DEEPSEEK_API_KEY:-}"
NODE_ENV=production
PORT=3000
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="hku-deeptutor-secret-key-2026"
NEXTAUTH_URL="http://localhost:3000"
EOT
fi

# 启动 Docker 镜像容器
echo "🐳 [3/4] 启动 Docker 容器集群 (Next.js Web, Redis 7.0, Nginx)..."
$COMPOSE_CMD -f docker-compose.production.yml up -d --build

# 执行 Prisma 数据迁移
echo "📦 [4/4] 初始化数据库 Schema..."
npx prisma db push --accept-data-loss || true

echo ""
echo "=================================================================="
echo "🎉 部署完成！港大 DeepTutor × 昆仑教育 AI 体系已在服务器上线！"
echo "🌐 访问地址: http://你的服务器IP:3000"
echo "=================================================================="
