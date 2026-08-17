-- Ajustando a função para ser segura e não executável por usuários comuns
ALTER FUNCTION public.handle_admin_signup() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.handle_admin_signup() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_admin_signup() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_admin_signup() FROM authenticated;
