import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import logoAsset from "@/assets/logo-v2.png.asset.json";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Logo J.A Meneses" className="h-12 w-auto" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-primary">J.A MENESES</span>
            <span className="text-[10px] font-semibold tracking-widest text-secondary uppercase">Imobiliária</span>
          </div>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          <Link to="/" className="text-sm font-medium hover:text-primary">Início</Link>
          <a href="#imoveis" className="text-sm font-medium hover:text-primary">Imóveis</a>
          <a href="#sobre" className="text-sm font-medium hover:text-primary">Sobre Nós</a>
          <a href="#contato" className="text-sm font-medium hover:text-primary">Contato</a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/5511959213175"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 md:block"
          >
            Falar com Consultor
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-8 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">J.A Meneses</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Sua parceira de confiança no mercado imobiliário. Especialistas em encontrar o lar dos seus sonhos ou o melhor investimento para o seu futuro.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/j.a.menesessp" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/JAMENESESSP" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-6 font-bold uppercase tracking-wider text-secondary">Links Rápidos</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-secondary">Início</Link></li>
              <li><a href="#imoveis" className="hover:text-secondary">Imóveis para Alugar</a></li>
              <li><a href="#sobre" className="hover:text-secondary">Quem Somos</a></li>
              <li><a href="#contato" className="hover:text-secondary">Fale Conosco</a></li>
              <li><Link to="/admin" className="hover:text-secondary opacity-50 text-[10px] mt-4 block">Área Restrita</Link></li>

            </ul>
          </div>
          <div>
            <h4 className="mb-6 font-bold uppercase tracking-wider text-secondary">Contato</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-secondary" />
                <span>São Paulo, SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-secondary" />
                <span>(11) 95921-3175</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-secondary" />
                <span>contato@jameneses.com.br</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 font-bold uppercase tracking-wider text-secondary">Newsletter</h4>
            <p className="mb-4 text-sm text-primary-foreground/70">Receba novidades e ofertas exclusivas.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <button type="submit" className="rounded-md bg-secondary px-4 py-2 text-xs font-bold text-secondary-foreground transition-all hover:bg-secondary/90">
                OK
              </button>
            </form>
          </div>
        </div>
        <div className="mt-16 border-t border-primary-foreground/10 pt-8 text-center text-xs text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Imobiliária J.A Meneses. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar para o Início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Ocorreu um erro
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Você pode tentar recarregar a página ou voltar para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ir para o Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Imobiliária J.A Meneses | Aluguel de Imóveis em São Paulo" },
      { name: "description", content: "Encontre os melhores imóveis para alugar em São Paulo com a Imobiliária J.A Meneses. Atendimento profissional e as melhores oportunidades." },
      { name: "author", content: "J.A Meneses" },
      { property: "og:title", content: "Imobiliária J.A Meneses" },
      { property: "og:description", content: "Encontre os melhores imóveis para alugar em São Paulo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
