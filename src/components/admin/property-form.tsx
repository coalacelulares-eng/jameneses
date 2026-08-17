import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProperty, updateProperty } from "@/lib/admin.functions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const propertyFormSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  price: z.string().min(1, "O preço é obrigatório"),
  beds: z.coerce.number().nullable().optional(),
  baths: z.coerce.number().nullable().optional(),
  sqft: z.string().nullable().optional(),
  image_url: z.string().url("URL da imagem inválida").nullable().optional(),
  tag: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  whatsapp_number: z.string().nullable().optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface PropertyFormProps {
  initialData?: any;
  onSuccess: () => void;
}

export function PropertyForm({ initialData, onSuccess }: PropertyFormProps) {
  const queryClient = useQueryClient();
  const isEditing = !!initialData;

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: initialData ? {
      title: initialData.title || "",
      price: initialData.price || "",
      beds: initialData.beds || 0,
      baths: initialData.baths || 0,
      sqft: initialData.sqft || "",
      image_url: initialData.image_url || "",
      tag: initialData.tag || "Aluguel",
      description: initialData.description || "",
      whatsapp_number: initialData.whatsapp_number || "",
    } : {
      title: "",
      price: "",
      beds: 0,
      baths: 0,
      sqft: "",
      image_url: "",
      tag: "Aluguel",
      description: "",
      whatsapp_number: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: PropertyFormValues) => {
      if (isEditing) {
        return updateProperty({ data: { id: initialData.id, updates: values } });
      } else {
        return createProperty({ data: values });
      }
    },
    onSuccess: () => {
      toast.success(isEditing ? "Imóvel atualizado!" : "Imóvel criado!");
      queryClient.invalidateQueries({ queryKey: ["admin", "properties"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.message || "Ocorreu um erro ao salvar o imóvel.");
    },
  });

  function onSubmit(values: PropertyFormValues) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título do Imóvel</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Apartamento no Centro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (Mensal)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: R$ 2.500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="beds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quartos</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="baths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banheiros</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sqft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Área (m²)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 75m²" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag / Categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Aluguel, Luxo, Comercial" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Imagem</FormLabel>
                <FormControl>
                  <Input placeholder="https://exemplo.com/foto.jpg" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="whatsapp_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp (Somente números)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 5511999999999" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Detalhes sobre o imóvel..." 
                  className="resize-none" 
                  {...field} 
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? "Atualizar Imóvel" : "Criar Imóvel"}
        </Button>
      </form>
    </Form>
  );
}
