'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'

interface SocialProofProps {
  language: 'pt-BR' | 'en'
}

// Set to true when real client reviews are available
const SHOW_TESTIMONIALS = false

const testimonials = [
  {
    name: 'Ana Beatriz',
    role: 'CEO, Bradesco Cartões',
    quote: {
      'pt-BR': 'A Real Solutions entregou além do esperado. O app superou nossas metas em 3 meses.',
      en: 'Real Solutions delivered beyond expectations. The app exceeded our goals in 3 months.',
    },
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    accentColor: '#14b8a6',
  },
  {
    name: 'Carlos Melo',
    role: 'CTO, Sword Health',
    quote: {
      'pt-BR': 'Automação impecável. Reduzimos custos operacionais em 40% no primeiro trimestre.',
      en: 'Flawless automation. We cut operational costs by 40% in the first quarter.',
    },
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    accentColor: '#6366f1',
  },
  {
    name: 'Fernanda Costa',
    role: 'Head Digital, Globo G1',
    quote: {
      'pt-BR': 'Time dedicado, entrega no prazo e qualidade enterprise. Parceria de longo prazo.',
      en: 'Dedicated team, on-time delivery, enterprise quality. A long-term partnership.',
    },
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    accentColor: '#0ea5e9',
  },
]

export default function SocialProof({ language }: SocialProofProps) {
  const { ref, isVisible } = useInView()
  const label = language === 'pt-BR' ? 'O que nossos clientes dizem' : 'What our clients say'

  if (!SHOW_TESTIMONIALS) return null

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/8">
      <div className="mx-auto max-w-7xl">
        <p className={`text-center text-sm font-semibold tracking-widest text-[#14b8a6] uppercase mb-10 animate-on-scroll animate-scale-fade ${isVisible ? 'is-visible' : ''}`}>
          {label}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`glass-card p-6 animate-on-scroll animate-slide-up ${isVisible ? 'is-visible' : ''}`}
              style={{
                transitionDelay: `${i * 75}ms`,
                borderColor: `${t.accentColor}22`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="rounded-full overflow-hidden flex-shrink-0"
                  style={{ width: 44, height: 44, border: `2px solid ${t.accentColor}66` }}
                >
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role}</div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed italic">
                &ldquo;{t.quote[language]}&rdquo;
              </p>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} style={{ color: t.accentColor }}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
