'use client'

import { useEffect, useState } from 'react'

interface Lead {
  id: string
  created_at: string
  phone_number: string
  service: string
  status: string
}

export default function Metrics() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [totalLeads, setTotalLeads] = useState(0)
  const [todayLeads, setTodayLeads] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/leads', {
          method: 'GET',
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          setLeads(data)
          setTotalLeads(data.length)

          // Count today's leads
          const today = new Date().toDateString()
          const todayCount = data.filter((lead: Lead) => {
            const leadDate = new Date(lead.created_at).toDateString()
            return leadDate === today
          }).length
          setTodayLeads(todayCount)
        }
      } catch (error) {
        console.error('Error fetching leads:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [])

  const cards = [
    {
      title: 'Total Leads',
      value: totalLeads,
      description: 'All leads',
    },
    {
      title: 'Today Leads',
      value: todayLeads,
      description: 'New leads today',
    },
  ]

  if (loading) {
    return <div className="text-foreground">Loading metrics...</div>
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="border border-border/50 rounded-lg p-6 bg-secondary/20"
        >
          <div className="text-sm text-muted-foreground">{card.description}</div>
          <div className="text-4xl font-bold text-foreground mt-2">
            {card.value}
          </div>
          <div className="text-lg text-muted-foreground mt-4">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  )
}
