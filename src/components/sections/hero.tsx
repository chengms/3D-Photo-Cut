import Link from 'next/link'

export function Hero() {
  return (
    <section className="container px-4 py-16 mx-auto lg:py-32">
      <div className="max-w-4xl mx-auto text-center">
        {/* 主标题 */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          将你的照片
          <span className="text-gradient block">
            变成艺术作品
          </span>
        </h1>
        
        {/* 副标题 */}
        <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl lg:text-2xl max-w-2xl mx-auto">
          基于AI技术的照片风格化平台，一键生成动漫、油画、水彩等多种艺术风格的个性化照片
        </p>
        
        {/* CTA按钮 */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link 
            href="/process"
            className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            立即开始创作
          </Link>
          <Link 
            href="#templates"
            className="text-lg font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
          >
            查看风格模板 <span aria-hidden="true">→</span>
          </Link>
        </div>
        
        {/* 特性标签 */}
        <div className="mt-16 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            免费试用 3 次
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            30秒快速处理
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            高精度抠图
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            多种艺术风格
          </div>
        </div>
      </div>
      
      {/* 演示图片区域 */}
      <div className="mt-16 lg:mt-24">
        <div className="relative mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {/* 原图 */}
            <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4]">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-lg"></div>
                  <p className="text-sm">原始照片</p>
                </div>
              </div>
            </div>
            
            {/* 动漫风格 */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 aspect-[3/4]">
              <div className="absolute inset-0 flex items-center justify-center text-purple-600">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-purple-300 rounded-lg"></div>
                  <p className="text-sm font-medium">动漫风格</p>
                </div>
              </div>
            </div>
            
            {/* 油画风格 */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-orange-100 to-red-100 aspect-[3/4]">
              <div className="absolute inset-0 flex items-center justify-center text-red-600">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-red-300 rounded-lg"></div>
                  <p className="text-sm font-medium">油画风格</p>
                </div>
              </div>
            </div>
            
            {/* 水彩风格 */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-teal-100 aspect-[3/4]">
              <div className="absolute inset-0 flex items-center justify-center text-teal-600">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-teal-300 rounded-lg"></div>
                  <p className="text-sm font-medium">水彩风格</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 处理流程箭头 */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none">
            <div className="flex justify-between px-8">
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 