<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  error: string | null
}>()

defineEmits<{
  retry: []
}>()
</script>

<template>
  <div
    v-if="error"
    class="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3"
  >
    <i class="pi pi-exclamation-circle text-red-500 text-xl"></i>
    <div class="flex-1">
      <p class="font-medium text-red-800 dark:text-red-200">Error al cargar usuarios</p>
      <p class="text-sm text-red-600 dark:text-red-300">{{ error }}</p>
    </div>
    <Button
      label="Reintentar"
      icon="pi pi-refresh"
      severity="danger"
      variant="outlined"
      size="small"
      @click="$emit('retry')"
    />
  </div>
</template>
