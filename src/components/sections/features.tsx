export function Features() {
  const features = [
    {
      icon: "🎨",
      title: "多种艺术风格",
      description: "支持动漫、油画、水彩、素描等多种艺术风格，满足不同创作需求"
    },
    {
      icon: "🤖",
      title: "AI智能抠图",
      description: "采用先进的AI技术，精确识别人物主体，自动去除背景"
    },
    {
      icon: "⚡",
      title: "快速处理",
      description: "30秒内完成图片风格化处理，让创作更高效"
    },
    {
      icon: "✨",
      title: "智能美化",
      description: "在保持人物特征的基础上，进行适度美化优化"
    },
    {
      icon: "📱",
      title: "多端适配",
      description: "完美支持桌面端和移动端，随时随地进行创作"
    },
    {
      icon: "🔒",
      title: "隐私保护",
      description: "照片处理完成后自动删除，保护您的隐私安全"
    }
  ]

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            强大功能，简单易用
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            集成最先进的AI技术，为您提供专业级的照片风格化服务
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 