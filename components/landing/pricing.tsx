'use client'

import { useInView } from '@/hooks/use-in-view'
import { Button } from '@/components/ui/button'

interface PricingProps {
  language: 'pt-BR' | 'en'
  onSelectPlan: (planName: string) => void
}

const content = {
  'pt-BR': {
    title: 'Planos sob medida',
    subtitle: 'Cada projeto é único, cada orçamento também',
    cta: 'Escolher plano',
    badge: 'Mais popular',
    plans: [
      {
        name: 'Starter',
        price: 'R$ 1.000',
        description: 'Perfeito para começar online',
        features: ['Landing page', 'Formulário de contato', 'SEO básico', '1 mês suporte'],
      },
      {
        name: 'Growth',
        price: 'R$ 5.000',
        description: 'Para negócios em crescimento',
        features: ['Website completo', 'Integrações', 'Sistemas básicos', '3 meses suporte'],
        highlighted: true,
      },
      {
        name: 'Customizado',
        price: 'À combinar',
        description: 'Soluções completas sob medida',
        features: ['Apps mobile', 'Sistemas complexos', 'Automações avançadas', 'Suporte exclusivo'],
      },
    ],
  },
  en: {
    title: 'Custom plans',
    subtitle: 'Every project is unique, every budget too',
    cta: 'Choose plan',
    badge: 'Most popular',
    plans: [
      {
        name: 'Starter',
        price: 'R$ 1,000',
        description: 'Perfect to start online',
        features: ['Landing page', 'Contact form', 'Basic SEO', '1 month support'],
      },
      {
        name: 'Growth',
        price: 'R$ 5,000',
        description: 'For growing businesses',
        features: ['Complete website', 'Integrations', 'Basic systems', '3 months support'],
        highlighted: true,
      },
      {
        name: 'Custom',
        price: "Let's talk",
        description: 'Complete tailored solutions',
        features: ['Mobile apps', 'Complex systems', 'Advanced automation', 'Dedicated support'],
      },
    ],
  },
}

const DELAYS = [0, 150, 300] as const

export default function Pricing({ language, onSelectPlan }: PricingProps) {
  const { ref, isVisible } = useInView()
  const text = content[language]

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className={`text-center mb-16 animate-on-scroll animate-scale-fade ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{text.title}</h2>
          <p className="text-lg text-white/50">{text.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {text.plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 animate-on-scroll animate-slide-up ${isVisible ? 'is-visible' : ''} ${
                plan.highlighted ? 'md:scale-105' : ''
              }`}
              style={{
                transitionDelay: `${DELAYS[i]}ms`,
                background: plan.highlighted
                  ? 'linear-gradient(135deg, rgba(20,184,166,0.12), rgba(99,102,241,0.12))'
                  : 'rgba(255,255,255,0.04)',
                border: plan.highlighted
                  ? '1px solid rgba(20,184,166,0.5)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: plan.highlighted
                  ? '0 0 40px rgba(20,184,166,0.15), 0 0 80px rgba(99,102,241,0.1)'
                  : 'none',
              }}
            >
              {plan.highlighted && (
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                  style={{ background: 'rgba(20,184,166,0.15)', color: '#14b8a6', border: '1px solid rgba(20,184,166,0.3)' }}
                >
                  ★ {text.badge}
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div
                className="text-3xl font-bold mb-1"
                style={{
                  background: plan.highlighted ? 'linear-gradient(135deg, #14b8a6, #6366f1)' : 'none',
                  WebkitBackgroundClip: plan.highlighted ? 'text' : 'unset',
                  WebkitTextFillColor: plan.highlighted ? 'transparent' : '#14b8a6',
                }}
              >
                {plan.price}
              </div>
              <p className="text-white/40 mb-8">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-white/70">
                    <span style={{ color: '#14b8a6' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onSelectPlan(plan.name)}
                className="w-full border-0"
                style={
                  plan.highlighted
                    ? { background: 'linear-gradient(135deg, #0d9488, #4f46e5)', color: '#fff' }
                    : { background: 'rgba(20,184,166,0.12)', color: '#14b8a6', border: '1px solid rgba(20,184,166,0.3)' }
                }
              >
                {text.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
