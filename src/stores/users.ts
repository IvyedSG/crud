import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/user'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const nextId = computed(() => {
    if (users.value.length === 0) return 1
    return Math.max(...users.value.map((u) => u.id)) + 1
  })

  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Error al obtener usuarios')
      const data: User[] = await response.json()
      users.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
    } finally {
      loading.value = false
    }
  }

  function addUser(formData: Omit<User, 'id'>) {
    const newUser: User = {
      id: nextId.value,
      ...formData,
    }
    users.value.push(newUser)
  }

  function updateUser(id: number, formData: Omit<User, 'id'>) {
    const user = users.value.find((u) => u.id === id)
    if (user) {
      user.name = formData.name
      user.username = formData.username
      user.email = formData.email
      user.phone = formData.phone
    }
  }

  function deleteUser(id: number) {
    users.value = users.value.filter((u) => u.id !== id)
  }

  function getUserById(id: number): User | undefined {
    return users.value.find((u) => u.id === id)
  }

  return {
    users,
    loading,
    error,
    nextId,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
  }
})
