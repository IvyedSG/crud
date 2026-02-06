<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod/v4'
import { watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import type { User } from '@/types/user'

const props = defineProps<{
  visible: boolean
  userData?: Omit<User, 'id'> | null
  isEditing: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  save: [data: Omit<User, 'id'>]
}>()

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    username: z.string().min(1, 'El nombre de usuario es obligatorio').trim(),
    email: z.string().min(1, 'El correo es obligatorio').email('El correo debe ser válido'),
    phone: z.string()
      .min(1, 'El teléfono es obligatorio')
      .regex(/^[0-9+\-().x ]+$/i, 'El teléfono contiene caracteres no válidos')
      .trim(),
  }),
)

const { defineField, handleSubmit, errors, resetForm, setValues, meta } = useForm<Omit<User, 'id'>>({
  validationSchema,
})

const [name] = defineField('name')
const [username] = defineField('username')
const [email] = defineField('email')
const [phone] = defineField('phone')

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible && props.isEditing && props.userData) {
      setValues({
        name: props.userData.name,
        username: props.userData.username,
        email: props.userData.email,
        phone: props.userData.phone,
      })
    } else if (isVisible && !props.isEditing) {
      resetForm()
    }
  },
)

const onSubmit = handleSubmit((values) => {
  emit('save', values)
  closeDialog()
})

function closeDialog() {
  resetForm()
  emit('update:visible', false)
}
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="closeDialog"
    modal
    :header="isEditing ? 'Editar Usuario' : 'Nuevo Usuario'"
    :style="{ width: '28rem' }"
    :closable="true"
  >
    <form @submit.prevent="onSubmit" class="flex flex-col gap-5 pt-2">
      <div class="flex flex-col gap-1">
        <label for="name" class="font-semibold text-sm text-surface-700 dark:text-surface-200">
          Nombre
        </label>
        <InputText
          id="name"
          v-model="name"
          placeholder="Ej: Juan Pérez"
          :invalid="!!errors.name"
          class="w-full"
        />
        <Message v-if="errors.name" severity="error" size="small" variant="simple">
          {{ errors.name }}
        </Message>
      </div>

      <div class="flex flex-col gap-1">
        <label for="username" class="font-semibold text-sm text-surface-700 dark:text-surface-200">
          Username
        </label>
        <InputText
          id="username"
          v-model="username"
          placeholder="Ej: jperez"
          :invalid="!!errors.username"
          class="w-full"
        />
        <Message v-if="errors.username" severity="error" size="small" variant="simple">
          {{ errors.username }}
        </Message>
      </div>

      <div class="flex flex-col gap-1">
        <label for="email" class="font-semibold text-sm text-surface-700 dark:text-surface-200">
          Email
        </label>
        <InputText
          id="email"
          v-model="email"
          placeholder="Ej: juan@email.com"
          :invalid="!!errors.email"
          class="w-full"
        />
        <Message v-if="errors.email" severity="error" size="small" variant="simple">
          {{ errors.email }}
        </Message>
      </div>

      <div class="flex flex-col gap-1">
        <label for="phone" class="font-semibold text-sm text-surface-700 dark:text-surface-200">
          Teléfono
        </label>
        <InputText
          id="phone"
          v-model="phone"
          placeholder="Ej: +1 555-1234"
          :invalid="!!errors.phone"
          class="w-full"
        />
        <Message v-if="errors.phone" severity="error" size="small" variant="simple">
          {{ errors.phone }}
        </Message>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          variant="outlined"
          @click="closeDialog"
        />
        <Button
          type="submit"
          :label="isEditing ? 'Guardar Cambios' : 'Crear Usuario'"
          :icon="isEditing ? 'pi pi-check' : 'pi pi-plus'"
          :disabled="!meta.valid"
        />
      </div>
    </form>
  </Dialog>
</template>
