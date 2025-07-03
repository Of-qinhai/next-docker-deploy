#!/bin/bash

# Next.js Docker 部署脚本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查 Docker 是否安装
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker 未安装，请先安装 Docker"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose 未安装，请先安装 Docker Compose"
        exit 1
    fi
}

# 构建镜像
build_image() {
    print_message "开始构建 Docker 镜像..."
    docker build -t nextjs-docker-app .
    print_message "镜像构建完成！"
}

# 使用 docker-compose 启动
start_with_compose() {
    print_message "使用 docker-compose 启动应用..."
    docker-compose up -d
    print_message "应用已启动！"
    print_message "访问地址: http://localhost:9000"
    print_message "Nginx 代理: http://localhost:80"
}

# 直接使用 docker run 启动
start_with_docker() {
    local api_url=${1:-"http://localhost:9000/api"}
    local app_name=${2:-"Next.js Docker 学习应用"}
    
    print_message "使用 docker run 启动应用..."
    print_message "API 地址: $api_url"
    print_message "应用名称: $app_name"
    
    # 停止已存在的容器
    docker stop nextjs-docker-app 2>/dev/null || true
    docker rm nextjs-docker-app 2>/dev/null || true
    
    # 启动新容器
    docker run -d \
        --name nextjs-docker-app \
        -p 9000:3000 \
        -e NODE_ENV=production \
        -e API_URL="$api_url" \
        -e NEXT_PUBLIC_API_URL="$api_url" \
        -e NEXT_PUBLIC_APP_NAME="$app_name" \
        -v "$(pwd)/logs:/app/logs" \
        nextjs-docker-app
    
    print_message "应用已启动！访问地址: http://localhost:9000"
}

# 停止应用
stop_app() {
    print_message "停止应用..."
    docker-compose down 2>/dev/null || true
    docker stop nextjs-docker-app 2>/dev/null || true
    docker rm nextjs-docker-app 2>/dev/null || true
    print_message "应用已停止！"
}

# 查看日志
show_logs() {
    print_message "显示应用日志..."
    if docker ps --format "table {{.Names}}" | grep -q "nextjs-docker-app"; then
        docker logs -f nextjs-docker-app
    else
        print_warning "容器未运行"
    fi
}

# 显示帮助信息
show_help() {
    echo -e "${BLUE}Next.js Docker 部署脚本${NC}"
    echo ""
    echo "用法："
    echo "  $0 [命令] [参数]"
    echo ""
    echo "命令："
    echo "  build                    - 构建 Docker 镜像"
    echo "  start                    - 使用 docker-compose 启动应用"
    echo "  run [api_url] [app_name] - 使用 docker run 启动应用"
    echo "  stop                     - 停止应用"
    echo "  logs                     - 查看应用日志"
    echo "  help                     - 显示此帮助信息"
    echo ""
    echo "示例："
    echo "  $0 build"
    echo "  $0 start"
    echo "  $0 run \"https://api.example.com\" \"我的应用\""
    echo "  $0 stop"
    echo "  $0 logs"
}

# 主函数
main() {
    check_docker
    
    case "${1:-help}" in
        "build")
            build_image
            ;;
        "start")
            start_with_compose
            ;;
        "run")
            build_image
            start_with_docker "$2" "$3"
            ;;
        "stop")
            stop_app
            ;;
        "logs")
            show_logs
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# 执行主函数
main "$@" 