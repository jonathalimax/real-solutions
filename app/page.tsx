'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/landing/hero'
import SocialProof from '@/components/landing/social-proof'
import Services from '@/components/landing/services'
import HowItWorks from '@/components/landing/how-it-works'
import FeaturedProject from '@/components/landing/featured-project'
import Differentials from '@/components/landing/differentials'
import WhatToExpect from '@/components/landing/what-to-expect'
import Pricing from '@/components/landing/pricing'
import CTAForm from '@/components/landing/cta-form'
import Footer from '@/components/landing/footer'
import Header from '@/components/landing/header'
import AnimatedBackground from '@/components/animated-background'

export default function Home() {
  const [language, setLanguage] = useState<'pt-BR' | 'en'>('pt-BR')

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <div className="opacity-0 animate-in fade-in duration-700">
          <Hero language={language} />
        </div>
        <div className="opacity-0 animate-in fade-in duration-700" style={{ animationDelay: '100ms' }}>
          <SocialProof language={language} />
        </div>
        <div className="opacity-0 animate-in fade-in duration-700" style={{ animationDelay: '200ms' }}>
          <Services language={language} />
        </div>
        <div className="opacity-0 animate-in fade-in duration-700" style={{ animationDelay: '300ms' }}>
          <HowItWorks language={language} />
        </div>
        <div className="opacity-0 animate-in fade-in duration-700" style={{ animationDelay: '400ms' }}>
          <FeaturedProject language={language} />
        </div>
        <div className="opacity-0 animate-in fade-in duration-700" style={{ animationDelay: '500ms' }}>
          <Differentials language={language} />
        </div>
        <div className="opacity-0 animate-in fade-in duration-700" style={{ animationDelay: '600ms' }}>
          <WhatToExpect language={language} />
        </div>
        <div className="opacity-0 animate-in fade-in duration-700" style={{ animationDelay: '700ms' }}>
          <Pricing language={language} />
        </div>
        <div className="opacity-0 animate-in fade-in duration-700" style={{ animationDelay: '800ms' }}>
          <CTAForm language={language} />
        </div>
      </main>
      <Footer language={language} />
    </div>
  )
}
