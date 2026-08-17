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
  const [email, setEmail] = useState('admin')
  const [password, setPassword] = useState('imovel2026')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Convert short 'admin' to the required email format for Supabase
    const loginEmail = email === 'admin' ? 'admin@jameneses.com' : email
    
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    })

    if (error) {
      toast.error('Erro ao entrar. Verifique suas credenciais.')
      console.error(error)
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
          <CardTitle className="text-2xl font-bold uppercase tracking-tighter text-primary">Área Restrita</CardTitle>
          <CardDescription>
            Imobiliária J.A Meneses
          </CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Usuário
              </label>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Senha
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button 
              type="submit"
              className="w-full h-11 text-base font-semibold transition-all" 
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-xs text-muted-foreground border-t pt-4 bg-muted/50 rounded-b-lg">
          <p>Uso exclusivo da equipe administrativa.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
