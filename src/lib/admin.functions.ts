import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const propertySchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  price: z.string().min(1, "Preço é obrigatório"),
  beds: z.number().nullable().optional(),
  baths: z.number().nullable().optional(),
  sqft: z.string().nullable().optional(),
  image_url: z.string().url("URL da imagem inválida").nullable().optional(),
  tag: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  whatsapp_number: z.string().nullable().optional(),
});

export const createProperty = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => propertySchema.parse(data))
  .handler(async ({ data, context }) => {
    // Para insert do Supabase com exactOptionalPropertyTypes, removemos campos undefined
    const insertData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    ) as any;

    const { error } = await context.supabase
      .from("properties")
      .insert([insertData]);

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
    // Filtramos undefined para compatibilidade com o tipo gerado
    const updateData = Object.fromEntries(
      Object.entries(data.updates).filter(([_, v]) => v !== undefined)
    ) as any;

    const { error } = await context.supabase
      .from("properties")
      .update(updateData)
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
