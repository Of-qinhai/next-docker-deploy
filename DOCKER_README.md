# Next.js Docker 部署指南

这是一个用于学习 Docker 部署的 Next.js 项目，支持灵活配置 API 地址。

## 🚀 快速开始

### 1. 构建并运行（推荐）

```bash
# 使用部署脚本快速启动
./deploy.sh run

# 自定义 API 地址和应用名称
./deploy.sh run "https://api.example.com" "我的应用"
```

### 2. 使用 Docker Compose

```bash
# 构建并启动所有服务
./deploy.sh start

# 或者手动操作
docker-compose up -d
```

### 3. 直接使用 Docker 命令

```bash
# 构建镜像
docker build -t nextjs-docker-app .

# 运行容器并指定环境变量
docker run -d \
  --name nextjs-docker-app \
  -p 9000:3000 \
  -e API_URL="https://your-api.com" \
  -e NEXT_PUBLIC_APP_NAME="我的应用" \
  nextjs-docker-app
```

## 🛠️ 环境变量配置

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `API_URL` | 后端 API 地址 | `http://localhost:9000/api` |
| `NEXT_PUBLIC_API_URL` | 客户端 API 地址 | `http://localhost:9000/api` |
| `NEXT_PUBLIC_APP_NAME` | 应用名称 | `Next.js Docker 学习应用` |
| `NODE_ENV` | 运行环境 | `production` |

## 📋 部署脚本命令

```bash
./deploy.sh build                    # 构建镜像
./deploy.sh start                    # 使用 docker-compose 启动
./deploy.sh run [api_url] [app_name] # 使用 docker run 启动
./deploy.sh stop                     # 停止应用
./deploy.sh logs                     # 查看日志
./deploy.sh help                     # 显示帮助
```

## 🌐 访问地址

- **应用主页**: http://localhost:9000
- **Nginx 代理**: http://localhost:80 (使用 docker-compose 时)
- **健康检查**: http://localhost/health (Nginx)

## 📁 项目结构

```
my-app/
├── app/                    # Next.js 应用源码
├── public/                 # 静态资源
├── Dockerfile             # Docker 镜像构建文件
├── docker-compose.yaml    # Docker Compose 配置
├── ecosystem.config.js    # PM2 配置文件
├── nginx.conf            # Nginx 配置文件
├── deploy.sh             # 部署脚本
└── logs/                 # 日志目录（运行时创建）
```

## 🔧 技术特性

- ✅ **多阶段构建**: 优化镜像大小
- ✅ **PM2 进程管理**: 自动重启和日志管理
- ✅ **Nginx 反向代理**: 负载均衡和静态文件缓存
- ✅ **环境变量配置**: 运行时动态配置
- ✅ **健康检查**: 容器状态监控
- ✅ **日志管理**: 持久化日志存储

## 📖 使用示例

### 例子 1: 开发环境

```bash
./deploy.sh run "http://localhost:3001/api" "开发环境"
```

### 例子 2: 生产环境

```bash
./deploy.sh run "https://prod-api.example.com" "生产应用"
```

### 例子 3: 查看容器状态

```bash
# 查看运行中的容器
docker ps

# 查看应用日志
./deploy.sh logs

# 进入容器调试
docker exec -it nextjs-docker-app sh
```

## 🐛 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   # 检查端口使用情况
   netstat -ano | findstr :9000
   
   # 停止现有服务
   ./deploy.sh stop
   ```

2. **权限问题**
   ```bash
   # 给脚本添加执行权限
   chmod +x deploy.sh
   ```

3. **镜像构建失败**
   ```bash
   # 清理 Docker 缓存
   docker system prune -f
   
   # 重新构建
   ./deploy.sh build
   ```

## 📝 学习要点

这个项目演示了以下 Docker 最佳实践：

1. **多阶段构建**: 分离构建环境和运行环境
2. **环境变量管理**: 运行时配置而非构建时硬编码
3. **进程管理**: 使用 PM2 管理 Node.js 进程
4. **反向代理**: 使用 Nginx 提供额外功能
5. **容器编排**: 使用 Docker Compose 管理多容器应用

## 🎯 下一步

- 添加数据库服务 (MongoDB/PostgreSQL)
- 集成 CI/CD 流水线
- 添加监控和日志聚合 (Prometheus/ELK)
- 配置 HTTPS 和域名
- 实现滚动更新部署 