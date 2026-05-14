interface DifferentialsProps {
  language: 'pt-BR' | 'en'
}

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

export default function Differentials({ language }: DifferentialsProps) {
  const items = content[language]
  const title = language === 'pt-BR' ? 'Por que escolher a gente' : 'Why choose us'

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-center mb-16">
          {title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="border border-border/50 rounded-lg p-8 bg-background hover:bg-secondary/30 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
