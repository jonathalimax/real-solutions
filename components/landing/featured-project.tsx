'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'

interface FeaturedProjectProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': {
    label: 'Fundador do Realwise',
    title: 'Sistema Financeiro Digital',
    visitLabel: 'Visitar projeto →',
    features: [
      { title: 'Gestão Completa', items: ['Receitas e despesas', 'Controle de cartões', 'Importação de extratos'] },
      { title: 'Investimentos', items: ['Acompanhe ações', 'Integração com B3', 'Análise de carteira'] },
      { title: 'Planejamento', items: ['Orçamentos', 'Metas de economia', 'Análise de tendências'] },
    ],
  },
  en: {
    label: 'Founder of Realwise',
    title: 'Digital Financial System',
    visitLabel: 'Visit project →',
    features: [
      { title: 'Full Management', items: ['Income and expenses', 'Card control', 'Statement import'] },
      { title: 'Investments', items: ['Track stocks', 'B3 integration', 'Portfolio analysis'] },
      { title: 'Planning', items: ['Budgets', 'Savings goals', 'Trend analysis'] },
    ],
  },
}

const FEATURE_COLORS = ['#14b8a6', '#6366f1', '#0ea5e9'] as const

export default function FeaturedProject({ language }: FeaturedProjectProps) {
  const { ref, isVisible } = useInView()
  const text = content[language]

  return (
    <section id="featured-project" ref={ref as React.RefObject<HTMLElement>} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`animate-on-scroll animate-slide-up ${isVisible ? 'is-visible' : ''}`}>
            <a
              href="https://realwise.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-2xl overflow-hidden group"
              style={{
                boxShadow: '0 0 40px rgba(99,102,241,0.2), 0 0 80px rgba(20,184,166,0.1)',
              }}
            >
              <Image
                src="/realwise-preview-mobile.png"
                alt="Realwise financial platform"
                width={833}
                height={1800}
                className="w-full h-auto object-cover transition-transform duration-500"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, transparent 60%)' }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card px-4 py-2 inline-block text-[#5eead4] text-sm font-medium">
                  {text.visitLabel}
                </div>
              </div>
            </a>
          </div>

          {/* Text */}
          <div className={`animate-on-scroll animate-scale-fade delay-150 ${isVisible ? 'is-visible' : ''}`}>
            <span className="text-sm font-semibold tracking-widest text-[#14b8a6] uppercase">
              {text.label}
            </span>
            <h2 className="text-4xl font-bold text-white my-4">{text.title}</h2>

            <div className="space-y-4">
              {text.features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="glass-card p-4"
                  style={{ borderColor: `${FEATURE_COLORS[i]}22` }}
                >
                  <h3
                    className="text-sm font-semibold mb-2"
                    style={{ color: FEATURE_COLORS[i] }}
                  >
                    {feature.title}
                  </h3>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {feature.items.map((item) => (
                      <li key={item} className="text-sm text-white/50 flex items-center gap-1.5">
                        <span style={{ color: FEATURE_COLORS[i] }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
