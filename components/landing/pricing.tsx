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
        price: 'Let\'s talk',
        description: 'Complete tailored solutions',
        features: ['Mobile apps', 'Complex systems', 'Advanced automation', 'Dedicated support'],
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
