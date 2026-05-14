interface ServicesProps {
  language: 'pt-BR' | 'en'
}

const servicesContent = {
  'pt-BR': [
    {
      id: 'app',
      title: 'Aplicativos Mobile',
      description: 'Aplicativos iOS e Android nativos que suas clientes adoram usar',
      icon: '📱',
    },
    {
      id: 'website',
      title: 'Websites de Conversão',
      description: 'Sites modernos que convertem visitantes em clientes',
      icon: '🌐',
    },
    {
      id: 'automation',
      title: 'Automação de Processos',
      description: 'Reduza custos automatizando tarefas repetitivas',
      icon: '⚙️',
    },
    {
      id: 'whatsapp',
      title: 'Bots de WhatsApp',
      description: 'Vendas 24/7 com inteligência artificial',
      icon: '💬',
    },
    {
      id: 'consulting',
      title: 'Consultoria Digital',
      description: 'Estratégia e roadmap para transformação digital',
      icon: '📊',
    },
  ],
  en: [
    {
      id: 'app',
      title: 'Mobile Apps',
      description: 'Native iOS and Android apps your customers love',
      icon: '📱',
    },
    {
      id: 'website',
      title: 'Conversion Websites',
      description: 'Modern sites that convert visitors into clients',
      icon: '🌐',
    },
    {
      id: 'automation',
      title: 'Process Automation',
      description: 'Reduce costs by automating repetitive tasks',
      icon: '⚙️',
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Bots',
      description: '24/7 sales with artificial intelligence',
      icon: '💬',
    },
    {
      id: 'consulting',
      title: 'Digital Consulting',
      description: 'Strategy and roadmap for digital transformation',
      icon: '📊',
    },
  ],
}

export default function Services({ language }: ServicesProps) {
  const services = servicesContent[language]
  const title = language === 'pt-BR' ? 'O que oferecemos' : 'What we offer'

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'pt-BR'
              ? 'Soluções completas para alavancar seu negócio'
              : 'Complete solutions to boost your business'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-border/50 rounded-lg p-8 bg-secondary/20 hover:bg-secondary/40 hover:border-border transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
