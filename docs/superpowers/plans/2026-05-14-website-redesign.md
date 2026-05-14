# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Real Solutions landing page from a flat grey site into a vibrant dark teal/indigo tech agency site with a working animated background, scroll animations, and trust-building images.

**Architecture:** Dark palette applied via CSS custom properties in `globals.css`; animated background fixed by moving keyframes out of `<style jsx>` into global CSS; scroll animations driven by a single `useInView` hook using `IntersectionObserver`; Pexels images used via direct CDN URLs (works without remotePatterns since `next.config.mjs` already has `images: { unoptimized: true }`).

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, TypeScript, `next/image`, CSS keyframes, IntersectionObserver API

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `app/globals.css` | Modify | Dark palette vars, keyframes, animation utilities, glass-card utility |
| `components/animated-background.tsx` | Rewrite | 5 radial glow orbs, no grid, pure CSS |
| `hooks/use-in-view.ts` | Create | IntersectionObserver hook returning ref + `isVisible` |
| `components/landing/header.tsx` | Modify | Dark glass styling with teal logo accent |
| `components/landing/hero.tsx` | Rewrite | Two-column layout, Pexels image, stats row, gradient title, animations |
| `components/landing/social-proof.tsx` | Rewrite | Testimonial cards with Pexels avatars, glass styling |
| `components/landing/services.tsx` | Modify | Glass cards, colored icon circles, staggered slide-up |
| `components/landing/how-it-works.tsx` | Modify | Teal connector line, gradient step numbers, slide-up |
| `components/landing/featured-project.tsx` | Modify | Pexels image replacing placeholder, teal glow frame |
| `components/landing/differentials.tsx` | Modify | Icon circles, hover glow, staggered slide-up |
| `components/landing/pricing.tsx` | Modify | Glow border on highlighted card, CTA buttons per plan |
| `components/landing/cta-form.tsx` | Modify | Gradient CTA button, teal focus ring on inputs |
| `components/landing/footer.tsx` | Modify | Dark surface, teal brand accent |

---

## Task 1: Update CSS — Palette, Keyframes, Animation Utilities

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace CSS custom properties with the dark teal/indigo palette**

Replace the `:root` block (lines 6–40) in `app/globals.css` with:

```css
:root {
  --background: oklch(0.10 0.025 240);
  --foreground: oklch(0.95 0.01 0);
  --card: oklch(0.13 0.02 240);
  --card-foreground: oklch(0.95 0.01 0);
  --popover: oklch(0.13 0.02 240);
  --popover-foreground: oklch(0.95 0.01 0);
  --primary: oklch(0.65 0.15 185);
  --primary-foreground: oklch(0.10 0.025 240);
  --secondary: oklch(0.16 0.02 240);
  --secondary-foreground: oklch(0.85 0.01 0);
  --muted: oklch(0.20 0.02 240);
  --muted-foreground: oklch(0.55 0.02 240);
  --accent: oklch(0.55 0.18 264);
  --accent-foreground: oklch(0.95 0.01 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.98 0.001 0);
  --border: oklch(0.22 0.02 240);
  --input: oklch(0.18 0.02 240);
  --ring: oklch(0.65 0.15 185);
  --radius: 0.625rem;
  --teal: #14b8a6;
  --indigo: #6366f1;
  --sky: #0ea5e9;
}
```

- [ ] **Step 2: Add keyframes and animation utilities after the `@layer base` block**

Append to the end of `app/globals.css`:

```css
@keyframes float-orb {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
  33%       { transform: translate(30px, -40px) scale(1.1); opacity: 0.45; }
  66%       { transform: translate(-20px, 20px) scale(0.9); opacity: 0.25; }
}

@keyframes pulse-glow {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  50%       { transform: translate(-50%, -50%) scale(1.15); opacity: 0.5; }
}

/* Scroll animation base states */
.animate-on-scroll {
  opacity: 0;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-scale-fade {
  transform: scale(0.95);
  transition-duration: 600ms;
}

.animate-slide-up {
  transform: translateY(30px);
  transition-duration: 500ms;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: none;
}

/* Stagger delays */
.delay-75  { transition-delay: 75ms; }
.delay-150 { transition-delay: 150ms; }
.delay-225 { transition-delay: 225ms; }
.delay-300 { transition-delay: 300ms; }
.delay-375 { transition-delay: 375ms; }

/* Glass card utility */
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-lg);
}
```

- [ ] **Step 3: Verify the build compiles**

```bash
cd /Users/jonathalima/Developer/personal/real-solutions && npx next build 2>&1 | tail -20
```

Expected: No CSS parsing errors. TypeScript errors are suppressed by `ignoreBuildErrors: true`.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "style: dark teal/indigo palette, keyframes, animation utilities"
```

---

## Task 2: Fix AnimatedBackground Component

**Files:**
- Rewrite: `components/animated-background.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Teal orb — top left */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: '-80px',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(20,184,166,0.35) 0%, transparent 70%)',
          animation: 'float-orb 18s ease-in-out infinite',
        }}
      />
      {/* Indigo orb — right side */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: '20%',
          right: '-60px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          animation: 'float-orb 22s ease-in-out infinite reverse',
          animationDelay: '-6s',
        }}
      />
      {/* Sky blue orb — center */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: '50%',
          left: '50%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 70%)',
          animation: 'pulse-glow 14s ease-in-out infinite',
          animationDelay: '-3s',
        }}
      />
      {/* Teal orb — bottom right */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          bottom: '-40px',
          right: '15%',
          width: '360px',
          height: '360px',
          background: 'radial-gradient(circle, rgba(20,184,166,0.25) 0%, transparent 70%)',
          animation: 'float-orb 20s ease-in-out infinite',
          animationDelay: '-10s',
        }}
      />
      {/* Indigo orb — bottom left */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          bottom: '10%',
          left: '-40px',
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
          animation: 'float-orb 16s ease-in-out infinite reverse',
          animationDelay: '-8s',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/animated-background.tsx
git commit -m "fix: rewrite AnimatedBackground — remove broken style jsx, use CSS keyframes"
```

---

## Task 3: Create useInView Hook

**Files:**
- Create: `hooks/use-in-view.ts`

- [ ] **Step 1: Create the hooks directory and file**

```bash
mkdir -p /Users/jonathalima/Developer/personal/real-solutions/hooks
```

- [ ] **Step 2: Write the hook**

```ts
import { useEffect, useRef, useState } from 'react'

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15, ...options })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
```

- [ ] **Step 3: Commit**

```bash
git add hooks/use-in-view.ts
git commit -m "feat: add useInView hook for scroll-triggered animations"
```

---

## Task 4: Update Header

**Files:**
- Modify: `components/landing/header.tsx`

- [ ] **Step 1: Update the header with dark glass styling and teal logo**

Replace the full file content:

```tsx
import { Button } from '@/components/ui/button'

interface HeaderProps {
  language: 'pt-BR' | 'en'
  setLanguage: (lang: 'pt-BR' | 'en') => void
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const scrollToForm = () => {
    document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-md bg-[#0a1628]/80">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#14b8a6] shadow-[0_0_8px_#14b8a6]" />
          <span className="text-xl font-bold text-white tracking-tight">
            Real Solutions
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToForm}
            className="hidden sm:flex border-[#14b8a6]/40 text-[#14b8a6] hover:bg-[#14b8a6]/10 hover:border-[#14b8a6]"
          >
            {language === 'pt-BR' ? 'Começar' : 'Get Started'}
          </Button>

          <div className="flex gap-2 border-l border-white/10 pl-4">
            <button
              onClick={() => setLanguage('pt-BR')}
              className={`text-sm font-medium transition-colors ${
                language === 'pt-BR' ? 'text-[#14b8a6]' : 'text-white/40 hover:text-white/70'
              }`}
            >
              PT
            </button>
            <span className="text-white/20">/</span>
            <button
              onClick={() => setLanguage('en')}
              className={`text-sm font-medium transition-colors ${
                language === 'en' ? 'text-[#14b8a6]' : 'text-white/40 hover:text-white/70'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/header.tsx
git commit -m "style: dark glass header with teal logo accent"
```

---

## Task 5: Rewrite Hero Section

**Files:**
- Rewrite: `components/landing/hero.tsx`

- [ ] **Step 1: Replace the full file**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/hero.tsx
git commit -m "feat: hero two-column layout with image, stats, gradient title, scroll animation"
```

---

## Task 6: Rewrite SocialProof Section

**Files:**
- Rewrite: `components/landing/social-proof.tsx`

- [ ] **Step 1: Replace the full file with testimonial cards**

```tsx
'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'

interface SocialProofProps {
  language: 'pt-BR' | 'en'
}

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
                "{t.quote[language]}"
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
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/social-proof.tsx
git commit -m "feat: social proof testimonial cards with avatars and glass styling"
```

---

## Task 7: Update Services Section

**Files:**
- Modify: `components/landing/services.tsx`

- [ ] **Step 1: Replace the full file**

```tsx
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
              style={{
                transitionDelay: `${DELAYS[i]}ms`,
                '--hover-glow': ICON_COLORS[i],
              } as React.CSSProperties}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ background: `${ICON_COLORS[i]}22`, border: `1px solid ${ICON_COLORS[i]}44` }}
              >
                {service.icon}
              </div>
              <h3
                className="text-xl font-semibold text-white mb-2 group-hover:transition-colors"
                style={{ '--tw-text-opacity': 1 } as React.CSSProperties}
              >
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
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/services.tsx
git commit -m "style: services glass cards with colored icon circles and staggered animation"
```

---

## Task 8: Update HowItWorks Section

**Files:**
- Modify: `components/landing/how-it-works.tsx`

- [ ] **Step 1: Replace the full file**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/how-it-works.tsx
git commit -m "style: how-it-works with gradient connector line and glowing step circles"
```

---

## Task 9: Update FeaturedProject Section

**Files:**
- Modify: `components/landing/featured-project.tsx`

- [ ] **Step 1: Replace the full file**

```tsx
'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'

interface FeaturedProjectProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': {
    title: 'Projeto em destaque',
    subtitle: 'Realwise - Sistema Financeiro Digital',
    description: 'Plataforma financeira completa com gestão de receitas, despesas, investimentos e planejamento. Tudo em um só lugar para você controlar seu dinheiro.',
    visitLabel: 'Visitar projeto →',
    features: [
      { title: 'Gestão Completa', items: ['Receitas e despesas', 'Controle de cartões', 'Importação de extratos'] },
      { title: 'Investimentos', items: ['Acompanhe ações', 'Integração com B3', 'Análise de carteira'] },
      { title: 'Planejamento', items: ['Orçamentos', 'Metas de economia', 'Análise de tendências'] },
    ],
  },
  en: {
    title: 'Featured Project',
    subtitle: 'Realwise - Digital Financial System',
    description: 'Complete financial platform with income, expense, investment and planning management. Everything in one place to control your money.',
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 px-4 sm:px-6 lg:px-8">
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
                border: '1px solid rgba(99,102,241,0.3)',
              }}
            >
              <Image
                src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Realwise financial platform"
                width={800}
                height={533}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, transparent 60%)' }}
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
              {text.title}
            </span>
            <h2 className="text-4xl font-bold text-white my-4">{text.subtitle}</h2>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">{text.description}</p>

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
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/featured-project.tsx
git commit -m "style: featured project with Pexels image, indigo glow frame, split layout"
```

---

## Task 10: Update Differentials Section

**Files:**
- Modify: `components/landing/differentials.tsx`

- [ ] **Step 1: Replace the full file**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/differentials.tsx
git commit -m "style: differentials with icon circles, glow hover, staggered animation"
```

---

## Task 11: Update Pricing Section

**Files:**
- Modify: `components/landing/pricing.tsx`

- [ ] **Step 1: Replace the full file**

```tsx
'use client'

import { useInView } from '@/hooks/use-in-view'
import { Button } from '@/components/ui/button'

interface PricingProps {
  language: 'pt-BR' | 'en'
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
        price: 'R$ 5.000',
        description: 'Perfeito para começar online',
        features: ['Landing page', 'Formulário de contato', 'SEO básico', '1 mês suporte'],
      },
      {
        name: 'Growth',
        price: 'R$ 10.000',
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
        price: 'R$ 5,000',
        description: 'Perfect to start online',
        features: ['Landing page', 'Contact form', 'Basic SEO', '1 month support'],
      },
      {
        name: 'Growth',
        price: 'R$ 10,000',
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

export default function Pricing({ language }: PricingProps) {
  const { ref, isVisible } = useInView()
  const text = content[language]

  const scrollToForm = () => {
    document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' })
  }

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
                  background: plan.highlighted
                    ? 'linear-gradient(135deg, #14b8a6, #6366f1)'
                    : 'none',
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
                onClick={scrollToForm}
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
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/pricing.tsx
git commit -m "style: pricing with teal glow on highlighted plan, gradient CTA buttons"
```

---

## Task 12: Update CTAForm Section

**Files:**
- Modify: `components/landing/cta-form.tsx`

- [ ] **Step 1: Replace only the JSX return (form wrapper and button styling) — keep all logic intact**

Replace the `return` block starting at line 107 with:

```tsx
  return (
    <section
      id="cta-form"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.07) 0%, transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {text.title}
          </h2>
          <p className="text-lg text-white/50">
            {text.subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-8"
          style={{ borderColor: 'rgba(20,184,166,0.2)' }}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                {text.service}
              </label>
              <Select value={service || 'placeholder'} onValueChange={(val) => val !== 'placeholder' && setService(val)}>
                <SelectTrigger className="w-full bg-white/5 border-white/10 text-white focus:border-[#14b8a6] focus:ring-[#14b8a6]/30">
                  <SelectValue placeholder={text.service} />
                </SelectTrigger>
                <SelectContent className="bg-[#0d1b2e] border-white/10">
                  <SelectItem value="placeholder" disabled>
                    {text.service}
                  </SelectItem>
                  {text.services.map((svc) => (
                    <SelectItem key={svc.value} value={svc.value} className="text-white/80 focus:bg-white/10">
                      {svc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                {text.phone}
              </label>
              <Input
                type="tel"
                placeholder="11 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#14b8a6] focus-visible:ring-[#14b8a6]/30"
              />
              <p className="text-xs text-white/30 mt-2">
                {language === 'pt-BR'
                  ? 'Será aberto o WhatsApp com uma mensagem personalizada'
                  : 'WhatsApp will open with a personalized message'}
              </p>
            </div>

            {message && (
              <div className="p-4 bg-destructive/20 text-destructive rounded-lg text-sm">
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full text-white text-lg py-6 border-0 hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #0d9488, #4f46e5)' }}
            >
              {loading ? (language === 'pt-BR' ? 'Enviando...' : 'Sending...') : text.cta}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/cta-form.tsx
git commit -m "style: CTA form glass card, teal focus rings, gradient submit button"
```

---

## Task 13: Update Footer

**Files:**
- Modify: `components/landing/footer.tsx`

- [ ] **Step 1: Replace the full file**

```tsx
interface FooterProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': {
    description: 'Transformamos negócios com soluções digitais de impacto',
    links: [
      { name: 'Serviços', href: '#' },
      { name: 'Portfolio', href: '#' },
      { name: 'Sobre', href: '#' },
      { name: 'Contato', href: '#' },
    ],
    legal: [
      { name: 'Privacidade', href: '#' },
      { name: 'Termos', href: '#' },
    ],
    year: new Date().getFullYear(),
  },
  en: {
    description: 'We transform businesses with impactful digital solutions',
    links: [
      { name: 'Services', href: '#' },
      { name: 'Portfolio', href: '#' },
      { name: 'About', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
    ],
    year: new Date().getFullYear(),
  },
}

export default function Footer({ language }: FooterProps) {
  const text = content[language]

  return (
    <footer className="border-t border-white/8 bg-[#080e1a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#14b8a6] shadow-[0_0_8px_#14b8a6]" />
              <span className="text-lg font-bold text-white">Real Solutions</span>
            </div>
            <p className="text-white/40">{text.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-white/60 mb-4 text-sm uppercase tracking-widest">
              {language === 'pt-BR' ? 'Links' : 'Links'}
            </h4>
            <ul className="space-y-2">
              {text.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/40 hover:text-[#14b8a6] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white/60 mb-4 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-2">
              {text.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/40 hover:text-[#14b8a6] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {text.year} Real Solutions. {language === 'pt-BR' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-[#14b8a6]" />
            <span className="text-xs text-white/20">Powered by Real Solutions</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/footer.tsx
git commit -m "style: footer dark surface with teal brand accent"
```

---

## Task 14: Final Verification

- [ ] **Step 1: Run the dev server and open the site**

```bash
cd /Users/jonathalima/Developer/personal/real-solutions && npm run dev
```

Open http://localhost:3000 and verify:
- Background orbs are visible and animating
- Hero is two-column with the Pexels image on the right
- Gradient title renders correctly
- Scroll down — each section animates in
- Cards have glass styling with colored icon circles
- Pricing highlighted card has glow border
- Footer shows teal dot accent

- [ ] **Step 2: Run build**

```bash
npx next build 2>&1 | tail -30
```

Expected: Build completes successfully.

- [ ] **Step 3: Commit if any last-minute fixes were needed**

```bash
git add -A && git commit -m "fix: post-verification tweaks" 2>/dev/null || echo "nothing to fix"
```
