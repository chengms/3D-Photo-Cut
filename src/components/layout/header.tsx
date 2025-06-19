'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <span className="hidden font-bold sm:inline-block">
            3D照片风格化
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/#features" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            功能特性
          </Link>
          <Link 
            href="/#templates" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            风格模板
          </Link>
          <Link 
            href="/#pricing" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            价格方案
          </Link>
          <Link 
            href="/gallery" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            作品展示
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login">登录</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/register">开始创作</Link>
          </Button>
          
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">打开菜单</span>
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-current transition-all h-0.5 w-6 transform ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`bg-current transition-all h-0.5 w-6 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-current transition-all h-0.5 w-6 transform ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t bg-background">
            <Link 
              href="/#features" 
              className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              功能特性
            </Link>
            <Link 
              href="/#templates" 
              className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              风格模板
            </Link>
            <Link 
              href="/#pricing" 
              className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              价格方案
            </Link>
            <Link 
              href="/gallery" 
              className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              作品展示
            </Link>
          </div>
        </div>
      )}
    </header>
  )
} 