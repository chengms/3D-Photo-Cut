import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Templates } from '@/components/sections/templates'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Pricing } from '@/components/sections/pricing'
import { FAQ } from '@/components/sections/faq'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main>
        <Hero />
        <Features />
        <Templates />
        <HowItWorks />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
} 