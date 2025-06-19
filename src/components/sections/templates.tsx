export function Templates() {
  const templates = [
    {
      id: "anime",
      name: "动漫风格",
      description: "精美的二次元插画风格",
      preview: "/templates/anime-preview.jpg",
      color: "from-pink-400 to-purple-500"
    },
    {
      id: "oil-painting",
      name: "油画风格", 
      description: "经典艺术油画效果",
      preview: "/templates/oil-preview.jpg",
      color: "from-orange-400 to-red-500"
    },
    {
      id: "watercolor",
      name: "水彩风格",
      description: "清新淡雅的水彩画",
      preview: "/templates/watercolor-preview.jpg", 
      color: "from-blue-400 to-teal-500"
    },
    {
      id: "sketch",
      name: "素描风格",
      description: "经典黑白素描效果",
      preview: "/templates/sketch-preview.jpg",
      color: "from-gray-400 to-gray-600"
    }
  ]

  return (
    <section id="templates" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            丰富的风格模板
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            精心设计的艺术风格模板，让您的照片瞬间变身艺术作品
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div 
              key={template.id}
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* 模板预览图 */}
              <div className="aspect-[3/4] bg-gradient-to-br bg-gray-100 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`}></div>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <p className="text-sm font-medium">预览效果</p>
                  </div>
                </div>
                {/* 悬停效果 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* 模板信息 */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {template.description}
                </p>
              </div>

              {/* 选择按钮 */}
              <div className="absolute top-4 right-4">
                <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 更多模板提示 */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">更多精彩风格正在开发中...</p>
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            立即体验
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  )
} 