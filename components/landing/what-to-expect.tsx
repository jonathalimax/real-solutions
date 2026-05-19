interface WhatToExpectProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': {
    title: 'Como funciona nosso processo',
    items: [
      'Entendemos seu negócio em detalhes',
      'Criamos uma proposta clara com investimento (3 dias)',
      'Apresentação do plano e alinhamento',
      'Primeira versão funcional pronta (2 semanas)',
      'Seus feedbacks e ajustes',
      'Sistema pronto para usar',
      'Suporte nos primeiros meses',
      'Acompanhamento e melhorias contínuas',
    ],
  },
  en: {
    title: 'How our process works',
    items: [
      'We understand your business in detail',
      'We create a clear proposal with investment (3 days)',
      'Plan presentation and alignment',
      'First working version ready (2 weeks)',
      'Your feedback and adjustments',
      'System ready to use',
      'Support in the first months',
      'Follow-up and continuous improvements',
    ],
  },
}

export default function WhatToExpect({ language }: WhatToExpectProps) {
  const text = content[language]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-center mb-16">
          {text.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {text.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 border border-border/50 rounded-lg bg-secondary/20"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-sm font-semibold text-primary">
                ✓
              </div>
              <p className="text-lg text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
