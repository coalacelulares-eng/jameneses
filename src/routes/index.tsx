import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame, Gem, Trophy, Smartphone, Brain, Sparkles } from "lucide-react";
import logo from "@/assets/pp/logo.png.asset.json";
import { SiteHeader } from "@/components/pp/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Planeta Poliglota | Aprenda idiomas de graça e de forma divertida" },
      { name: "description", content: "O jeito divertido, gratuito e eficaz de aprender inglês, espanhol, francês e muito mais. Lições curtas no seu ritmo." },
      { property: "og:title", content: "Planeta Poliglota | Cursos de Idiomas Online" },
      { property: "og:description", content: "Lições curtas, divertidas e eficazes para aprender um novo idioma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});

const LANGS = [
  { flag: "🇺🇸", name: "Inglês" },
  { flag: "🇪🇸", name: "Espanhol" },
  { flag: "🇫🇷", name: "Francês" },
  { flag: "🇩🇪", name: "Alemão" },
  { flag: "🇮🇹", name: "Italiano" },
  { flag: "🇯🇵", name: "Japonês" },
  { flag: "🇰🇷", name: "Coreano" },
  { flag: "🇨🇳", name: "Mandarim" },
];

const FEATURES = [
  { icon: Sparkles, color: "text-secondary", title: "divertido. gratuito. eficaz.", text: "Aprender com o Planeta Poliglota é divertido. Com lições curtas, você ganha pontos, desbloqueia níveis e desenvolve a comunicação de verdade." },
  { icon: Brain, color: "text-primary", title: "baseado em ciência", text: "Combinamos métodos de ensino comprovados com conteúdo pensado para fixar vocabulário, gramática e pronúncia." },
  { icon: Flame, color: "text-accent", title: "motivação de sobra", text: "Ofensivas diárias, recompensas e lembretes amigáveis ajudam você a criar o hábito de estudar todos os dias." },
  { icon: Trophy, color: "text-secondary", title: "aprendizado personalizado", text: "As lições se adaptam ao seu nível, revisando o que você precisa no momento certo." },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-24">
        <motion.img
          src={logo.url}
          alt="Planeta Poliglota"
          className="mx-auto w-72 md:w-[26rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ y: { repeat: Infinity, duration: 4 }, opacity: { duration: 0.5 } }}
        />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-3xl font-black leading-tight md:text-4xl">
            O jeito divertido, gratuito e eficaz de aprender um novo idioma!
          </h1>
          <div className="mx-auto mt-8 flex max-w-xs flex-col gap-3">
            <Link to="/auth" search={{ mode: "signup" }} className="btn-pop shadow-secondary-pop bg-secondary py-3.5 text-secondary-foreground">
              Comece agora
            </Link>
            <Link to="/auth" className="btn-pop shadow-border-pop border-2 border-border bg-background py-3 text-primary">
              Já tenho uma conta
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="border-y-2 border-border">
        <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-5">
          {LANGS.map((l) => (
            <Link key={l.name} to="/auth" search={{ mode: "signup" }} className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 font-extrabold uppercase text-muted-foreground hover:bg-muted">
              <span className="text-2xl" aria-hidden>{l.flag}</span>
              {l.name}
            </Link>
          ))}
        </div>
      </section>

      {FEATURES.map((f, i) => (
        <section key={f.title} className="mx-auto max-w-5xl px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col items-center gap-10 md:flex-row ${i % 2 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="flex-1 text-center md:text-left">
              <h2 className={`text-4xl font-black md:text-5xl ${f.color}`}>{f.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{f.text}</p>
            </div>
            <div className="flex flex-1 justify-center">
              <div className="flex h-56 w-56 items-center justify-center rounded-[3rem] bg-muted">
                <f.icon className={`h-28 w-28 ${f.color}`} strokeWidth={2.2} />
              </div>
            </div>
          </motion.div>
        </section>
      ))}

      <section className="bg-primary py-20 text-center text-primary-foreground">
        <Smartphone className="mx-auto h-14 w-14" />
        <h2 className="mx-auto mt-4 max-w-2xl px-4 text-4xl font-black md:text-5xl">aprenda quando e onde quiser</h2>
        <p className="mx-auto mt-4 max-w-xl px-4 text-lg opacity-90">
          Estude no computador ou no celular. Seu progresso fica salvo na sua conta.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 text-lg font-extrabold">
          <span className="flex items-center gap-1"><Flame className="text-accent" /> Ofensivas</span>
          <span className="flex items-center gap-1"><Gem className="text-accent" /> Gemas</span>
          <span className="flex items-center gap-1"><Trophy className="text-accent" /> Ligas</span>
        </div>
      </section>

      <section className="py-24 text-center">
        <h2 className="text-4xl font-black text-primary md:text-5xl">aprenda um idioma com o Planeta Poliglota</h2>
        <Link to="/auth" search={{ mode: "signup" }} className="btn-pop shadow-secondary-pop mt-10 inline-block bg-secondary px-12 py-4 text-secondary-foreground">
          Comece agora
        </Link>
      </section>

      <footer className="bg-secondary py-10 text-center text-sm font-bold text-secondary-foreground">
        © {new Date().getFullYear()} Planeta Poliglota — Cursos de Idiomas Online
      </footer>
    </div>
  );
}
