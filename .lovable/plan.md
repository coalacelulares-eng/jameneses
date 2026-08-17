# Plano de Implementação - Imobiliária J.A Meneses

Criação de um site profissional, moderno e de fácil navegação para a **Imobiliária J.A Meneses**, com foco em exposição de imóveis para aluguel e integração com redes sociais.

## Design e Experiência do Usuário
- Estética moderna inspirada nas imagens fornecidas (azul marinho e dourado/amarelo como cores de destaque).
- Navegação intuitiva com menu fixo e seções claras.
- Design totalmente responsivo (mobile-first).
- Animações suaves de entrada usando Framer Motion.

## Estrutura do Site
- **Hero Section:** Impactante com busca rápida de imóveis.
- **Destaques:** Galeria de imóveis disponíveis para alugar.
- **Sobre Nós:** História e credibilidade da imobiliária.
- **Integração Social:** Links destacados para Instagram e Facebook.
- **Contato/Lead:** Formulário simples e botão flutuante de WhatsApp.

## Detalhes Técnicos
- **Frontend:** React 19 + TanStack Start.
- **Estilização:** Tailwind CSS v4 com sistema de tokens oklch no `src/styles.css`.
- **Componentes:** Shadcn/ui customizados para a marca.
- **Dados:** Estrutura inicial mockada para imóveis, preparada para integração futura com banco de dados.
- **SEO:** Meta tags completas para buscas locais em São Paulo.

## Etapas de Desenvolvimento
1.  **Design System:** Atualizar `src/styles.css` com as cores da marca (Azul Marinho e Amarelo Vibrante).
2.  **Layout Base:** Configurar header e footer globais no `src/routes/__root.tsx`.
3.  **Página Inicial:** Construir as seções Hero, Imóveis e Redes Sociais no `src/routes/index.tsx`.
4.  **Componentes de UI:** Criar cards de imóveis e botões de ação personalizados.
5.  **Refinamento:** Aplicar SEO e animações.