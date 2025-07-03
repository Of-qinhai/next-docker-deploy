# Next.js Docker 运行时配置

**本应用支持运行时动态配置，无需重新构建 Docker 镜像。**

## 前因后果
next js截止到2025-7-3的版本,环境变量在编译之后无法被覆盖，运行时无效，前端用的机器又很低配，不能因为改个API地址环境变量地址，就要重打镜像，这非常相当的不符合预期，异常的不灵活，非常挫，所以有了这个这种方案。
后面前端随便交付部署啦。支持docker 启动参数里 设置API端点。

## 快速开始

### 1. 构建镜像（一次构建，后端爱换啥换啥）

```bash
./deploy.sh build
```

### 2. 运行时配置（多次使用）

在 `docker run` 命令中使用 `NEXT_PUBLIC_API_URL` 和 `NEXT_PUBLIC_APP_NAME` 环境变量。

```bash
# 开发环境示例
docker run -d --name dev-app -p 9000:3000 \
  -e NEXT_PUBLIC_API_URL="http://dev-bbbbbb:3001/api" \
  -e NEXT_PUBLIC_APP_NAME="大哥的开发环境" \
  nextjs-docker-app

# 生产环境示例
docker run -d --name prod-app -p 9001:3000 \
  -e NEXT_PUBLIC_API_URL="https://api.example.com" \
  -e NEXT_PUBLIC_APP_NAME="大哥的生产环境" \
  nextjs-docker-app
```

## 在代码中获取配置

您可以在任何客户端或服务器端代码中，通过以下方式获取运行时配置：

```typescript
import { getApiUrl, getAppName } from '@/lib/config';

// 获取 API URL
const apiUrl = getApiUrl();

// 获取应用名称
const appName = getAppName();

// 示例：发起一个 API 请求
const response = await fetch(`${apiUrl}/your/api/endpoint`);
```

## 可用命令

```bash
./deploy.sh build     # 构建 Docker 镜像
./deploy.sh run       # 构建并使用默认配置启动应用
./deploy.sh stop      # 停止应用
./deploy.sh logs      # 查看应用日志
./deploy.sh help      # 显示帮助信息
```

## 环境变量

通过 `docker run -e` 设置以下环境变量：

| 变量名 | 说明 | 默认值 |
|----------------------|---------------------------------|-----------------------------|
| `NEXT_PUBLIC_API_URL` | 应用访问的后端 API 服务地址 | `http://localhost:3000/api` |
| `NEXT_PUBLIC_APP_NAME` | 应用在页面上显示的名字 | `Next.js Docker App` |

## 访问地址

- 应用访问：`http://localhost:9000` (如果端口映射为 9000)
- 运行时配置文件：`http://localhost:9000/runtime-config.js`
