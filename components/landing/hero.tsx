'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useInView } from '@/hooks/use-in-view'

interface HeroProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': {
    badge: 'Crescemos juntos — sem limites de escala',
    title: ['Transforme seu negócio com', 'soluções digitais de impacto'],
    subtitle: 'Criamos aplicativos, websites, automações e bots que crescem com você',
    cta: 'Começar um projeto',
    ctaSecondary: 'Saber mais',
    stats: [
      { value: '120+', label: 'Projetos' },
      { value: '98%', label: 'Satisfação' },
      { value: '5★', label: 'Avaliação' },
    ],
  },
  en: {
    badge: 'We grow together — unlimited scale',
    title: ['Transform your business with', 'impactful digital solutions'],
    subtitle: 'We create apps, websites, automations and bots that grow with you',
    cta: 'Start a project',
    ctaSecondary: 'Learn more',
    stats: [
      { value: '120+', label: 'Projects' },
      { value: '98%', label: 'Satisfaction' },
      { value: '5★', label: 'Rated' },
    ],
  },
}

const ACCENT_COLORS = ['#14b8a6', '#6366f1', '#0ea5e9'] as const

export default function Hero({ language }: HeroProps) {
  const { ref, isVisible } = useInView()
  const text = content[language]

  const scrollToForm = () => {
    document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative px-4 py-20 sm:py-32 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <div className={`animate-on-scroll animate-scale-fade ${isVisible ? 'is-visible' : ''}`}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#14b8a6]/30 bg-[#14b8a6]/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] shadow-[0_0_6px_#14b8a6]" />
              <p className="text-sm text-[#5eead4] font-medium">{text.badge}</p>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6 text-white">
              {text.title[0]}{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #14b8a6, #6366f1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {text.title[1]}
              </span>
            </h1>

            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              {text.subtitle}
            </p>

            <div className="flex gap-4 flex-wrap mb-12">
              <Button
                size="lg"
                onClick={scrollToForm}
                style={{ background: 'linear-gradient(135deg, #0d9488, #4f46e5)' }}
                className="text-white hover:opacity-90 transition-opacity border-0"
              >
                {text.cta}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white/80 hover:bg-white/5 hover:border-white/40"
              >
                {text.ctaSecondary}
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex gap-8">
              {text.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="border-l-2 pl-4"
                  style={{ borderColor: ACCENT_COLORS[i] }}
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image column */}
          <div className={`animate-on-scroll animate-slide-up delay-150 ${isVisible ? 'is-visible' : ''} relative`}>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 0 40px rgba(20,184,166,0.2), 0 0 80px rgba(99,102,241,0.1)',
                border: '1px solid rgba(20,184,166,0.25)',
              }}
            >
              <Image
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team working on digital solutions"
                width={800}
                height={533}
                priority
                className="w-full h-auto object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.15) 0%, transparent 50%, rgba(99,102,241,0.15) 100%)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
