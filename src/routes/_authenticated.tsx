import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/integrations/supabase/client'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { data: { session } } = await supabase.auth.getSession()
    
    // Auto-login logic if no session exists
    if (!session) {
      try {
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
      } catch (err) {
        console.error('Auto-login error:', err);
        throw redirect({
          to: '/auth',
          search: {
            redirect: location.href,
          },
        })
      }
    }

    // Role check logic
    if (location.pathname.startsWith('/admin')) {
        try {
            const { data: hasRole, error: roleError } = await supabase.rpc('has_role', { 
                _user_id: session.user.id, 
                _role: 'admin' 
            })
            
            if (roleError || !hasRole) {
                console.warn('User does not have admin role or role check failed');
                throw redirect({ to: '/' })
            }
        } catch (err) {
            console.error('Role verification error:', err);
            throw redirect({ to: '/' })
        }
    }
    
    return { session }
  },
})
