<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import type { User } from '@/types/user'

defineProps<{
  users: User[]
  loading: boolean
}>()

const emit = defineEmits<{
  edit: [user: User]
  delete: [user: User]
}>()
</script>

<template>
  <DataTable
    :value="users"
    :loading="loading"
    stripedRows
    paginator
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20]"
    dataKey="id"
    tableStyle="min-width: 50rem"
    class="rounded-xl overflow-hidden"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios"
  >
    <template #empty>
      <div class="flex flex-col items-center justify-center py-12 text-surface-500">
        <i class="pi pi-users text-4xl mb-3"></i>
        <p class="text-lg font-medium">No hay usuarios registrados</p>
        <p class="text-sm">Agrega un nuevo usuario para comenzar</p>
      </div>
    </template>

    <template #loading>
      <div class="flex items-center gap-3 py-8">
        <i class="pi pi-spin pi-spinner text-2xl text-primary"></i>
        <span class="text-surface-600 dark:text-surface-300">Cargando usuarios...</span>
      </div>
    </template>

    <Column field="id" header="#" sortable style="width: 5rem">
      <template #body="{ data }">
        <Tag :value="String(data.id)" severity="secondary" class="font-mono" />
      </template>
    </Column>

    <Column field="name" header="Nombre" sortable>
      <template #body="{ data }">
        <span class="font-medium">{{ data.name }}</span>
      </template>
    </Column>

    <Column field="username" header="Username" sortable>
      <template #body="{ data }">
        <span class="text-surface-500 dark:text-surface-400">@{{ data.username }}</span>
      </template>
    </Column>

    <Column field="email" header="Email" sortable>
      <template #body="{ data }">
        <div class="flex items-center gap-2">
          <i class="pi pi-envelope text-surface-400 text-sm"></i>
          <span>{{ data.email }}</span>
        </div>
      </template>
    </Column>

    <Column field="phone" header="Teléfono" sortable>
      <template #body="{ data }">
        <div class="flex items-center gap-2">
          <i class="pi pi-phone text-surface-400 text-sm"></i>
          <span>{{ data.phone }}</span>
        </div>
      </template>
    </Column>

    <Column header="Acciones" style="width: 10rem" frozen alignFrozen="right">
      <template #body="{ data }">
        <div class="flex items-center gap-2">
          <Button
            icon="pi pi-pencil"
            severity="info"
            variant="text"
            rounded
            size="small"
            v-tooltip.top="'Editar'"
            @click="emit('edit', data)"
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            variant="text"
            rounded
            size="small"
            v-tooltip.top="'Eliminar'"
            @click="emit('delete', data)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
