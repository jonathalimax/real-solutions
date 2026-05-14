'use client'

import { useState } from 'react'
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
  const [selectedPlan, setSelectedPlan] = useState<string>('')

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName)
    setTimeout(() => {
      document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Hero language={language} />
        <SocialProof language={language} />
        <Services language={language} />
        <HowItWorks language={language} />
        <FeaturedProject language={language} />
        <Differentials language={language} />
        <WhatToExpect language={language} />
        <Pricing language={language} onSelectPlan={handleSelectPlan} />
        <CTAForm language={language} selectedPlan={selectedPlan} />
      </main>
      <Footer language={language} />
    </div>
  )
}
