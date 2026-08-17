import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator((data) => 
    z.object({
      name: z.string().min(2, "Nome é obrigatório"),
      email: z.string().email("E-mail inválido"),
      message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("contact_messages")
      .insert([data]);

    if (error) {
      console.error("Erro ao salvar mensagem:", error);
      throw new Error("Não foi possível enviar sua mensagem. Tente novamente mais tarde.");
    }

    return { success: true };
  });
