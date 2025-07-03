// Configuration utility - retrieves runtime configuration
interface RuntimeConfig {
  apiUrl: string;
  appName: string;
  environment: string;
  timestamp: string;
}

/**
 * Get runtime configuration
 * Prioritizes configuration generated at container startup, otherwise falls back to build-time configuration.
 */
export function getConfig(): RuntimeConfig {
  // Use environment variables directly on the server side
  if (typeof window === 'undefined') {
    return {
      apiUrl: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:3000/api",
      appName: process.env.NEXT_PUBLIC_APP_NAME || process.env.APP_NAME || "Next.js Docker App",
      environment: process.env.NODE_ENV || "production",
      timestamp: new Date().toISOString()
    };
  }

  // On the client side, prioritize runtime configuration
  const runtimeConfig = (window as unknown as { __RUNTIME_CONFIG__?: RuntimeConfig }).__RUNTIME_CONFIG__;
  
  if (runtimeConfig) {
    return runtimeConfig;
  }

  // Fallback to build-time configuration
  return {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    appName: process.env.NEXT_PUBLIC_APP_NAME || "Next.js Docker App",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  };
}

/**
 * Get API URL
 */
export function getApiUrl(): string {
  return getConfig().apiUrl;
}

/**
 * Get application name
 */
export function getAppName(): string {
  return getConfig().appName;
} 