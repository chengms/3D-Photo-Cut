export function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "选择风格",
      description: "从多种艺术风格中选择您喜欢的模板",
      icon: "🎨"
    },
    {
      step: "2", 
      title: "上传照片",
      description: "上传您的个人照片，支持多种格式",
      icon: "📸"
    },
    {
      step: "3",
      title: "AI处理",
      description: "AI自动抠图并应用选定的艺术风格",
      icon: "🤖"
    },
    {
      step: "4",
      title: "下载作品",
      description: "获得高质量的风格化照片作品",
      icon: "⬇️"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            四步完成艺术创作
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            简单几步，让AI为您创造独一无二的艺术作品
          </p>
        </div>

        {/* 桌面端流程 */}
        <div className="hidden md:flex items-center justify-between mb-12">
          {steps.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              
              {/* 连接箭头 */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-gray-300 relative">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 移动端流程 */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={step.step} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-xl">{step.icon}</span>
                </div>
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto">
                  {step.step}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 