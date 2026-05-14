interface SocialProofProps {
  language: 'pt-BR' | 'en'
}

const companies = [
  { name: 'Bradesco', url: 'https://banco.bradesco/html/classic/promocoes/aplicativo-bradesco-cartoes/index.shtm', verified: true },
  { name: 'Globo G1', url: 'https://g1.globo.com/', verified: true },
  { name: 'Sword Health', url: 'https://swordhealth.com/', verified: true },
]

export default function SocialProof({ language }: SocialProofProps) {
  const label = language === 'pt-BR' ? 'Clientes que confiam em nós' : 'Trusted by leading companies'

  return (
    <section className="border-y border-border/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          {label}
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex items-center justify-center h-16 bg-secondary/50 border border-border/50 rounded-lg"
            >
              <span className="text-sm font-medium text-foreground">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
