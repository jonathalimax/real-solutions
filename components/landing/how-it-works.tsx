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

export default function HowItWorks({ language }: HowItWorksProps) {
  const steps = content[language]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {language === 'pt-BR' ? 'Como funciona' : 'How it works'}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl font-bold text-primary/30 mb-4">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
