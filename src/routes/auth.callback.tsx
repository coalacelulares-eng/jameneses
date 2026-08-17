import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallback,
})

function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate({ to: '/admin' })
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Autenticando...</h2>
        <p className="text-muted-foreground">Por favor, aguarde enquanto validamos seu acesso.</p>
      </div>
    </div>
  )
}
