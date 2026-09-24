import { createFileRoute } from "@tanstack/react-router";
import {
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Mail,
  Loader2,
  Package,
  Route as RouteIcon,
  Headphones,
  ArrowRight,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { sendMessage } from "@/lib/contact.functions";

import truck1 from "@/assets/gda/truck-1.png.asset.json";
import truck2 from "@/assets/gda/truck-2.png.asset.json";
import truck3 from "@/assets/gda/truck-3.png.asset.json";
import truck4 from "@/assets/gda/truck-4.png.asset.json";
import truck5 from "@/assets/gda/truck-5.png.asset.json";
import truck6 from "@/assets/gda/truck-6.png.asset.json";
import truck7 from "@/assets/gda/truck-7.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "GDA Log | Transportadora de Cargas em Goiânia, GO" },
      {
        name: "description",
        content:
          "Transporte rodoviário de cargas com frota própria, rastreamento e entrega no prazo. GDA Transportes e Serviços Ltda - EPP, Goiânia/GO. Faça sua cotação online.",
      },
      { property: "og:title", content: "GDA Log | Transportadora de Cargas em Goiânia" },
      {
        property: "og:description",
        content: "Frota própria, rastreamento e entrega no prazo. Cotação online pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const WHATSAPP_NUMBER = "5562981688561";
const whatsappUrl = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const COTACAO_URL = whatsappUrl("Olá! Gostaria de solicitar uma cotação de frete com a GDA Log.");

const FLEET = [
  { img: truck1.url, name: "Mercedes-Benz Axor", type: "Cavalo Mecânico — Baú" },
  { img: truck2.url, name: "Volvo FH", type: "Cavalo Mecânico — Sider" },
  { img: truck3.url, name: "Volvo FH Azul", type: "Cavalo Mecânico — Sider" },
  { img: truck4.url, name: "Scania Série R", type: "Cavalo Mecânico — Sider" },
  { img: truck5.url, name: "Volvo FH Globetrotter", type: "Cavalo Mecânico — Graneleiro" },
  { img: truck6.url, name: "Volvo FH Globetrotter", type: "Cavalo Mecânico — Prancha" },
  { img: truck7.url, name: "Scania Série 4", type: "Cavalo Mecânico — Baú" },
];

const SERVICES = [
  {
    icon: RouteIcon,
    title: "Transporte Rodoviário",
    desc: "Cargas fechadas e fracionadas para todas as regiões do Brasil, com rotas planejadas e otimizadas.",
  },
  {
    icon: Package,
    title: "Carga Dedicada",
    desc: "Veículo exclusivo para a sua operação, com agenda de coleta e entrega ajustada ao seu negócio.",
  },
  {
    icon: ShieldCheck,
    title: "Carga Segurada",
    desc: "Mercadoria protegida do embarque à entrega, com gerenciamento de risco e escolta quando necessário.",
  },
  {
    icon: MapPin,
    title: "Rastreamento em Tempo Real",
    desc: "Acompanhe cada etapa do trajeto e receba atualizações sobre a posição da sua carga.",
  },
  {
    icon: Clock,
    title: "Entrega no Prazo",
    desc: "Compromisso com prazos acordados e comunicação transparente em qualquer imprevisto.",
  },
  {
    icon: Headphones,
    title: "Atendimento Dedicado",
    desc: "Equipe pronta para responder rápido, tirar dúvidas e resolver a sua demanda logística.",
  },
];

function FleetCard({ truck, index }: { truck: (typeof FLEET)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className="photo-3d group overflow-hidden rounded-2xl border bg-card shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={truck.img}
          alt={`${truck.name} — frota GDA Log`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-secondary">
          {truck.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{truck.type}</p>
      </div>
    </motion.div>
  );
}

function Index() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const contactMutation = useMutation({
    mutationFn: (data: { name: string; email: string; message: string }) =>
      sendMessage({ data }),
    onSuccess: () => {
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Erro ao enviar mensagem.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-primary px-4 py-24 text-primary-foreground">
        <div className="absolute inset-0 z-0">
          <img
            src={truck5.url}
            alt="Frota GDA Log em operação"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/60" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
              <Truck size={14} /> Goiânia, GO — Todo o Brasil
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Sua carga na <span className="text-secondary">estrada certa</span>, do embarque à entrega
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
              A GDA Log conecta o Centro-Oeste ao Brasil inteiro com frota própria,
              rastreamento em tempo real e um time que trata cada entrega como prioridade.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={COTACAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 text-base font-bold text-secondary-foreground"
              >
                <Phone size={20} />
                Cotação Online
              </a>
              <a
                href="#frota"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-foreground/25 px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:border-secondary hover:text-secondary"
              >
                Conhecer a Frota
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-primary-foreground/15 pt-8">
              <div>
                <span className="block text-3xl font-black text-secondary">7+</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
                  Veículos na frota
                </span>
              </div>
              <div>
                <span className="block text-3xl font-black text-secondary">100%</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
                  Cargas rastreadas
                </span>
              </div>
              <div>
                <span className="block text-3xl font-black text-secondary">BR</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
                  Cobertura nacional
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="hidden lg:block"
          >
            <div className="photo-3d overflow-hidden rounded-3xl border-4 border-secondary/30 shadow-2xl">
              <img
                src={truck3.url}
                alt="Caminhão Volvo da frota GDA Log"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="bg-background px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              O que fazemos
            </h2>
            <h3 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">
              Soluções em Logística e Transporte
            </h3>
            <div className="mt-4 h-1.5 w-20 rounded-full bg-secondary" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="photo-3d group rounded-2xl border bg-card p-8 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/12 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <service.icon size={26} />
                </div>
                <h4 className="mt-6 text-xl font-bold text-foreground">{service.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frota */}
      <section id="frota" className="bg-muted px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              Frota Própria
            </h2>
            <h3 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">
              Conheça Nossos Caminhões
            </h3>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Veículos revisados, motoristas experientes e equipamentos adequados para cada tipo de carga.
            </p>
            <div className="mt-4 h-1.5 w-20 rounded-full bg-secondary" />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FLEET.map((truck, idx) => (
              <FleetCard key={idx} truck={truck} index={idx} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href={COTACAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d inline-flex items-center gap-2 rounded-xl bg-secondary px-10 py-4 text-base font-bold text-secondary-foreground"
            >
              <Phone size={20} />
              Cotação Online
            </a>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="photo-3d overflow-hidden rounded-3xl bg-muted shadow-2xl">
                <img
                  src={truck6.url}
                  alt="Caminhão da GDA Log pronto para viagem"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-secondary p-8 shadow-xl md:block">
                <span className="block text-4xl font-black text-secondary-foreground">GO</span>
                <span className="text-sm font-bold uppercase tracking-wider text-secondary-foreground/80">
                  Base em Goiânia
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                Quem Somos
              </h2>
              <h3 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">
                GDA Transportes e Serviços
              </h3>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                Sediada em Goiânia, a GDA Log atua no transporte rodoviário de cargas com
                estrutura própria e foco total em confiabilidade. Cada rota é planejada para
                que a mercadoria chegue íntegra e dentro do prazo combinado.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Trabalhamos lado a lado com nossos clientes, do primeiro orçamento ao
                comprovante de entrega, com comunicação direta e sem surpresas.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-8 border-t pt-10 sm:grid-cols-2">
                <div>
                  <h4 className="font-bold text-foreground">Missão</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Transportar com segurança e pontualidade, gerando tranquilidade para quem confia na gente.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Visão</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Ser referência em logística rodoviária no Centro-Oeste, com alcance em todo o país.
                  </p>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border bg-card p-6">
                <div className="flex items-start gap-3">
                  <Building2 size={20} className="mt-0.5 shrink-0 text-secondary" />
                  <div className="text-sm">
                    <p className="font-bold text-foreground">GDA Transportes e Serviços Ltda - EPP</p>
                    <p className="mt-1 text-muted-foreground">CNPJ: 04.781.346/0001-25</p>
                    <p className="text-muted-foreground">Goiânia, GO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="bg-primary px-4 py-24 text-primary-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Contato</h2>
            <h3 className="mt-4 text-3xl font-extrabold sm:text-4xl">Solicite sua cotação</h3>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/70">
              Conte o que precisa transportar, de onde e para onde. Respondemos rápido com o melhor frete.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/10 text-secondary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Telefone & WhatsApp</h4>
                  <p className="text-primary-foreground/70">(62) 98168-8561</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/10 text-secondary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Localização</h4>
                  <p className="text-primary-foreground/70">Goiânia, GO — Brasil</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/10 text-secondary">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Horário de Atendimento</h4>
                  <p className="text-primary-foreground/70">Segunda a Sexta: 08:00 às 18:00</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/10 text-secondary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Dados da Empresa</h4>
                  <p className="text-primary-foreground/70">GDA Transportes e Serviços Ltda - EPP</p>
                  <p className="text-primary-foreground/70">CNPJ: 04.781.346/0001-25</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-primary-foreground/10 shadow-lg">
                <iframe
                  src="https://www.google.com/maps?q=Goi%C3%A2nia%2C%20GO%2C%20Brasil&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização GDA Log — Goiânia, GO"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-primary-foreground/10 bg-background/5 p-8">
              <h4 className="text-xl font-bold">Formulário de Contato</h4>
              <p className="mt-2 text-sm text-primary-foreground/60">
                Preencha os dados e retornamos o mais breve possível.
              </p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Seu nome"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-primary-foreground/20 bg-background/5 px-4 py-3 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  required
                  maxLength={255}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-primary-foreground/20 bg-background/5 px-4 py-3 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <textarea
                  placeholder="Descreva sua carga: origem, destino, tipo e peso."
                  rows={5}
                  required
                  maxLength={1000}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-primary-foreground/20 bg-background/5 px-4 py-3 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="btn-3d flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-4 font-bold text-secondary-foreground disabled:opacity-60"
                >
                  {contactMutation.isPending && <Loader2 className="h-5 w-5 animate-spin" />}
                  {contactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>

              <a
                href={COTACAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-navy mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-4 font-bold text-white"
              >
                <Phone size={20} />
                Cotação Online pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp flutuante */}
      <a
        href={COTACAO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Cotação Online pelo WhatsApp"
        className="btn-3d fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-4 font-bold text-white"
      >
        <Phone size={24} />
        <span className="hidden sm:inline">Cotação Online</span>
      </a>
    </div>
  );
}
