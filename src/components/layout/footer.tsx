import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: {
      title: "产品",
      links: [
        { name: "功能特性", href: "/#features" },
        { name: "风格模板", href: "/#templates" },
        { name: "价格方案", href: "/#pricing" },
        { name: "API文档", href: "/docs/api" }
      ]
    },
    company: {
      title: "公司",
      links: [
        { name: "关于我们", href: "/about" },
        { name: "联系我们", href: "/contact" },
        { name: "加入我们", href: "/careers" },
        { name: "新闻动态", href: "/news" }
      ]
    },
    support: {
      title: "支持",
      links: [
        { name: "帮助中心", href: "/help" },
        { name: "使用教程", href: "/tutorials" },
        { name: "常见问题", href: "/#faq" },
        { name: "反馈建议", href: "/feedback" }
      ]
    },
    legal: {
      title: "法律",
      links: [
        { name: "用户协议", href: "/terms" },
        { name: "隐私政策", href: "/privacy" },
        { name: "版权声明", href: "/copyright" },
        { name: "免责声明", href: "/disclaimer" }
      ]
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* 品牌信息 */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <span className="font-bold text-xl">3D照片风格化</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-sm">
              基于AI技术的照片风格化平台，让每一张照片都成为独特的艺术作品。
            </p>
            
            {/* 社交媒体链接 */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">微信</span>
                <span>💬</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">微博</span>
                <span>📱</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">邮箱</span>
                <span>✉️</span>
              </a>
            </div>
          </div>

          {/* 链接分组 */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 分割线 */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* 版权信息 */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} 3D照片风格化平台. 保留所有权利.
            </div>

            {/* 备案信息和快速链接 */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-white transition-colors">
                服务条款
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                隐私政策
              </Link>
              <span>ICP备案号：京ICP备xxxxxxxx号</span>
            </div>
          </div>
        </div>

        {/* 技术栈展示 */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="text-center text-gray-500 text-xs">
            <p className="mb-2">Powered by</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span>Next.js</span>
              <span>•</span>
              <span>Supabase</span>
              <span>•</span>
              <span>Replicate AI</span>
              <span>•</span>
              <span>Cloudflare</span>
              <span>•</span>
              <span>Vercel</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 