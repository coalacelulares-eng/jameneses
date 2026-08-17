import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, MessageSquare, TrendingUp } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { data: propertiesCount } = useQuery({
    queryKey: ['admin', 'stats', 'properties'],
    queryFn: async () => {
      const { count } = await supabase.from('properties').select('*', { count: 'exact', head: true })
      return count || 0
    },
  })

  const { data: messagesCount } = useQuery({
    queryKey: ['admin', 'stats', 'messages'],
    queryFn: async () => {
      const { count } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true })
      return count || 0
    },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Bem-vindo, Admin</h1>
        <p className="text-muted-foreground">Resumo das atividades da Imobiliária J.A Meneses.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-secondary">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Imóveis</CardTitle>
            <Building2 className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{propertiesCount}</div>
            <p className="text-xs text-muted-foreground mt-1 italic">Total no catálogo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-secondary">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Contatos</CardTitle>
            <MessageSquare className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{messagesCount}</div>
            <p className="text-xs text-muted-foreground mt-1 italic">Novas solicitações</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-secondary">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Performance</CardTitle>
            <TrendingUp className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+15%</div>
            <p className="text-xs text-muted-foreground mt-1 italic">Crescimento mensal</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
