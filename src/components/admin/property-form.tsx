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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProperty, updateProperty } from "@/lib/admin.functions";
import { toast } from "sonner";
import { Loader2, Upload, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const propertyFormSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  price: z.string().min(1, "O preço é obrigatório"),
  beds: z.coerce.number().nullable().optional(),
  baths: z.coerce.number().nullable().optional(),
  sqft: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
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
  const [isUploading, setIsUploading] = useState(false);
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `property-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      form.setValue('image_url', publicUrl);
      toast.success("Foto carregada com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao carregar foto: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  function onSubmit(values: PropertyFormValues) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <div className="space-y-4 rounded-lg border p-4 bg-muted/50">
          <h3 className="font-semibold text-primary">Informações Básicas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Imóvel</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Sobrado na Vila Prudente" {...field} />
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
                  <FormLabel>Valor (Mensal ou Total)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: R$ 2.500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status / Categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Aluguel, Venda, Comercial" {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription>Ex: Aluguel, Lançamento, Oportunidade</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="font-semibold text-primary">Fotos do Imóvel</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto Principal</FormLabel>
                  <div className="flex flex-col gap-4">
                    {field.value && (
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                        <img 
                          src={field.value} 
                          alt="Preview" 
                          className="h-full w-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => form.setValue('image_url', '')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <FormControl>
                        <Input 
                          placeholder="URL da imagem ou faça upload" 
                          {...field} 
                          value={field.value || ""} 
                        />
                      </FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer w-[120px]"
                          onChange={handleFileUpload}
                          disabled={isUploading}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-[120px] gap-2"
                          disabled={isUploading}
                        >
                          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                          Upload
                        </Button>
                      </div>
                    </div>
                  </div>
                  <FormDescription>Recomendado: Imagens horizontais (16:9)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-lg border p-4 bg-muted/50">
          <h3 className="font-semibold text-primary">Detalhes e Dimensões</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="beds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dormitórios</FormLabel>
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
                  <FormLabel>Área útil (m²)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 60m²" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="font-semibold text-primary">Descrição e Contato</h3>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição Detalhada</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva as qualidades do imóvel, localização, diferenciais..." 
                    className="min-h-[120px]" 
                    {...field} 
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsapp_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp para este imóvel</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 5511959213175" {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription>Deixe em branco para usar o número padrão da imobiliária.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full h-12 text-lg" disabled={mutation.isPending || isUploading}>
          {mutation.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {isEditing ? "Salvar Alterações" : "Publicar Imóvel"}
        </Button>
      </form>
    </Form>
  );
}
