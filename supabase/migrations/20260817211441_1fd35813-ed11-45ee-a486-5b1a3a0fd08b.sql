-- Create properties table
CREATE TABLE public.properties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    beds INTEGER DEFAULT 0,
    baths INTEGER DEFAULT 0,
    sqft TEXT,
    image_url TEXT,
    tag TEXT DEFAULT 'Aluguel',
    description TEXT,
    whatsapp_number TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Grant privileges
GRANT SELECT ON public.properties TO anon, authenticated;
GRANT ALL ON public.properties TO service_role;

GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for properties
CREATE POLICY "Public read access for properties"
ON public.properties FOR SELECT
TO anon, authenticated
USING (true);

-- Policies for contact_messages
CREATE POLICY "Public insert access for contact messages"
ON public.contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated read access for contact messages"
ON public.contact_messages FOR SELECT
TO authenticated
USING (true);

-- Seed some real-looking data (based on the Instagram/Facebook references)
INSERT INTO public.properties (title, price, beds, baths, sqft, tag, image_url)
VALUES 
('Apartamento Moderno - Vila Mariana', 'R$ 3.500/mês', 2, 2, '75m²', 'Destaque', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'),
('Casa de Vila - Pinheiros', 'R$ 5.200/mês', 3, 2, '120m²', 'Aluguel', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'),
('Studio Loft - Itaim Bibi', 'R$ 2.800/mês', 1, 1, '45m²', 'Novo', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800'),
('Apartamento Reformado - Moema', 'R$ 4.200/mês', 2, 1, '68m²', 'Destaque', 'https://images.unsplash.com/photo-1502672023488-70e25813efdf?auto=format&fit=crop&q=80&w=800');