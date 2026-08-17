import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/integrations/supabase/client'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      throw redirect({
        to: '/auth',
        search: {
          redirect: location.href,
        },
      })
    }

    // Opcional: Verificar se o usuário tem a role 'admin' se estiver tentando acessar /admin
    if (location.pathname.startsWith('/admin')) {
        const { data: hasRole } = await supabase.rpc('has_role', { 
            _user_id: session.user.id, 
            _role: 'admin' 
        })
        
        if (!hasRole) {
            // Se não for admin, redireciona para home
            throw redirect({ to: '/' })
        }
    }
    
    return { session }
  },
})
