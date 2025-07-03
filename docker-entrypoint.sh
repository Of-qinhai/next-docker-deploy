#!/bin/sh
set -e

# Prioritize NEXT_PUBLIC_* environment variables from docker run
RUNTIME_API_URL=${NEXT_PUBLIC_API_URL:-${API_URL:-"http://localhost:3000/api"}}
RUNTIME_APP_NAME=${NEXT_PUBLIC_APP_NAME:-${APP_NAME:-"Next.js Docker App"}}

echo "Container starting..."
echo "API URL: $RUNTIME_API_URL"  
echo "App Name: $RUNTIME_APP_NAME"

# Create runtime configuration file
cat > /app/public/runtime-config.js << EOF
window.__RUNTIME_CONFIG__ = {
  apiUrl: "${RUNTIME_API_URL}",
  appName: "${RUNTIME_APP_NAME}",
  environment: "${NODE_ENV:-production}",
  timestamp: "$(date -Iseconds)"
};
EOF

echo "Runtime config generated successfully."
echo "Config content:"
cat /app/public/runtime-config.js

# Start the application
echo "Starting Next.js application..."
exec "$@" 