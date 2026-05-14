interface FeaturedProjectProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': {
    title: 'Projeto em destaque',
    subtitle: 'Realwise - Plataforma de Imóveis',
    description: 'Aumentamos a taxa de conversão em 340% com redesign e otimização de UX',
    results: [
      { label: 'Aumento em Conversão', value: '+340%' },
      { label: 'Redução de Bounce Rate', value: '-65%' },
      { label: 'ROI em 3 meses', value: '+520%' },
    ],
  },
  en: {
    title: 'Featured Project',
    subtitle: 'Realwise - Real Estate Platform',
    description: 'We increased conversion rate by 340% with redesign and UX optimization',
    results: [
      { label: 'Conversion Increase', value: '+340%' },
      { label: 'Bounce Rate Reduction', value: '-65%' },
      { label: 'ROI in 3 months', value: '+520%' },
    ],
  },
}

export default function FeaturedProject({ language }: FeaturedProjectProps) {
  const text = content[language]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-secondary/50 border border-border/50 rounded-lg aspect-video flex items-center justify-center">
            <span className="text-muted-foreground text-lg">
              {language === 'pt-BR' ? 'Preview do Projeto' : 'Project Preview'}
            </span>
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

            <div className="grid grid-cols-3 gap-4">
              {text.results.map((result) => (
                <div
                  key={result.label}
                  className="border border-border/50 rounded-lg p-4 bg-secondary/20"
                >
                  <div className="text-2xl font-bold text-primary mb-1">
                    {result.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {result.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
