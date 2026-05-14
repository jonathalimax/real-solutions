import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Digital Pro',
  description: 'Manage leads and content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}
