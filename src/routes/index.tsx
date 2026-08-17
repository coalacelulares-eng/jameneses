import { createFileRoute } from "@tanstack/react-router";
import { Search, Home, Building2, Key, ArrowRight, Instagram, Facebook, Phone, Loader2, Clock, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { sendMessage } from "@/lib/contact.functions";
import storeFrontAsset from "@/assets/store-front.png.asset.json";
import moemaAptAsset from "@/assets/moema-apt.png.asset.json";
import useEmblaCarousel from 'embla-carousel-react';

export const Route = createFileRoute("/")({
  component: Index,
});

async function fetchProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) throw error;
  return data;
}


function PropertyCard({ property }: { property: any }) {
  const whatsappNumber = property.whatsapp_number || "5511959213175";
  const message = encodeURIComponent(`Olá, vi o imóvel "${property.title}" no site e gostaria de mais informações.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.image_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"} 
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
          {property.tag || "Aluguel"}
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-1 text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{property.title}</h3>
        <p className="mb-4 text-xl font-bold text-primary">{property.price}</p>
        <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Home size={16} />
            <span>{property.beds || 0} Qts</span>
          </div>
          <div className="flex items-center gap-1">
            <Building2 size={16} />
            <span>{property.baths || 0} Ban</span>
          </div>
          <div className="flex items-center gap-1">
            <Key size={16} />
            <span>{property.sqft || "N/A"}</span>
          </div>
        </div>
        
        {property.description && (
          <p className="mt-4 text-xs text-muted-foreground line-clamp-2 italic">
            {property.description}
          </p>
        )}

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary/5 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          Tenho Interesse
          <ArrowRight size={16} />
        </a>
      </div>
    </motion.div>
  );
}


function Index() {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  
  const contactMutation = useMutation({
    mutationFn: (data: { name: string; email: string; message: string }) => sendMessage({ data }),
    onSuccess: () => {

      toast.success("Mensagem enviada com sucesso!");
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao enviar mensagem.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-primary px-4 pt-20 pb-32 text-primary-foreground">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Business Background" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
              Encontre o <span className="text-secondary">imóvel ideal</span> <br /> 
              para o seu estilo de vida
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
              Há anos conectando pessoas aos melhores lares em São Paulo. 
              Segurança, transparência e agilidade em cada aluguel.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-12 rounded-2xl bg-background p-4 shadow-2xl md:p-6"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="flex flex-col text-left">
                <label className="mb-1 px-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tipo</label>
                <select className="w-full bg-transparent p-2 text-sm font-semibold text-foreground focus:outline-none">
                  <option>Todos os Tipos</option>
                  <option>Apartamentos</option>
                  <option>Casas</option>
                  <option>Comercial</option>
                </select>
              </div>
              <div className="flex flex-col text-left">
                <label className="mb-1 px-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Localização</label>
                <input 
                  type="text" 
                  placeholder="Bairro ou CEP" 
                  className="w-full bg-transparent p-2 text-sm font-semibold text-foreground focus:outline-none"
                />
              </div>
              <div className="flex flex-col text-left">
                <label className="mb-1 px-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Valor Máximo</label>
                <select className="w-full bg-transparent p-2 text-sm font-semibold text-foreground focus:outline-none">
                  <option>Qualquer Valor</option>
                  <option>Até R$ 2.000</option>
                  <option>Até R$ 5.000</option>
                  <option>Acima de R$ 5.000</option>
                </select>
              </div>
              <button className="flex h-full w-full items-center justify-center gap-2 rounded-xl bg-secondary px-8 py-4 font-bold text-secondary-foreground transition-all hover:scale-[1.02] hover:shadow-lg">
                <Search size={20} />
                Buscar
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="imoveis" className="bg-background py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Novidades</h2>
            <h3 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">Imóveis para Alugar</h3>
            <div className="mt-4 h-1.5 w-20 rounded-full bg-secondary"></div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {properties?.map((property: any) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center" />

        </div>
      </section>

      {/* About Us */}
      <section id="sobre" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl bg-muted aspect-square md:aspect-auto">
                <img 
                  src={storeFrontAsset.url} 
                  alt="Nossa Sede" 
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-secondary p-8 shadow-xl hidden md:block">
                <span className="block text-4xl font-black text-secondary-foreground">15+</span>
                <span className="text-sm font-bold uppercase tracking-wider text-secondary-foreground/70">Anos de Experiência</span>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Nossa História</h2>
              <h3 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">Tradição e Modernidade na Imobiliária J.A Meneses</h3>
              <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
                Nascemos com o propósito de simplificar a jornada de quem busca um novo lar. Acreditamos que o aluguel deve ser um processo ágil, seguro e humanizado.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Nossa equipe é altamente qualificada para oferecer as melhores opções que se encaixam no seu perfil financeiro e pessoal, sempre priorizando a transparência.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-8 border-t pt-10">
                <div>
                  <h4 className="font-bold text-foreground">Missão</h4>
                  <p className="mt-2 text-sm text-muted-foreground">Conectar pessoas aos seus lares com excelência e ética.</p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Visão</h4>
                  <p className="mt-2 text-sm text-muted-foreground">Ser referência em gestão imobiliária em toda São Paulo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Call to Action */}
      <section className="bg-muted py-20 px-4">
        <div className="mx-auto max-w-5xl rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-xl md:p-16">
          <h2 className="text-3xl font-bold md:text-4xl">Nos siga nas redes sociais</h2>
          <p className="mt-4 text-primary-foreground/70">Acompanhe novos lançamentos e dicas exclusivas diariamente.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <a 
              href="https://www.instagram.com/j.a.menesessp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-background/10 px-6 py-4 transition-all hover:bg-background/20"
            >
              <Instagram size={24} className="text-secondary" />
              <span className="font-bold">Instagram</span>
            </a>
            <a 
              href="https://www.facebook.com/JAMENESESSP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-background/10 px-6 py-4 transition-all hover:bg-background/20"
            >
              <Facebook size={24} className="text-secondary" />
              <span className="font-bold">Facebook</span>
            </a>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contato" className="bg-primary py-24 px-4 text-primary-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Contato</h2>
            <h3 className="mt-4 text-3xl font-extrabold sm:text-4xl">Vamos conversar?</h3>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/70">
              Estamos prontos para tirar suas dúvidas e ajudar você a encontrar seu novo imóvel.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/10 text-secondary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Telefone & WhatsApp</h4>
                  <p className="text-primary-foreground/70">(11) 95921-3175</p>
                </div>
              </div>
              <div className="flex gap-6 text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/10 text-secondary">
                  <Home size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Endereço</h4>
                  <p className="text-primary-foreground/70">Avenida do Oratório, 2642, São Paulo, SP, Brazil</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/10 text-secondary">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Horário de Funcionamento</h4>
                  <p className="text-primary-foreground/70">Segunda a Sexta: 09:00 às 18:00</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl shadow-lg border border-primary-foreground/10 h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.77259695679!2d-46.5492!3d-23.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5d9a9a9a9a9b%3A0x9a9a9a9a9a9a9a9a!2sAv.%20do%20Orat%C3%B3rio%2C%202642%20-%20Vila%20Ivone%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003220-100!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Imobiliária J.A Meneses"
                ></iframe>
              </div>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Seu nome" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-primary-foreground/20 bg-background/5 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                  <input 
                    type="email" 
                    placeholder="seu@email.com" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-primary-foreground/20 bg-background/5 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>
                <textarea 
                  placeholder="Como podemos ajudar?" 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-primary-foreground/20 bg-background/5 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                ></textarea>
                <button 
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full rounded-xl bg-secondary py-4 font-bold text-secondary-foreground transition-all hover:bg-secondary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {contactMutation.isPending && <Loader2 className="animate-spin h-5 w-5" />}
                  {contactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/5511959213175" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform hover:scale-110 active:scale-95"
      >
        <Phone size={32} />
      </a>
    </div>
  );
}

function TestimonialsCarousel() {
  const [emblaRef] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const testimonials = [
    {
      name: "Ricardo Silva",
      text: "Excelente atendimento, profissionais muito competentes e atenciosos. Recomendo com certeza para quem busca aluguel sem burocracia.",
      rating: 5,
      date: "Facebook Review"
    },
    {
      name: "Maria Oliveira",
      text: "A J.A Meneses me ajudou a encontrar o apartamento perfeito na Vila Prudente. Processo rápido e transparente. Nota 10!",
      rating: 5,
      date: "Facebook Review"
    },
    {
      name: "Carlos Eduardo",
      text: "Imobiliária séria e comprometida. Fui muito bem atendido desde a primeira visita até a assinatura do contrato. Parabéns pela equipe.",
      rating: 5,
      date: "Facebook Review"
    },
    {
      name: "Ana Beatriz",
      text: "Encontrei meu apartamento em Moema através deles. O suporte jurídico e a clareza nas informações foram fundamentais. Recomendo muito!",
      rating: 5,
      date: "Facebook Review"
    },
    {
      name: "Juliana Mendes",
      text: "Estou muito satisfeita com o aluguel do meu ponto comercial. A equipe da J.A Meneses é extremamente profissional.",
      rating: 5,
      date: "Facebook Review"
    },
    {
      name: "Marcos Paulo",
      text: "Atendimento diferenciado. Fui em várias imobiliárias em São Paulo, mas só aqui senti segurança de verdade para fechar negócio.",
      rating: 5,
      date: "Facebook Review"
    }
  ];

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative h-full rounded-2xl bg-background p-8 shadow-sm border border-border"
            >
              <Quote className="absolute top-6 right-8 h-8 w-8 text-secondary/20" />
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-secondary text-secondary" />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                <span className="text-xs text-muted-foreground">{testimonial.date}</span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

