interface FeaturedProjectProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': {
    title: 'Projeto em destaque',
    subtitle: 'Realwise - Sistema Financeiro Digital',
    description: 'Plataforma financeira completa com gestão de receitas, despesas, investimentos e planejamento. Tudo em um só lugar para você controlar seu dinheiro.',
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
    features: [
      { title: 'Full Management', items: ['Income and expenses', 'Card control', 'Statement import'] },
      { title: 'Investments', items: ['Track stocks', 'B3 integration', 'Portfolio analysis'] },
      { title: 'Planning', items: ['Budgets', 'Savings goals', 'Trend analysis'] },
    ],
  },
}

export default function FeaturedProject({ language }: FeaturedProjectProps) {
  const text = content[language]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-secondary/50 border border-border/50 rounded-lg aspect-video flex items-center justify-center">
            <a 
              href="https://realwise.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center hover:opacity-80 transition-opacity"
            >
              <span className="text-muted-foreground text-lg font-semibold">
                Realwise
              </span>
              <p className="text-sm text-muted-foreground mt-2">Visite o projeto</p>
            </a>
          </div>

          <div>
            <span className="text-sm font-medium text-primary">
              {text.title}
            </span>
            <h2 className="text-4xl font-bold text-foreground my-4">
              {text.subtitle}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {text.description}
            </p>

            <div className="space-y-6">
              {text.features.map((feature) => (
                <div key={feature.title} className="border border-border/50 rounded-lg p-4 bg-secondary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                  <ul className="space-y-2">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary font-bold mt-1">•</span>
                        <span>{item}</span>
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
