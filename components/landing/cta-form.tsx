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
}

const content = {
  'pt-BR': {
    title: 'Pronto para crescer?',
    subtitle: 'Deixe seus dados que entramos em contato',
    service: 'Que serviço você precisa?',
    phone: 'Seu WhatsApp',
    cta: 'Começar conversa',
    services: [
      { value: 'Aplicativo', label: 'Aplicativo Mobile' },
      { value: 'Website', label: 'Website' },
      { value: 'Automação', label: 'Automação' },
      { value: 'Bot de WhatsApp', label: 'Bot de WhatsApp' },
      { value: 'Consultoria', label: 'Consultoria' },
    ],
    whatsappMessage: 'Oi, vim pelo site e quero melhorar meu negócio',
  },
  en: {
    title: 'Ready to grow?',
    subtitle: 'Leave your details and we&apos;ll get in touch',
    service: 'What service do you need?',
    phone: 'Your WhatsApp',
    cta: 'Start conversation',
    services: [
      { value: 'Aplicativo', label: 'Mobile App' },
      { value: 'Website', label: 'Website' },
      { value: 'Automação', label: 'Automation' },
      { value: 'Bot de WhatsApp', label: 'WhatsApp Bot' },
      { value: 'Consultoria', label: 'Consulting' },
    ],
    whatsappMessage: 'Hi, I found you on the website and want to improve my business',
  },
}

export default function CTAForm({ language }: CTAFormProps) {
  const text = content[language]
  const [service, setService] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

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
        // Redirect to WhatsApp
        const phoneNumber = phone.replace(/\D/g, '')
        const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text.whatsappMessage)}`
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
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {text.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {text.subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-border/50 rounded-lg p-8 bg-secondary/20"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {text.service}
              </label>
              <Select value={service || 'placeholder'} onValueChange={(val) => val !== 'placeholder' && setService(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={text.service} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placeholder" disabled>
                    {text.service}
                  </SelectItem>
                  {text.services.map((svc) => (
                    <SelectItem key={svc.value} value={svc.value}>
                      {svc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {text.phone}
              </label>
              <Input
                type="tel"
                placeholder="+55 11 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {language === 'pt-BR'
                  ? 'Você será redirecionado para WhatsApp após enviar'
                  : 'You will be redirected to WhatsApp after sending'}
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
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
            >
              {loading ? (language === 'pt-BR' ? 'Enviando...' : 'Sending...') : text.cta}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
