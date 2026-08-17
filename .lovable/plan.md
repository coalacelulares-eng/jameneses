# Plano de Implementação: Gestão Dinâmica de Imóveis e Contato

Este plano descreve a transição de dados estáticos para um sistema dinâmico utilizando **Lovable Cloud**, incluindo a criação do banco de dados para imóveis e a configuração de notificações de contato.

## 1. Banco de Dados (Lovable Cloud)

Criar uma estrutura robusta para gerenciar o catálogo de imóveis.

- **Tabela `properties`**:
  - `id` (UUID, PK)
  - `title` (Text) - Ex: "Apartamento Moderno - Vila Mariana"
  - `price` (Text) - Ex: "R$ 3.500/mês"
  - `beds` (Integer)
  - `baths` (Integer)
  - `sqft` (Text) - Ex: "75m²"
  - `image_url` (Text)
  - `tag` (Text) - Ex: "Destaque", "Aluguel"
  - `description` (Text)
  - `whatsapp_number` (Text) - Opcional, por imóvel
  - `created_at` / `updated_at`

## 2. Gestão Dinâmica no Frontend

Substituir os dados mockados por chamadas ao banco de dados.

- Criar um hook `useProperties` utilizando **TanStack Query** para buscar os dados.
- Atualizar o componente `PropertyCard` para usar os dados do banco.
- Implementar carregamento (Skeletons) e estados vazios.

## 3. Sistema de Contato

Configurar o recebimento de mensagens.

- **Tabela `contact_messages`**: Armazenar as mensagens enviadas pelo formulário para histórico e auditoria.
- **Notificação**: Utilizar uma **TanStack Server Function** para processar o envio. Como padrão, as mensagens serão salvas no banco e poderão ser visualizadas no painel administrativo do Lovable Cloud.
- **WhatsApp**: Manter e validar o botão flutuante para contato direto.

## 4. Fotos Reais (Instagram)

- As fotos iniciais serão substituídas por URLs reais extraídas das postagens do Instagram da J.A Meneses conforme fornecido (links de referência).

## Detalhes Técnicos

- **Segurança**: Habilitar RLS (Row Level Security) em todas as tabelas.
  - `properties`: Leitura pública (`anon`), escrita apenas para administradores.
  - `contact_messages`: Inserção pública (`anon`), leitura restrita a administradores.
- **Performance**: Cache de 5 minutos para a lista de imóveis.

---

Este plano foca na infraestrutura necessária para transformar o site em uma ferramenta de gestão real.