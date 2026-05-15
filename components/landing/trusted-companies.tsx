'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'

interface TrustedCompaniesProps {
  language: 'pt-BR' | 'en'
}

interface Company {
  name: string
  logoUrl: string
  role: {
    'pt-BR': string
    en: string
  }
  link: string
  accentColor: string
}

const companies: Company[] = [
  {
    name: 'Bradesco',
    logoUrl: '/logos/bradesco.png',
    role: {
      'pt-BR': 'Desenvolvedor iOS',
      en: 'iOS Developer',
    },
    link: 'https://www.bradesco.com.br',
    accentColor: '#f59e0b',
  },
  {
    name: 'Globo',
    logoUrl: '/logos/g1.svg',
    role: {
      'pt-BR': 'Líder Técnico',
      en: 'Technical Leader',
    },
    link: 'https://www.globo.com',
    accentColor: '#0ea5e9',
  },
  {
    name: 'Sword Health',
    logoUrl: '/logos/sword-health.png',
    role: {
      'pt-BR': 'Líder Técnico',
      en: 'Technical Leader',
    },
    link: 'https://www.swordhealth.com',
    accentColor: '#6366f1',
  },
]

export default function TrustedCompanies({ language }: TrustedCompaniesProps) {
  const { ref, isVisible } = useInView()
  const sectionLabel = language === 'pt-BR' ? 'Empresas que confiam em nós' : 'Companies that trust us'

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/8">
      <div className="mx-auto max-w-7xl">
        <p className={`text-center text-sm font-semibold tracking-widest text-[#14b8a6] uppercase mb-10 animate-on-scroll animate-scale-fade ${isVisible ? 'is-visible' : ''}`}>
          {sectionLabel}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {companies.map((company, i) => (
            <a
              key={company.name}
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card p-6 animate-on-scroll animate-slide-up transition-transform hover:scale-105 cursor-pointer ${isVisible ? 'is-visible' : ''}`}
              style={{
                transitionDelay: `${i * 75}ms`,
                borderColor: `${company.accentColor}22`,
              }}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className="rounded-lg overflow-hidden flex-shrink-0 bg-white/5 p-2"
                  style={{ width: 80, height: 80, border: `2px solid ${company.accentColor}66` }}
                >
                  <Image
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-lg">{company.name}</div>
                  <div className="text-sm mt-2" style={{ color: company.accentColor }}>
                    {company.role[language]}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
