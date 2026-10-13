import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({ mode: z.enum(["login", "signup"]).optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Entrar | Planeta Poliglota" },
      { name: "description", content: "Entre ou crie seu perfil no Planeta Poliglota para começar a aprender idiomas." },
      { property: "og:title", content: "Entrar | Planeta Poliglota" },
      { property: "og:description", content: "Acesse sua conta e continue aprendendo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const credSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "A senha precisa ter ao menos 6 caracteres").max(72),
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    const parsed = credSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }
    setLoading(true);
    const { error } = isSignup
      ? await supabase.auth.signUp({ ...parsed.data, options: { emailRedirectTo: window.location.origin } })
      : await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (error) {
      toast.error(isSignup ? "Não foi possível criar a conta." : "E-mail ou senha incorretos.");
      return;
    }
    toast.success(isSignup ? "Conta criada!" : "Bem-vindo de volta!");
    navigate({ to: "/aprender" });
  }

  const input = "w-full rounded-2xl border-2 border-border bg-muted px-4 py-3.5 font-semibold outline-none focus:border-primary";

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="flex items-center justify-between">
        <Link to="/" aria-label="Fechar" className="text-muted-foreground hover:text-foreground"><X size={28} /></Link>
        <Link to="/auth" search={{ mode: isSignup ? "login" : "signup" }} className="btn-pop shadow-border-pop border-2 border-border px-5 py-2.5 text-sm text-primary">
          {isSignup ? "Entrar" : "Cadastre-se"}
        </Link>
      </div>
      <form onSubmit={onSubmit} className="mx-auto mt-16 flex max-w-sm flex-col gap-3">
        <h1 className="mb-4 text-center text-2xl font-black">{isSignup ? "Crie seu perfil" : "Entrar"}</h1>
        <input aria-label="E-mail" type="email" placeholder="E-mail" className={input} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <input aria-label="Senha" type="password" placeholder="Senha" className={input} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isSignup ? "new-password" : "current-password"} />
        <button disabled={loading} className="btn-pop mt-2 bg-primary py-3.5 text-primary-foreground disabled:opacity-60">
          {loading ? "Aguarde..." : isSignup ? "Criar conta" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
