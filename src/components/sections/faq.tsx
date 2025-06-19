'use client'

import { useState } from 'react'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "处理一张照片需要多长时间？",
      answer: "通常情况下，处理一张照片只需要30秒到2分钟，具体时间取决于图片大小和所选风格的复杂程度。"
    },
    {
      question: "支持哪些图片格式？",
      answer: "我们支持 JPG、PNG、WEBP 等常见图片格式，推荐使用 JPG 格式以获得最佳处理效果。"
    },
    {
      question: "处理后的图片质量如何？",
      answer: "我们采用先进的AI算法，确保输出高质量的图片。专业版用户可获得更高分辨率的输出结果。"
    },
    {
      question: "我的照片是否安全？",
      answer: "您的隐私是我们的首要关注。所有照片在处理完成后会自动删除，我们不会存储或分享您的个人照片。"
    },
    {
      question: "免费版有什么限制？",
      answer: "免费版每日可处理3张照片，支持基础风格模板，处理结果保存7天。升级专业版可享受无限制处理。"
    },
    {
      question: "可以批量处理照片吗？",
      answer: "专业版和企业版用户可以使用批量处理功能，一次性上传多张照片并应用相同风格。"
    },
    {
      question: "如何获得技术支持？",
      answer: "您可以通过在线客服、邮件或帮助中心获得技术支持。企业版用户享有优先技术支持服务。"
    },
    {
      question: "是否支持移动设备？",
      answer: "是的，我们的平台完全适配移动设备，您可以在手机或平板上轻松完成照片风格化处理。"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            常见问题
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            以下是用户最常询问的问题，希望能帮助您更好地了解我们的服务
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <span className={`text-2xl text-gray-400 transition-transform ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <div className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 联系支持 */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            还有其他问题？我们很乐意为您解答
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            联系客服
            <span className="ml-2">💬</span>
          </button>
        </div>
      </div>
    </section>
  )
} 