import { Button } from '@/components/ui/button'

interface HeaderProps {
  language: 'pt-BR' | 'en'
  setLanguage: (lang: 'pt-BR' | 'en') => void
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const scrollToForm = () => {
    document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-md bg-[#0a1628]/80">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <span className="text-xl font-bold text-white tracking-tight">
          Real Solutions
        </span>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToForm}
            className="hidden sm:flex border-[#14b8a6]/40 text-[#14b8a6] hover:bg-[#14b8a6]/10 hover:border-[#14b8a6]"
          >
            {language === 'pt-BR' ? 'Começar' : 'Get Started'}
          </Button>

          <div className="flex gap-2 border-l border-white/10 pl-4">
            <button
              onClick={() => setLanguage('pt-BR')}
              className={`text-sm font-medium transition-colors ${
                language === 'pt-BR' ? 'text-[#14b8a6]' : 'text-white/40 hover:text-white/70'
              }`}
            >
              PT
            </button>
            <span className="text-white/20">/</span>
            <button
              onClick={() => setLanguage('en')}
              className={`text-sm font-medium transition-colors ${
                language === 'en' ? 'text-[#14b8a6]' : 'text-white/40 hover:text-white/70'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
