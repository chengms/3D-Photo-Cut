export function Pricing() {
  const plans = [
    {
      name: "免费版",
      price: "¥0",
      period: "/月",
      description: "适合体验和偶尔使用",
      features: [
        "每日 3 次免费处理",
        "基础风格模板",
        "标准处理质量",
        "作品保存 7 天"
      ],
      buttonText: "立即注册",
      buttonStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      popular: false
    },
    {
      name: "专业版", 
      price: "¥29",
      period: "/月",
      description: "适合个人创作者和设计师",
      features: [
        "无限制处理次数",
        "所有风格模板",
        "高清处理质量",
        "优先处理队列",
        "作品永久保存",
        "批量处理功能"
      ],
      buttonText: "选择专业版",
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
      popular: true
    },
    {
      name: "企业版",
      price: "¥99", 
      period: "/月",
      description: "适合团队和商业用途",
      features: [
        "专业版所有功能",
        "API 接口访问",
        "自定义风格训练",
        "技术支持",
        "商用授权",
        "团队协作功能"
      ],
      buttonText: "联系销售",
      buttonStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            选择适合您的方案
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            从免费体验到专业创作，总有一款方案满足您的需求
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-blue-500' : 'border border-gray-200'
              }`}
            >
              {/* 推荐标签 */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    推荐
                  </span>
                </div>
              )}

              {/* 方案信息 */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              {/* 功能列表 */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm">✓</span>
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* 选择按钮 */}
              <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* 额外说明 */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            所有方案均支持 7 天无理由退款
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ 安全支付</span>
            <span>✓ 随时取消</span>
            <span>✓ 24/7 客服支持</span>
          </div>
        </div>
      </div>
    </section>
  )
} 