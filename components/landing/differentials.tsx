'use client'

import { useInView } from '@/hooks/use-in-view'

interface DifferentialsProps {
  language: 'pt-BR' | 'en'
}

const ICON_COLORS = ['#14b8a6', '#6366f1', '#0ea5e9', '#14b8a6', '#6366f1', '#0ea5e9'] as const

const content = {
  'pt-BR': [
    { icon: '⚡', title: 'Velocidade', description: 'Entrega em sprints de 2 semanas' },
    { icon: '🎯', title: 'Resultado Focado', description: 'Métricas que importam para seu negócio' },
    { icon: '👥', title: 'Time Dedicado', description: 'Arquiteto, dev, designer e PM exclusivos' },
    { icon: '🔒', title: 'Segurança', description: 'Padrões enterprise desde o dia 1' },
    { icon: '💰', title: 'Transparência', description: 'Sem custos ocultos, tudo documentado' },
    { icon: '🚀', title: 'Escalabilidade', description: 'Tecnologia preparada para o crescimento' },
  ],
  en: [
    { icon: '⚡', title: 'Speed', description: 'Delivery in 2-week sprints' },
    { icon: '🎯', title: 'Results-Focused', description: 'Metrics that matter to your business' },
    { icon: '👥', title: 'Dedicated Team', description: 'Architect, dev, designer, and PM exclusive' },
    { icon: '🔒', title: 'Security', description: 'Enterprise standards from day 1' },
    { icon: '💰', title: 'Transparency', description: 'No hidden costs, everything documented' },
    { icon: '🚀', title: 'Scalability', description: 'Technology ready for growth' },
  ],
}

const DELAYS = [0, 75, 150, 225, 300, 375] as const

export default function Differentials({ language }: DifferentialsProps) {
  const { ref, isVisible } = useInView()
  const items = content[language]
  const title = language === 'pt-BR' ? 'Por que escolher a gente' : 'Why choose us'

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className={`text-4xl sm:text-5xl font-bold text-white text-center mb-16 animate-on-scroll animate-scale-fade ${isVisible ? 'is-visible' : ''}`}>
          {title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`glass-card p-8 group hover:scale-[1.02] transition-transform duration-300 animate-on-scroll animate-slide-up ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${DELAYS[i]}ms`, borderColor: `${ICON_COLORS[i]}18` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{
                  background: `${ICON_COLORS[i]}18`,
                  border: `1px solid ${ICON_COLORS[i]}40`,
                  boxShadow: `0 0 12px ${ICON_COLORS[i]}20`,
                }}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/50">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
