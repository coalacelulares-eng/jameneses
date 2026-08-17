import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2, Mail, User, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const Route = createFileRoute('/_authenticated/admin/messages')({
  component: AdminMessages,
})

function AdminMessages() {
  const { data: messages, isLoading } = useQuery({
    queryKey: ['admin', 'messages'],
    queryFn: async () => {
      const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Mensagens de Contato</h1>
        <p className="text-muted-foreground">Veja quem entrou em contato através do formulário do site.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : messages?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Mail size={48} className="mb-4 opacity-20" />
            <p>Nenhuma mensagem recebida ainda.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {messages?.map((msg) => (
            <Card key={msg.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User size={18} className="text-secondary" />
                    {msg.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Mail size={14} />
                    {msg.email}
                  </CardDescription>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} />
                  {msg.created_at && format(new Date(msg.created_at), "dd 'de' MMMM, HH:mm", { locale: ptBR })}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed bg-muted/50 p-4 rounded-lg italic">
                  "{msg.message}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
