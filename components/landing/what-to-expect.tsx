interface WhatToExpectProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': {
    title: 'O que você pode esperar',
    items: [
      'Reunião inicial detalhada (1h)',
      'Proposta técnica e comercial (3 dias)',
      'Kickoff com seu time (1 semana)',
      'Demo funcional (2 semanas)',
      'Feedback e iteração',
      'Go-live assistido',
      'Suporte pós-lançamento',
      'Analytics e otimizações',
    ],
  },
  en: {
    title: 'What to expect',
    items: [
      'Detailed initial meeting (1h)',
      'Technical and commercial proposal (3 days)',
      'Kickoff with your team (1 week)',
      'Functional demo (2 weeks)',
      'Feedback and iteration',
      'Assisted go-live',
      'Post-launch support',
      'Analytics and optimizations',
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
