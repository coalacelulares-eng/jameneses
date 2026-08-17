import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Edit, Trash2, Loader2, X } from 'lucide-react'
import { deleteProperty } from '@/lib/admin.functions'
import { toast } from 'sonner'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PropertyForm } from '@/components/admin/property-form'

export const Route = createFileRoute('/_authenticated/admin/properties')({
  component: AdminProperties,
})

function AdminProperties() {
  const queryClient = useQueryClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<any>(null)

  const { data: properties, isLoading } = useQuery({
    queryKey: ['admin', 'properties'],
    queryFn: async () => {
      const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProperty({ data: { id } }),
    onSuccess: () => {
      toast.success('Imóvel excluído com sucesso')
      queryClient.invalidateQueries({ queryKey: ['admin', 'properties'] })
      queryClient.invalidateQueries({ queryKey: ['properties'] })
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao excluir imóvel')
    }
  })

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este imóvel?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleEdit = (property: any) => {
    setEditingProperty(property)
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingProperty(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Gerenciar Imóveis</h1>
          <p className="text-muted-foreground">Adicione, edite ou remova imóveis do seu catálogo.</p>
        </div>
        <Button className="gap-2" onClick={handleCreate}>
          <Plus size={18} />
          Novo Imóvel
        </Button>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                </TableCell>
              </TableRow>
            ) : properties?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Nenhum imóvel cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              properties?.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.title}</TableCell>
                  <TableCell>{property.price}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-secondary">
                      {property.tag}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleEdit(property)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(property.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProperty ? "Editar Imóvel" : "Adicionar Novo Imóvel"}
            </DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para {editingProperty ? "atualizar o" : "cadastrar um novo"} imóvel no site.
            </DialogDescription>
          </DialogHeader>
          <PropertyForm 
            initialData={editingProperty} 
            onSuccess={() => setIsDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
