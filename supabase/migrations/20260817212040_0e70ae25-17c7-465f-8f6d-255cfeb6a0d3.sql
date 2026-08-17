-- Revogar acesso público à função de segurança
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;

-- Garantir acesso apenas ao service_role para que o RLS funcione (já que RLS roda com service_role/internal context quando usamos security definer)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- Garantir que a tabela user_roles tenha política de segurança (mesmo que vazia se não quisermos que ninguém leia via API)
DROP POLICY IF EXISTS "Admin can view all roles" ON public.user_roles;
CREATE POLICY "Admin can view all roles" ON public.user_roles
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
