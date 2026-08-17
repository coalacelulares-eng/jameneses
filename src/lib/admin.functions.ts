import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const propertySchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  price: z.string().min(1, "Preço é obrigatório"),
  beds: z.number().nullable(),
  baths: z.number().nullable(),
  sqft: z.string().nullable(),
  image_url: z.string().url("URL da imagem inválida").nullable(),
  tag: z.string().nullable(),
  description: z.string().nullable(),
  whatsapp_number: z.string().nullable(),
});

export const createProperty = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => propertySchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("properties")
      .insert([data]);

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateProperty = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({
    id: z.string().uuid(),
    updates: propertySchema.partial()
  }).parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("properties")
      .update(data.updates)
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteProperty = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("properties")
      .delete()
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });
