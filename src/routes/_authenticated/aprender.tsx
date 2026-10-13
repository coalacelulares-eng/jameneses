import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Flame, Gem, Heart, Star, Lock, Check, LogOut } from "lucide-react";
import logo from "@/assets/pp/logo.png.asset.json";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/aprender")({
  head: () => ({
    meta: [
      { title: "Aprender | Planeta Poliglota" },
      { name: "description", content: "Sua trilha de lições no Planeta Poliglota." },
      { property: "og:title", content: "Aprender | Planeta Poliglota" },
      { property: "og:description", content: "Continue sua trilha de aprendizado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Learn,
});

const UNITS = [
  { title: "Unidade 1 · Cumprimentos", bg: "bg-secondary", lessons: ["done", "done", "current", "locked", "locked"] },
  { title: "Unidade 2 · Comida e bebida", bg: "bg-primary", lessons: ["locked", "locked", "locked", "locked"] },
  { title: "Unidade 3 · Viagens", bg: "bg-accent", lessons: ["locked", "locked", "locked", "locked"] },
] as const;

const OFFSETS = [0, 48, 72, 48, 0, -48, -72, -48];

function Learn() {
  const { session } = Route.useRouteContext();
  const navigate = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b-2 border-border bg-background">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <img src={logo.url} alt="Planeta Poliglota" className="h-12 w-12 object-contain" />
          <div className="flex items-center gap-4 font-extrabold">
            <span className="text-xl" aria-label="Inglês">🇺🇸</span>
            <span className="flex items-center gap-1 text-accent"><Flame size={20} />3</span>
            <span className="flex items-center gap-1 text-primary"><Gem size={20} />500</span>
            <span className="flex items-center gap-1 text-destructive"><Heart size={20} fill="currentColor" />5</span>
            <button onClick={logout} aria-label="Sair" className="text-muted-foreground hover:text-foreground"><LogOut size={20} /></button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-24 pt-6">
        <p className="mb-6 text-center text-sm font-bold text-muted-foreground">Olá, {session?.user.email}</p>
        {UNITS.map((u) => (
          <section key={u.title} className="mb-12">
            <div className={`${u.bg} btn-pop mb-10 cursor-default p-5 normal-case tracking-normal text-primary-foreground`}>
              <h2 className="text-xl font-black">{u.title}</h2>
              <p className="text-sm font-semibold opacity-90">Aprenda frases essenciais</p>
            </div>
            <div className="flex flex-col items-center gap-6">
              {u.lessons.map((state, i) => {
                const Icon = state === "done" ? Check : state === "current" ? Star : Lock;
                const styles =
                  state === "locked"
                    ? "bg-muted text-muted-foreground shadow-border-pop"
                    : `${u.bg} text-primary-foreground ${u.bg === "bg-secondary" ? "shadow-secondary-pop" : u.bg === "bg-accent" ? "shadow-accent-pop" : ""}`;
                return (
                  <button
                    key={i}
                    disabled={state === "locked"}
                    style={{ transform: `translateX(${OFFSETS[i % OFFSETS.length]}px)` }}
                    className={`btn-pop flex h-20 w-20 items-center justify-center !rounded-full ${styles}`}
                    aria-label={`Lição ${i + 1}`}
                  >
                    <Icon size={34} strokeWidth={3} />
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
