interface FooterProps {
  language: 'pt-BR' | 'en'
}

const contact = {
  email: 'contato@arealsolutions.com.br',
  whatsapp: '41992310339',
  whatsappLabel: 'WhatsApp',
}

const content = {
  'pt-BR': {
    description: 'Transformamos negócios com soluções digitais de impacto',
    contactLabel: 'Contato',
    links: [
      { name: 'Serviços', href: '/#services' },
      { name: 'Portfolio', href: '/#featured-project' },
      { name: 'Sobre', href: '/about' },
      { name: 'Contato', href: '/#cta-form' },
    ],
    legal: [
      { name: 'Privacidade', href: '/privacy' },
      { name: 'Termos', href: '/terms' },
    ],
    year: new Date().getFullYear(),
  },
  en: {
    description: 'We transform businesses with impactful digital solutions',
    contactLabel: 'Contact',
    links: [
      { name: 'Services', href: '/#services' },
      { name: 'Portfolio', href: '/#featured-project' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/#cta-form' },
    ],
    legal: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
    ],
    year: new Date().getFullYear(),
  },
}

export default function Footer({ language }: FooterProps) {
  const text = content[language]

  return (
    <footer className="border-t border-white/8 bg-[#080e1a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#14b8a6] shadow-[0_0_8px_#14b8a6]" />
              <span className="text-lg font-bold text-white">Real Solutions</span>
            </div>
            <p className="text-white/40">{text.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-white/60 mb-4 text-sm uppercase tracking-widest">
              Links
            </h4>
            <ul className="space-y-2">
              {text.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/40 hover:text-[#14b8a6] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white/60 mb-4 text-sm uppercase tracking-widest">{text.contactLabel}</h4>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${contact.email}`} className="text-white/40 hover:text-[#14b8a6] transition-colors text-sm">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/55${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#14b8a6] transition-colors text-sm">
                  {contact.whatsappLabel}: ({contact.whatsapp.slice(0, 2)}) {contact.whatsapp.slice(2, 7)}-{contact.whatsapp.slice(7)}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {text.year} Real Solutions. {language === 'pt-BR' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-[#14b8a6]" />
            <span className="text-xs text-white/20">Powered by Real Solutions</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
