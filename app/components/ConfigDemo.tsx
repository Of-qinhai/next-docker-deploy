'use client';

import { useState } from 'react';
import { getApiUrl, getAppName, getConfig } from '@/lib/config';

export default function ConfigDemo() {
  const [config, setConfig] = useState<ReturnType<typeof getConfig> | null>(null);
  const [loading, setLoading] = useState(false);

  const loadConfig = () => {
    setLoading(true);
    setTimeout(() => {
      setConfig(getConfig());
      setLoading(false);
    }, 300);
  };

  const testApiCall = async () => {
    const apiUrl = getApiUrl();
    const appName = getAppName();

    alert(`App Name: ${appName}\nAPI URL: ${apiUrl}\n\nThis is the configuration retrieved in your code!`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Configuration Demo
      </h3>

      <div className="space-y-3">
        <button
          onClick={loadConfig}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Get Configuration'}
        </button>

        {config && (
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded">
              <strong>API URL:</strong> {config.apiUrl}
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900 rounded">
              <strong>App Name:</strong> {config.appName}
            </div>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900 rounded">
              <strong>Environment:</strong> {config.environment}
            </div>
          </div>
        )}

        <button
          onClick={testApiCall}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Configuration Usage
        </button>
      </div>
    </div>
  );
} 