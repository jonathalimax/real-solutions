'use client'

import { useInView } from '@/hooks/use-in-view'

interface ServicesProps {
  language: 'pt-BR' | 'en'
}

const ICON_COLORS = ['#14b8a6', '#6366f1', '#0ea5e9', '#14b8a6', '#6366f1'] as const

const servicesContent = {
  'pt-BR': [
    { id: 'app', title: 'Aplicativos Mobile', description: 'Aplicativos iOS e Android nativos que suas clientes adoram usar', icon: '📱' },
    { id: 'website', title: 'Websites de Conversão', description: 'Sites modernos que convertem visitantes em clientes', icon: '🌐' },
    { id: 'automation', title: 'Automação de Processos', description: 'Reduza custos automatizando tarefas repetitivas', icon: '⚙️' },
    { id: 'whatsapp', title: 'Bots de WhatsApp', description: 'Vendas 24/7 com inteligência artificial', icon: '💬' },
    { id: 'consulting', title: 'Consultoria Digital', description: 'Estratégia e roadmap para transformação digital', icon: '📊' },
  ],
  en: [
    { id: 'app', title: 'Mobile Apps', description: 'Native iOS and Android apps your customers love', icon: '📱' },
    { id: 'website', title: 'Conversion Websites', description: 'Modern sites that convert visitors into clients', icon: '🌐' },
    { id: 'automation', title: 'Process Automation', description: 'Reduce costs by automating repetitive tasks', icon: '⚙️' },
    { id: 'whatsapp', title: 'WhatsApp Bots', description: '24/7 sales with artificial intelligence', icon: '💬' },
    { id: 'consulting', title: 'Digital Consulting', description: 'Strategy and roadmap for digital transformation', icon: '📊' },
  ],
}

const DELAYS = [0, 75, 150, 225, 300] as const

export default function Services({ language }: ServicesProps) {
  const { ref, isVisible } = useInView()
  const services = servicesContent[language]
  const title = language === 'pt-BR' ? 'O que oferecemos' : 'What we offer'
  const subtitle = language === 'pt-BR' ? 'Soluções completas para alavancar seu negócio' : 'Complete solutions to boost your business'

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className={`text-center mb-16 animate-on-scroll animate-scale-fade ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</h2>
          <p className="text-lg text-white/50">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`glass-card p-8 group hover:scale-[1.02] transition-transform duration-300 animate-on-scroll animate-slide-up ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${DELAYS[i]}ms` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ background: `${ICON_COLORS[i]}22`, border: `1px solid ${ICON_COLORS[i]}44` }}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-white/50 leading-relaxed">{service.description}</p>
              <div
                className="mt-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${ICON_COLORS[i]}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
