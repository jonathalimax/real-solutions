'use client'

import { Button } from '@/components/ui/button'

interface HeroProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': {
    title: 'Transforme seu negócio com soluções digitais de impacto',
    subtitle: 'Criamos aplicativos, websites, automações e bots que crescem com você',
    cta: 'Começar um projeto',
    urgency: 'Crescemos juntos - sem limites de escala',
  },
  en: {
    title: 'Transform your business with impactful digital solutions',
    subtitle: 'We create apps, websites, automations and bots that grow with you',
    cta: 'Start a project',
    urgency: 'We grow together - unlimited scale',
  },
}

export default function Hero({ language }: HeroProps) {
  const scrollToForm = () => {
    const element = document.getElementById('cta-form')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const text = content[language]

  return (
    <section className="relative px-4 py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-secondary/50 border border-border/50 rounded-full">
          <p className="text-sm text-muted-foreground">{text.urgency}</p>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight mb-6 text-foreground">
          {text.title}
        </h1>

        <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
          {text.subtitle}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            size="lg"
            onClick={scrollToForm}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {text.cta}
          </Button>
          <Button
            variant="outline"
            size="lg"
          >
            {language === 'pt-BR' ? 'Saber mais' : 'Learn more'}
          </Button>
        </div>
      </div>
    </section>
  )
}
