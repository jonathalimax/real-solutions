'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Lead {
  id: string
  phone_number: string
  service: string
  status: string
  created_at: string
}

const statuses = ['new', 'contacted', 'negotiation', 'closed']

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setLeads(data)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include',
      })

      if (response.ok) {
        // Update local state
        setLeads(leads.map(lead =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        ))
      }
    } catch (error) {
      console.error('Error updating lead:', error)
    }
  }

  const filteredLeads = filterStatus !== 'all'
    ? leads.filter(lead => lead.status === filterStatus)
    : leads

  const openWhatsApp = (phoneNumber: string) => {
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    const waLink = `https://wa.me/${cleanPhone}`
    window.open(waLink, '_blank')
  }

  if (loading) {
    return <div className="text-foreground">Loading leads...</div>
  }

  return (
    <div>
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Filter by Status
          </label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto border border-border/50 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-secondary/20">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Service
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Created
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No leads found
                </td>
              </tr>
            ) : (
              filteredLeads.map(lead => (
                <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/10">
                  <td className="px-6 py-4 text-sm text-foreground font-mono">
                    {lead.phone_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {lead.service}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Select
                      value={lead.status}
                      onValueChange={(value) => updateLeadStatus(lead.id, value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openWhatsApp(lead.phone_number)}
                    >
                      WhatsApp
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
