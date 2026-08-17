CREATE OR REPLACE FUNCTION public.handle_admin_signup()
RETURNS trigger AS $$
BEGIN
  IF NEW.email = 'teste@teste.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_admin_signup ON auth.users;
CREATE TRIGGER on_admin_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_admin_signup();
