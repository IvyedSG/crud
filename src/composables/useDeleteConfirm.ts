import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import type { User } from '@/types/user'

export function useDeleteConfirm() {
  const confirm = useConfirm()
  const toast = useToast()

  function showDeleteConfirm(user: User, onConfirm: () => void) {
    confirm.require({
      message: `¿Estás seguro de que deseas eliminar a "${user.name}"? Esta acción no se puede deshacer.`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      rejectProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptProps: {
        label: 'Eliminar',
        severity: 'danger',
      },
      accept: () => {
        onConfirm()
        toast.add({
          severity: 'warn',
          summary: 'Usuario eliminado',
          detail: `${user.name} ha sido eliminado`,
          life: 3000,
        })
      },
    })
  }

  return {
    showDeleteConfirm,
  }
}
