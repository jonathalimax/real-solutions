'use client'

import { useInView } from '@/hooks/use-in-view'

interface HowItWorksProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': [
    { number: '01', title: 'Consultoria', description: 'Entendemos seu negócio e desafios' },
    { number: '02', title: 'Planejamento', description: 'Criamos um roadmap personalizado' },
    { number: '03', title: 'Execução', description: 'Desenvolvemos com excelência' },
  ],
  en: [
    { number: '01', title: 'Consultation', description: 'We understand your business and challenges' },
    { number: '02', title: 'Planning', description: 'We create a personalized roadmap' },
    { number: '03', title: 'Execution', description: 'We develop with excellence' },
  ],
}

const DELAYS = [0, 150, 300] as const

export default function HowItWorks({ language }: HowItWorksProps) {
  const { ref, isVisible } = useInView()
  const steps = content[language]

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className={`text-center mb-16 animate-on-scroll animate-scale-fade ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {language === 'pt-BR' ? 'Como funciona' : 'How it works'}
          </h2>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #14b8a6, #6366f1, transparent)' }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`text-center relative animate-on-scroll animate-slide-up ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${DELAYS[i]}ms` }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(20,184,166,0.2), rgba(99,102,241,0.2))',
                  border: '1px solid rgba(20,184,166,0.4)',
                  boxShadow: '0 0 20px rgba(20,184,166,0.15)',
                }}
              >
                <span
                  className="text-xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #14b8a6, #6366f1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {step.number}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-white/50">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
