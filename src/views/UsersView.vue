<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import UserTable from '@/components/UserTable.vue'
import UserFormDialog from '@/components/UserFormDialog.vue'
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import { useUserStore } from '@/stores/users'
import { useDeleteConfirm } from '@/composables/useDeleteConfirm'
import type { User, UserFormData } from '@/types/user'

const userStore = useUserStore()
const { users, loading, error } = storeToRefs(userStore)

const toast = useToast()
const { showDeleteConfirm } = useDeleteConfirm()

const showFormDialog = ref(false)
const isEditing = ref(false)
const editingUser = ref<UserFormData | null>(null)
const editingUserId = ref<number | null>(null)

onMounted(() => {
  userStore.fetchUsers()
})

function openCreateDialog() {
  isEditing.value = false
  editingUser.value = null
  editingUserId.value = null
  showFormDialog.value = true
}

function openEditDialog(user: User) {
  isEditing.value = true
  editingUserId.value = user.id
  editingUser.value = {
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
  }
  showFormDialog.value = true
}

function handleSave(formData: UserFormData) {
  if (isEditing.value && editingUserId.value !== null) {
    userStore.updateUser(editingUserId.value, formData)
    toast.add({
      severity: 'success',
      summary: 'Usuario actualizado',
      detail: `${formData.name} ha sido actualizado exitosamente`,
      life: 3000,
    })
  } else {
    userStore.addUser(formData)
    toast.add({
      severity: 'success',
      summary: 'Usuario creado',
      detail: `${formData.name} ha sido agregado exitosamente`,
      life: 3000,
    })
  }
}

function handleDelete(user: User) {
  showDeleteConfirm(user, () => {
    userStore.deleteUser(user.id)
  })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50/30 to-surface-100 dark:from-surface-950 dark:via-blue-950/20 dark:to-surface-900">
    <Toast position="top-right" />
    <DeleteConfirmDialog />

    <header
      class="bg-transparent backdrop-blur-none border-b border-transparent"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img
              src="https://primefaces.org/cdn/primevue/images/logo.svg"
              alt="PrimeVue"
              class="h-10 w-10"
            />
            <h1 class="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              Crud de Usuarios
            </h1>
          </div>
          <Button
            label="Nuevo Usuario"
            icon="pi pi-plus"
            @click="openCreateDialog"
            class="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          />
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ErrorAlert :error="error" @retry="userStore.fetchUsers()" />
      <div
        class="bg-white dark:bg-surface-900 rounded-xl shadow-md overflow-hidden"
      >
        <UserTable
          :users="users"
          :loading="loading"
          @edit="openEditDialog"
          @delete="handleDelete"
        />
      </div>
    </main>

    <UserFormDialog
      v-model:visible="showFormDialog"
      :user-data="editingUser"
      :is-editing="isEditing"
      @save="handleSave"
    />
  </div>
</template>
