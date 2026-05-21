'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CTAFormProps {
  language: 'pt-BR' | 'en'
  selectedPlan?: string
}

const content = {
  'pt-BR': {
    title: 'Pronto para crescer?',
    subtitle: 'Conte com a gente - responderemos em 24h',
    service: 'O que você precisa?',
    phone: 'Seu WhatsApp (DDD + número)',
    cta: 'Iniciar conversa',
    services: [
      { value: 'Aplicativo', label: 'App Mobile' },
      { value: 'Website', label: 'Website' },
      { value: 'Automação', label: 'Automação de processos' },
      { value: 'Bot', label: 'Bot WhatsApp' },
      { value: 'Consultoria', label: 'Consultoria técnica' },
    ],
    whatsappMessages: {
      'Aplicativo': 'Oi! Gostaria de conhecer melhor as soluções de app mobile para meu negócio',
      'Website': 'Oi! Tenho interesse em um website profissional para minha empresa',
      'Automação': 'Oi! Preciso automatizar processos do meu negócio',
      'Bot': 'Oi! Quero um bot de WhatsApp para melhorar meu atendimento',
      'Consultoria': 'Oi! Gostaria de uma consultoria técnica para meus projetos',
    }
  },
  en: {
    title: 'Ready to grow?',
    subtitle: 'Get in touch - we&apos;ll respond in 24h',
    service: 'What do you need?',
    phone: 'Your WhatsApp (area code + number)',
    cta: 'Start conversation',
    services: [
      { value: 'Aplicativo', label: 'Mobile App' },
      { value: 'Website', label: 'Website' },
      { value: 'Automação', label: 'Process Automation' },
      { value: 'Bot', label: 'WhatsApp Bot' },
      { value: 'Consultoria', label: 'Technical Consulting' },
    ],
    whatsappMessages: {
      'Aplicativo': 'Hi! I\'d like to know more about mobile app solutions for my business',
      'Website': 'Hi! I\'m interested in a professional website for my company',
      'Automação': 'Hi! I need to automate my business processes',
      'Bot': 'Hi! I want a WhatsApp bot to improve my customer service',
      'Consultoria': 'Hi! I\'d like technical consulting for my projects',
    }
  },
}

const PLAN_NAMES = {
  'pt-BR': { Starter: 'Starter', Growth: 'Growth', Customizado: 'Customizado' },
  en: { Starter: 'Starter', Growth: 'Growth', Custom: 'Custom' },
}

export default function CTAForm({ language, selectedPlan }: CTAFormProps) {
  const text = content[language]
  const [activePlan, setActivePlan] = useState(selectedPlan ?? '')
  const [service, setService] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Sync when parent updates selectedPlan (pricing card click)
  if (selectedPlan !== undefined && selectedPlan !== activePlan && selectedPlan !== '') {
    setActivePlan(selectedPlan)
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const planLabels = language === 'pt-BR'
    ? ['Starter', 'Growth', 'Customizado']
    : ['Starter', 'Growth', 'Custom']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!phone || !service) {
      setMessage(language === 'pt-BR' ? 'Preencha todos os campos' : 'Fill all fields')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phone,
          service: service,
        }),
      })

      if (response.ok) {
        // Redirect to WhatsApp with dynamic message based on service
        const phoneNumber = phone.replace(/\D/g, '')
        const message = content[language].whatsappMessages[service as keyof typeof content[typeof language]['whatsappMessages']]
        const waLink = `https://wa.me/55${phoneNumber}?text=${encodeURIComponent(message)}`
        window.location.href = waLink
      } else {
        setMessage(language === 'pt-BR' ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Try again.')
      }
    } catch (error) {
      setMessage(language === 'pt-BR' ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Try again.')
    } finally {
      setLoading(false)
    }
  }

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
            {/* Plan selector */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-3">
                {language === 'pt-BR' ? 'Plano de interesse' : 'Plan of interest'}
              </label>
              <div className="flex gap-2 flex-wrap">
                {planLabels.map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => setActivePlan(plan)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={
                      activePlan === plan
                        ? { background: 'linear-gradient(135deg, #0d9488, #4f46e5)', color: '#fff', border: '1px solid transparent' }
                        : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }
                    }
                  >
                    {plan}
                  </button>
                ))}
              </div>
            </div>

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
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={handlePhoneChange}
                inputMode="numeric"
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
}
