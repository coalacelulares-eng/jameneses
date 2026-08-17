import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: AuthComponent,
})

function AuthComponent() {
  const [email, setEmail] = useState('teste@teste.com')
  const [password, setPassword] = useState('imovel2026')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Auto-login on mount if possible
  const handleAutoLogin = async () => {
    setIsLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session) {
      navigate({ to: '/admin' })
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: 'teste@teste.com',
      password: 'imovel2026',
    })

    if (!error) {
      toast.success('Entrando automaticamente...')
      navigate({ to: '/admin' })
    } else {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
      setIsLoading(false)
    } else {
      toast.success('Login realizado com sucesso!')
      navigate({ to: '/admin' })
    }
  }

  return (
    <div className="container flex h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Acesso Administrativo</CardTitle>
          <CardDescription>
            Imobiliária J.A Meneses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              O acesso foi configurado para ser automático.
            </p>
            <Button 
              className="w-full h-12 text-lg" 
              onClick={handleAutoLogin} 
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Entrar no Painel"
              )}
            </Button>
          </div>
        </CardContent>
        <div className="px-6 pb-6">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground italic">
                Acesso Restrito à Equipe
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
