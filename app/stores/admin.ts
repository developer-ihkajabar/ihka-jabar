import type { Admin, FormDataAddAdmin } from '@@/types/Admin.js'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('Admin', () => {
  const adminList = ref<Admin[]>()

  const fetchAdmin = async () => {
    adminList.value = await $fetch('/api/admin', {
      method: 'GET',
    })
  }

  const createAdmin = async (formData: FormDataAddAdmin) => {
    await $fetch('/api/admin', {
      method: 'POST',
      body: formData,
    })

    await fetchAdmin()
  }

  const activateAdmin = async (id: number) => {
    await $fetch(`/api/admin/${id}/activate`, {
      method: 'POST',
    })

    await fetchAdmin()
  }

  const deactivateAdmin = async (id: number) => {
    await $fetch(`/api/admin/${id}/deactivate`, {
      method: 'POST',
    })

    await fetchAdmin()
  }

  const deleteAdmin = async (id: number) => {
    await $fetch(`/api/admin/${id}`, {
      method: 'DELETE',
    })

    await fetchAdmin()
  }

  return {
    adminList,
    fetchAdmin,
    createAdmin,
    activateAdmin,
    deactivateAdmin,
    deleteAdmin,
  }
})
