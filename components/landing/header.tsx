import { Button } from '@/components/ui/button'

interface HeaderProps {
  language: 'pt-BR' | 'en'
  setLanguage: (lang: 'pt-BR' | 'en') => void
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const scrollToForm = () => {
    const element = document.getElementById('cta-form')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold text-foreground">
            {language === 'pt-BR' ? 'Real Solutions' : 'Real Solutions'}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToForm}
            className="hidden sm:flex"
          >
            {language === 'pt-BR' ? 'Começar' : 'Get Started'}
          </Button>

          <div className="flex gap-2 border-l border-border/50 pl-4">
            <button
              onClick={() => setLanguage('pt-BR')}
              className={`text-sm font-medium transition-colors ${
                language === 'pt-BR'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              PT
            </button>
            <span className="text-muted-foreground">/</span>
            <button
              onClick={() => setLanguage('en')}
              className={`text-sm font-medium transition-colors ${
                language === 'en'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
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
