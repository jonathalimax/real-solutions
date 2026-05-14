'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import AdminHeader from '@/components/admin/header'
import Metrics from '@/components/admin/metrics'
import LeadsTable from '@/components/admin/leads-table'

export default function AdminDashboard() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated via session cookie
    const checkAuth = async () => {
      try {
        // Check if admin_session cookie exists
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
          const [key, value] = cookie.split('=')
          acc[key] = value
          return acc
        }, {} as Record<string, string>)

        if (cookies['auth_token']) {
          setAuthenticated(true)
        } else {
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Auth check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your leads and content</p>
        </div>

        <Metrics />

        <div className="mt-12">
          <LeadsTable />
        </div>
      </main>
    </div>
  )
}
