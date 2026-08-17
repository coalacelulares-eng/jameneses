-- Criar enum de roles
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Criar tabela user_roles
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Grants para user_roles
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- Enable RLS em user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Função has_role (Security Definer) para evitar recursão no RLS
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Atualizar políticas de properties
-- Remover políticas antigas se existirem para evitar conflitos (opcional, mas seguro)
DROP POLICY IF EXISTS "Public properties are viewable by everyone" ON public.properties;
DROP POLICY IF EXISTS "Admins can insert properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can update properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can delete properties" ON public.properties;

-- Permitir leitura pública
CREATE POLICY "Public properties are viewable by everyone" 
ON public.properties FOR SELECT 
USING (true);

-- Permitir INSERT para admins
CREATE POLICY "Admins can insert properties" 
ON public.properties FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Permitir UPDATE para admins
CREATE POLICY "Admins can update properties" 
ON public.properties FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Permitir DELETE para admins
CREATE POLICY "Admins can delete properties" 
ON public.properties FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Políticas para contact_messages
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Admins can view contact messages" 
ON public.contact_messages FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Grants para as tabelas existentes
GRANT SELECT ON public.properties TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.properties TO authenticated;
GRANT ALL ON public.properties TO service_role;

GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
