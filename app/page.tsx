import Image from "next/image";
import Script from "next/script";
import ConfigDemo from "./components/ConfigDemo";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* 加载运行时配置 */}
      <Script src="/runtime-config.js" strategy="beforeInteractive" />

      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Image
            className="dark:invert mx-auto mb-4"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold mb-4">Next.js Docker App</h1>
          <p className="text-gray-600 dark:text-gray-400">Supports runtime configuration, no rebuild required!</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          {/* 配置演示 */}
          <div className="flex justify-center">
            <ConfigDemo />
          </div>

          {/* 使用说明 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
              How to use in code
            </h2>

            <div className="text-left">
              <p className="mb-2 text-gray-700 dark:text-gray-300">Recommended approach:</p>
              <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm mb-4">
                {
                  `// Import configuration utility
                import { getApiUrl, getAppName } from '@/lib/config';

                // Use configuration
                const apiUrl = getApiUrl();
                const appName = getAppName();

                // Example: Make an API request
                const response = await fetch(\`\${apiUrl}/your/api/endpoint\`);`}
              </code>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                This way, you can dynamically get the correct configuration regardless of your environment variables!
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            href="/runtime-config.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Configuration File
          </a>
        </div>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <div className="flex gap-4 items-center justify-center flex-wrap">
          <span>Next.js Docker Learning Project</span>
          <span>|</span>
          <span>Port: 9000</span>
          <span>|</span>
          <span>Cat Rescue Plan</span>
        </div>
      </footer>
    </div>
  );
}
