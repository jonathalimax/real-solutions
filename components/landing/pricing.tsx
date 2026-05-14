interface PricingProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': {
    title: 'Planos sob medida',
    subtitle: 'Cada projeto é único, cada orçamento também',
    plans: [
      {
        name: 'Starter',
        price: 'A partir de R$ 15k',
        description: 'Perfeito para MVPs e projetos pequenos',
        features: ['Landing page', 'Formulário de contato', 'SEO básico', '1 mês suporte'],
      },
      {
        name: 'Growth',
        price: 'A partir de R$ 45k',
        description: 'Para negócios em crescimento',
        features: ['Website completo', 'E-commerce básico', 'Integrações', '3 meses suporte'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Customizado',
        description: 'Soluções completas e escaláveis',
        features: ['App nativo', 'Backend complexo', 'Automações', 'Suporte dedicado'],
      },
    ],
  },
  en: {
    title: 'Custom plans',
    subtitle: 'Every project is unique, every budget too',
    plans: [
      {
        name: 'Starter',
        price: 'Starting from $3k',
        description: 'Perfect for MVPs and small projects',
        features: ['Landing page', 'Contact form', 'Basic SEO', '1 month support'],
      },
      {
        name: 'Growth',
        price: 'Starting from $9k',
        description: 'For growing businesses',
        features: ['Complete website', 'Basic e-commerce', 'Integrations', '3 months support'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Complete and scalable solutions',
        features: ['Native app', 'Complex backend', 'Automations', 'Dedicated support'],
      },
    ],
  },
}

export default function Pricing({ language }: PricingProps) {
  const text = content[language]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {text.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {text.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {text.plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-8 border ${
                plan.highlighted
                  ? 'border-primary/50 bg-primary/10 transform md:scale-105'
                  : 'border-border/50 bg-background'
              }`}
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>
              <div className="text-3xl font-bold text-primary mb-4">
                {plan.price}
              </div>
              <p className="text-muted-foreground mb-8">
                {plan.description}
              </p>

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
