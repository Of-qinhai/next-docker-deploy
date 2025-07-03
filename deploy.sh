#!/bin/bash

# Next.js Docker Deployment Script

set -e

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
}

build_image() {
    print_message "Building Docker image with runtime configuration support..."
    print_message "This image supports dynamic runtime configuration, no rebuild required!"
    
    docker build -t nextjs-docker-app .
    print_message "Image built successfully!"
}

start_with_docker() {
    local api_url=${1:-"http://localhost:9000/api"}
    local app_name=${2:-"Next.js Docker Learning App"}
    
    print_message "Starting application with docker run..."
    print_message "API URL: $api_url"
    print_message "App Name: $app_name"
    
    docker stop nextjs-docker-app 2>/dev/null || true
    docker rm nextjs-docker-app 2>/dev/null || true
    
    docker run -d \
        --name nextjs-docker-app \
        -p 9000:3000 \
        -e NODE_ENV=production \
        -e API_URL="$api_url" \
        -e NEXT_PUBLIC_API_URL="$api_url" \
        -e APP_NAME="$app_name" \
        -e NEXT_PUBLIC_APP_NAME="$app_name" \
        -v "$(pwd)/logs:/app/logs" \
        nextjs-docker-app
    
    print_message "Application started!"
    print_message "Internal Access: http://localhost:9000"
    print_message "External Access: http://$(hostname -I | awk '{print $1}'):9000"
}

stop_app() {
    print_message "Stopping application..."
    docker stop nextjs-docker-app 2>/dev/null || true
    docker rm nextjs-docker-app 2>/dev/null || true
    print_message "Application stopped!"
}

show_logs() {
    print_message "Displaying application logs..."
    if docker ps --format "table {{.Names}}" | grep -q "nextjs-docker-app"; then
        docker logs -f nextjs-docker-app
    else
        print_warning "Container is not running."
    fi
}

show_help() {
    echo -e "${BLUE}Next.js Docker Deployment Script - Supports Runtime Configuration${NC}"
    echo ""
    echo "Features: Supports dynamic runtime configuration, no image rebuild required!"
    echo ""
    echo "Usage:"
    echo "  $0 [command] [parameters]"
    echo ""
    echo "Commands:"
    echo "  build                    - Builds the Docker image (build once, use many times)"
    echo "  run [api_url] [app_name] - Starts the application using docker run (supports runtime config)"
    echo "  stop                     - Stops the application"
    echo "  logs                     - Views application logs"
    echo "  help                     - Displays this help information"
    echo ""
    echo "Example:"
    echo "  $0 build"
    echo "  $0 run \"https://api.example.com\" \"My App\""
    echo "  $0 stop"
    echo "  $0 logs"
    echo ""
    echo "Runtime Configuration Example:"
    echo "  # Build the image once"
    echo "  $0 build"
    echo ""
    echo "  # Development environment"
    echo "  docker run -d --name dev-app -p 9000:3000 \\"
    echo "    -e API_URL=\"http://localhost:3001/api\" \\"
    echo "    -e APP_NAME=\"Development Env\" \\"
    echo "    nextjs-docker-app"
    echo ""
    echo "  # Production environment"
    echo "  docker run -d --name prod-app -p 9000:3000 \\"
    echo "    -e API_URL=\"https://api.example.com\" \\"
    echo "    -e APP_NAME=\"Production Env\" \\"
    echo "    nextjs-docker-app"
    echo ""
    echo "No rebuild needed!"
}

main() {
    check_docker
    
    case "${1:-help}" in
        "build")
            build_image
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

main "$@" 