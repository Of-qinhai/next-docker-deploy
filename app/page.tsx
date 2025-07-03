import Image from "next/image";

export default function Home() {
  // 获取环境变量中的 API 地址，如果没有设置则使用默认值
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:3000/api";
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Next.js Docker App";
  const environment = process.env.NODE_ENV || "development";

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center text-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-4xl font-bold mb-4">{appName}</h1>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">配置信息</h2>
            
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">API 地址:</span>
                <span className="text-lg font-mono bg-blue-50 dark:bg-blue-900 p-2 rounded border-l-4 border-blue-500 text-blue-800 dark:text-blue-200">
                  {apiUrl}
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">运行环境:</span>
                <span className="text-lg font-mono bg-green-50 dark:bg-green-900 p-2 rounded border-l-4 border-green-500 text-green-800 dark:text-green-200">
                  {environment}
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">容器时间:</span>
                <span className="text-lg font-mono bg-purple-50 dark:bg-purple-900 p-2 rounded border-l-4 border-purple-500 text-purple-800 dark:text-purple-200">
                  {new Date().toLocaleString('zh-CN')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            <p>这是一个用于学习 Docker 部署的 Next.js 应用</p>
            <p>可以通过环境变量 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">API_URL</code> 动态配置 API 地址</p>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href={apiUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            访问 API
          </a>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-500">
        <span>Next.js Docker 学习项目</span>
        <span>|</span>
        <span>端口: 9000</span>
      </footer>
    </div>
  );
}
