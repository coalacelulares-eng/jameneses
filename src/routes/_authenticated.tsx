import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/integrations/supabase/client'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { data: { session } } = await supabase.auth.getSession()
    
    // Auto-login logic if no session exists
    if (!session) {
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: 'teste@teste.com',
        password: 'imovel2026',
      })

      if (loginError || !loginData.session) {
        throw redirect({
          to: '/auth',
          search: {
            redirect: location.href,
          },
        })
      }
      
      return { session: loginData.session }
    }

    // Optional: Verify if the user has the 'admin' role if trying to access /admin
    if (location.pathname.startsWith('/admin')) {
        const { data: hasRole } = await supabase.rpc('has_role', { 
            _user_id: session.user.id, 
            _role: 'admin' 
        })
        
        if (!hasRole) {
            throw redirect({ to: '/' })
        }
    }
    
    return { session }
  },
})
