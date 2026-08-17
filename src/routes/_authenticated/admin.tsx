import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { LayoutDashboard, Building2, MessageSquare, LogOut, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Sessão encerrada.')
      navigate({ to: '/' })
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card px-4 py-8 hidden md:block">
        <div className="space-y-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">Painel J.A Meneses</h2>
            <div className="space-y-1">
              <Link
                to="/admin"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent"
                activeProps={{ className: 'bg-accent text-accent-foreground' }}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <Link
                to="/admin/properties"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent"
                activeProps={{ className: 'bg-accent text-accent-foreground' }}
              >
                <Building2 size={18} />
                Gerenciar Imóveis
              </Link>
              <Link
                to="/admin/messages"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent"
                activeProps={{ className: 'bg-accent text-accent-foreground' }}
              >
                <MessageSquare size={18} />
                Mensagens
              </Link>
            </div>
          </div>
          <div className="px-3 py-2 border-t mt-4 pt-4">
            <Link
                to="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent"
            >
                <Home size={18} />
                Ver Site
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 mt-1 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
