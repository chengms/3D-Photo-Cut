import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '3D照片风格化平台',
  description: '基于AI技术的在线照片风格化平台，轻松将您的照片转换为艺术作品',
  keywords: ['AI', '照片处理', '风格化', '艺术', '抠图'],
  authors: [{ name: '3D Photo Cut Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 