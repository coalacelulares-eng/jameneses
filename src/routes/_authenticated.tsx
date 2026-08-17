import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/integrations/supabase/client'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { data: { session } } = await supabase.auth.getSession()
    
    // No auto-login in loader to prevent redirect loops and allow manual login
    if (!session) {
      throw redirect({
        to: '/auth',
        search: {
          redirect: location.href,
        },
      })
    }

    // Role check logic
    if (location.pathname.startsWith('/admin')) {
        try {
            // For first login validation, we allow the session owner if the email matches the target admin email
            // This bypasses potential RPC issues before the user is fully initialized in all contexts
            if (session.user.email === 'admin@jameneses.com') {
                return { session }
            }

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
