interface FooterProps {
  language: 'pt-BR' | 'en'
}

const content = {
  'pt-BR': {
    company: 'Digital Pro',
    description: 'Transformamos negócios com soluções digitais de impacto',
    links: [
      { name: 'Serviços', href: '#' },
      { name: 'Portfolio', href: '#' },
      { name: 'Sobre', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Contato', href: '#' },
    ],
    legal: [
      { name: 'Privacidade', href: '#' },
      { name: 'Termos', href: '#' },
    ],
    year: new Date().getFullYear(),
  },
  en: {
    company: 'Digital Pro',
    description: 'We transform businesses with impactful digital solutions',
    links: [
      { name: 'Services', href: '#' },
      { name: 'Portfolio', href: '#' },
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
    ],
    year: new Date().getFullYear(),
  },
}

export default function Footer({ language }: FooterProps) {
  const text = content[language]

  return (
    <footer className="border-t border-border/50 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {text.company}
            </h3>
            <p className="text-muted-foreground">
              {text.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'pt-BR' ? 'Links' : 'Links'}
            </h4>
            <ul className="space-y-2">
              {text.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'pt-BR' ? 'Legal' : 'Legal'}
            </h4>
            <ul className="space-y-2">
              {text.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {text.year} {text.company}. {language === 'pt-BR' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
