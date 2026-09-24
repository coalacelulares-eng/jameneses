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
import { Phone, Mail, MapPin, Clock, Truck } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import logoAsset from "@/assets/gda/logo.jpg.asset.json";

const WHATSAPP_URL = "https://wa.me/5562981688561?text=" + encodeURIComponent("Olá! Gostaria de solicitar uma cotação de frete com a GDA Log.");

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Logo GDA Log" className="h-12 w-auto rounded-md" />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          <Link to="/" className="text-sm font-medium hover:text-secondary">Início</Link>
          <a href="#frota" className="text-sm font-medium hover:text-secondary">Nossa Frota</a>
          <a href="#servicos" className="text-sm font-medium hover:text-secondary">Serviços</a>
          <a href="#sobre" className="text-sm font-medium hover:text-secondary">Sobre Nós</a>
          <a href="#contato" className="text-sm font-medium hover:text-secondary">Contato</a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d hidden rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-secondary-foreground md:block"
          >
            Cotação Online
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
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="Logo GDA Log" className="h-10 w-auto rounded-md" />
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Transporte rodoviário de cargas com segurança, pontualidade e tecnologia. Sua carga em boas mãos, de Goiânia para todo o Brasil.
            </p>
          </div>
          <div>
            <h4 className="mb-6 font-bold uppercase tracking-wider text-secondary">Links Rápidos</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-secondary">Início</Link></li>
              <li><a href="#frota" className="hover:text-secondary">Nossa Frota</a></li>
              <li><a href="#servicos" className="hover:text-secondary">Serviços</a></li>
              <li><a href="#sobre" className="hover:text-secondary">Quem Somos</a></li>
              <li><a href="#contato" className="hover:text-secondary">Fale Conosco</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 font-bold uppercase tracking-wider text-secondary">Contato</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-secondary" />
                <span>Goiânia, GO — Brasil</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-secondary" />
                <span>(62) 98168-8561</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="shrink-0 text-secondary" />
                <span>Seg - Sex: 08:00 - 18:00</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 font-bold uppercase tracking-wider text-secondary">Dados da Empresa</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <Truck size={18} className="shrink-0 text-secondary" />
                <span>GDA Transportes e Serviços Ltda - EPP</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-secondary" />
                <span>CNPJ: 04.781.346/0001-25</span>
              </li>
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d mt-6 inline-block rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-secondary-foreground"
            >
              Cotação Online
            </a>
          </div>
        </div>
        <div className="mt-16 border-t border-primary-foreground/10 pt-8 text-center text-xs text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} GDA Transportes e Serviços Ltda - EPP. Todos os direitos reservados.</p>
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
      { title: "GDA Log | Transporte de Cargas em Goiânia e Todo o Brasil" },
      { name: "description", content: "GDA Log — Transportadora em Goiânia, GO. Transporte rodoviário de cargas com segurança, pontualidade e frota própria. Solicite sua cotação online." },
      { name: "author", content: "GDA Transportes e Serviços Ltda - EPP" },
      { property: "og:title", content: "GDA Log | Transportadora em Goiânia" },
      { property: "og:description", content: "Transporte rodoviário de cargas com segurança e pontualidade. Cotação online pelo WhatsApp." },
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
