# Plano de Implementação: Sistema de Autenticação e Gestão de Imóveis

O objetivo é permitir que a equipe da Imobiliária J.A Meneses gerencie o catálogo de imóveis diretamente pelo site através de uma área administrativa protegida.

## 1. Infraestrutura e Banco de Dados
- Criar tabela `user_roles` para gerenciar permissões (admin para a equipe).
- Adicionar função `has_role` no PostgreSQL para verificação de permissões em políticas RLS.
- Atualizar políticas RLS na tabela `properties` para permitir que admins realizem INSERT, UPDATE e DELETE.
- Configurar autenticação via Google no Lovable Cloud.

## 2. Autenticação e Segurança
- Criar rota `/auth` para login.
- Criar rota protegida `/_authenticated/admin` (e sub-rotas) para gestão.
- Implementar middleware de autenticação TanStack Router.
- Criar funções de servidor protegidas (`requireSupabaseAuth`) para operações de escrita.

## 3. Interface Administrativa (Admin Dashboard)
- **Dashboard Principal**: Lista de todos os imóveis com ações rápidas (editar, excluir, alternar status).
- **Formulário de Imóvel**: Modal ou página dedicada para adicionar/editar imóveis com suporte a upload de fotos.
- **Gestão de Mensagens**: Visualização das mensagens recebidas pelo formulário de contato.

## 4. Integração de UI
- Adicionar link "Acesso Restrito" ou "Admin" no rodapé/navbar (visível se logado ou apenas para facilitar acesso).
- Toast notifications para feedback de ações administrativas.

## Detalhes Técnicos
- Utilização de `createServerFn` com `.middleware([requireSupabaseAuth])` para segurança no lado do servidor.
- `react-hook-form` + `zod` para validação de formulários complexos.
- `tanstack-query` para gerenciamento de estado e cache da lista administrativa.
