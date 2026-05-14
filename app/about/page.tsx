'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AnimatedBackground from '@/components/animated-background'
import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'
import { useInView } from '@/hooks/use-in-view'

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`animate-on-scroll animate-scale-fade ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

const values = {
  'pt-BR': [
    { icon: '🎯', title: 'Resultado acima de tudo', description: 'Não entregamos código. Entregamos resultados. Cada projeto é medido pelo impacto real no negócio do cliente.' },
    { icon: '⚡', title: 'Velocidade com qualidade', description: 'Processos ágeis e automação com IA permitem entregar rápido sem sacrificar a excelência técnica.' },
    { icon: '🤝', title: 'Parceria de verdade', description: 'Tratamos cada cliente como um parceiro de longo prazo. Seu sucesso é o nosso sucesso.' },
    { icon: '🔍', title: 'Transparência total', description: 'Comunicação clara, sem surpresas. Você sabe exatamente o que está sendo feito e por quê.' },
  ],
  en: [
    { icon: '🎯', title: 'Results above all', description: "We don't deliver code. We deliver results. Every project is measured by real business impact." },
    { icon: '⚡', title: 'Speed with quality', description: 'Agile processes and AI automation allow fast delivery without sacrificing technical excellence.' },
    { icon: '🤝', title: 'Real partnership', description: 'We treat every client as a long-term partner. Your success is our success.' },
    { icon: '🔍', title: 'Full transparency', description: 'Clear communication, no surprises. You always know what is being done and why.' },
  ],
}

const capabilities = {
  'pt-BR': [
    'Aplicativos iOS & Android nativos',
    'Websites e landing pages de alta conversão',
    'Sistemas web e plataformas SaaS',
    'Automação de processos com IA',
    'Bots de WhatsApp e atendimento automatizado',
    'Integrações e APIs',
    'Consultoria técnica e arquitetura de software',
  ],
  en: [
    'Native iOS & Android apps',
    'High-conversion websites and landing pages',
    'Web systems and SaaS platforms',
    'AI-powered process automation',
    'WhatsApp bots and automated support',
    'Integrations and APIs',
    'Technical consulting and software architecture',
  ],
}

const ACCENT_COLORS = ['#14b8a6', '#6366f1', '#0ea5e9', '#14b8a6'] as const

export default function AboutPage() {
  const [language, setLanguage] = useState<'pt-BR' | 'en'>('pt-BR')
  const isPT = language === 'pt-BR'

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header language={language} setLanguage={setLanguage} />

      <main className="relative px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="pt-24 pb-20 mx-auto max-w-4xl text-center">
          <Section>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#14b8a6]/30 bg-[#14b8a6]/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] shadow-[0_0_6px_#14b8a6]" />
              <p className="text-sm text-[#5eead4] font-medium">
                {isPT ? 'Sobre nós' : 'About us'}
              </p>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              {isPT ? 'Tecnologia que' : 'Technology that'}{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #14b8a6, #6366f1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {isPT ? 'transforma negócios' : 'transforms businesses'}
              </span>
            </h1>

            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-8">
              {isPT
                ? 'A Real Solutions nasceu da crença de que qualquer negócio — independente do tamanho — merece acesso a tecnologia de ponta. Unimos velocidade, qualidade e inteligência artificial para entregar soluções que crescem junto com você.'
                : 'Real Solutions was born from the belief that any business — regardless of size — deserves access to cutting-edge technology. We combine speed, quality and artificial intelligence to deliver solutions that grow with you.'}
            </p>

            <Button
              asChild
              style={{ background: 'linear-gradient(135deg, #0d9488, #4f46e5)' }}
              className="text-white border-0 hover:opacity-90 transition-opacity"
              size="lg"
            >
              <Link href="/#cta-form">
                {isPT ? 'Começar um projeto' : 'Start a project'}
              </Link>
            </Button>
          </Section>
        </section>

        {/* Mission */}
        <section className="py-20 mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Section>
              <span className="text-sm font-semibold tracking-widest text-[#14b8a6] uppercase">
                {isPT ? 'Nossa missão' : 'Our mission'}
              </span>
              <h2 className="text-4xl font-bold text-white mt-3 mb-6">
                {isPT
                  ? 'Democratizar o acesso à tecnologia de impacto'
                  : 'Democratize access to impactful technology'}
              </h2>
              <p className="text-white/60 leading-relaxed text-lg">
                {isPT
                  ? 'Muitas empresas ainda dependem de processos manuais, sistemas ultrapassados ou simplesmente não têm presença digital. A Real Solutions existe para mudar isso — com agilidade, transparência e tecnologia que realmente funciona.'
                  : 'Many businesses still depend on manual processes, outdated systems or simply have no digital presence. Real Solutions exists to change that — with agility, transparency and technology that actually works.'}
              </p>
            </Section>

            <Section>
              <div
                className="glass-card p-8 relative overflow-hidden"
                style={{ borderColor: 'rgba(20,184,166,0.2)' }}
              >
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.2), transparent)' }}
                />
                <div className="space-y-6 relative z-10">
                  {[
                    { label: isPT ? 'Projetos entregues' : 'Projects delivered', value: '120+', color: '#14b8a6' },
                    { label: isPT ? 'Clientes satisfeitos' : 'Satisfied clients', value: '98%', color: '#6366f1' },
                    { label: isPT ? 'Anos de experiência' : 'Years of experience', value: '5+', color: '#0ea5e9' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between border-b border-white/8 pb-5 last:border-0 last:pb-0">
                      <span className="text-white/50 text-sm">{stat.label}</span>
                      <span className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        </section>

        {/* How we work */}
        <section className="py-20 mx-auto max-w-7xl">
          <Section className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {isPT ? 'Como trabalhamos' : 'How we work'}
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              {isPT
                ? 'Agentes de IA especializados trabalham como um time completo — sem o custo de um'
                : 'Specialized AI agents work as a complete team — without the cost of one'}
            </p>
          </Section>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: isPT ? 'Arquiteto de IA' : 'AI Architect',
                description: isPT
                  ? 'Define a estrutura técnica ideal para cada projeto, garantindo escalabilidade e qualidade desde o início.'
                  : 'Defines the ideal technical structure for each project, ensuring scalability and quality from the start.',
                color: '#14b8a6',
              },
              {
                icon: '💻',
                title: isPT ? 'Dev de IA' : 'AI Dev',
                description: isPT
                  ? 'Escreve código limpo, testado e de produção — com velocidade muito acima do desenvolvimento tradicional.'
                  : 'Writes clean, tested, production-ready code — at speeds far beyond traditional development.',
                color: '#6366f1',
              },
              {
                icon: '🎨',
                title: isPT ? 'Designer de IA' : 'AI Designer',
                description: isPT
                  ? 'Cria interfaces modernas, acessíveis e centradas no usuário, alinhadas aos objetivos do negócio.'
                  : 'Creates modern, accessible, user-centered interfaces aligned with business goals.',
                color: '#0ea5e9',
              },
            ].map((agent, i) => (
              <Section key={agent.title}>
                <div
                  className="glass-card p-8 h-full"
                  style={{ borderColor: `${agent.color}22` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                    style={{ background: `${agent.color}18`, border: `1px solid ${agent.color}40` }}
                  >
                    {agent.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{agent.title}</h3>
                  <p className="text-white/50 leading-relaxed">{agent.description}</p>
                </div>
              </Section>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-20 mx-auto max-w-7xl">
          <Section className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {isPT ? 'Nossos valores' : 'Our values'}
            </h2>
          </Section>

          <div className="grid md:grid-cols-2 gap-6">
            {values[language].map((v, i) => (
              <Section key={v.title}>
                <div
                  className="glass-card p-8 flex gap-5"
                  style={{ borderColor: `${ACCENT_COLORS[i]}18` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${ACCENT_COLORS[i]}18`, border: `1px solid ${ACCENT_COLORS[i]}40` }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{v.title}</h3>
                    <p className="text-white/50 leading-relaxed">{v.description}</p>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 mx-auto max-w-4xl">
          <Section className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {isPT ? 'O que fazemos' : 'What we do'}
            </h2>
          </Section>
          <Section>
            <div
              className="glass-card p-8"
              style={{ borderColor: 'rgba(99,102,241,0.2)' }}
            >
              <ul className="grid sm:grid-cols-2 gap-3">
                {capabilities[language].map((cap, i) => (
                  <li key={cap} className="flex items-center gap-3 text-white/70">
                    <span style={{ color: ACCENT_COLORS[i % 3] }}>✓</span>
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </section>

        {/* CTA */}
        <section className="py-20 mx-auto max-w-3xl text-center">
          <Section>
            <div
              className="glass-card p-12"
              style={{
                borderColor: 'rgba(20,184,166,0.3)',
                background: 'linear-gradient(135deg, rgba(20,184,166,0.08), rgba(99,102,241,0.08))',
                boxShadow: '0 0 60px rgba(20,184,166,0.1)',
              }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                {isPT ? 'Pronto para transformar seu negócio?' : 'Ready to transform your business?'}
              </h2>
              <p className="text-white/50 text-lg mb-8">
                {isPT
                  ? 'Vamos conversar sobre o seu projeto. Respondemos em até 24h.'
                  : "Let's talk about your project. We respond within 24h."}
              </p>
              <Button
                asChild
                style={{ background: 'linear-gradient(135deg, #0d9488, #4f46e5)' }}
                className="text-white border-0 hover:opacity-90 transition-opacity"
                size="lg"
              >
                <Link href="/#cta-form">
                  {isPT ? 'Começar um projeto' : 'Start a project'}
                </Link>
              </Button>
            </div>
          </Section>
        </section>
      </main>

      <Footer language={language} />
    </div>
  )
}
