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

export default function Home() {
  const [language, setLanguage] = useState<'pt-BR' | 'en'>('pt-BR')

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Hero language={language} />
        <SocialProof language={language} />
        <Services language={language} />
        <HowItWorks language={language} />
        <FeaturedProject language={language} />
        <Differentials language={language} />
        <WhatToExpect language={language} />
        <Pricing language={language} />
        <CTAForm language={language} />
      </main>
      <Footer language={language} />
    </div>
  )
}
