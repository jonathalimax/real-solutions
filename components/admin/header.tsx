import { Button } from '@/components/ui/button'

interface AdminHeaderProps {
  onLogout: () => void
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="border-b border-border/50 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Digital Pro Admin</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  )
}
