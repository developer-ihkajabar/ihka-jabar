import type { AuthSuperadmin } from '@@/types/AuthSuperadmin'
// import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAuthSuperadminStore = defineStore('AuthSuperadmin', () => {
  const toast = useToast()
  const router = useRouter()

  const authSuperadmin = ref<AuthSuperadmin>()

  const login = async ({ username, password }: { username: string, password: string }) => {
    const data = await $fetch<{ superadmin: AuthSuperadmin, token: string }>('/api/auth/superadmin/login', {
      method: 'POST',
      body: { username, password },
      onResponseError: (error) => {
        toast.add({
          title: 'Login Gagal',
          color: 'rose',
          description: error.response._data,
          icon: 'solar:user-cross-rounded-linear',
        })
      },
    })

    authSuperadmin.value = data.superadmin

    localStorage.setItem('superadmin_token', data.token)

    toast.add({
      title: 'Login Berhasil',
      description: 'Anda berhasil login sebagai superadmin',
      icon: 'solar:user-check-rounded-linear',
    })

    return router.replace({ name: 'Admin' })
  }

  const verify = async () => {
    const token = localStorage.getItem('superadmin_token')

    const data = await $fetch<AuthSuperadmin>('/api/auth/superadmin/verify', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onResponseError: (error) => {
        if (import.meta.server)
          return
        localStorage.removeItem('superadmin_token')
        toast.add({
          title: 'Token Expired',
          color: 'rose',
          description: error.response._data,
          icon: 'solar:time',
        })
      },
    })

    authSuperadmin.value = data
  }

  const editProfile = async (formData: { username?: string, password?: string }) => {
    await $fetch(`/api/superadmin/${authSuperadmin.value?.id}`, {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('superadmin_token')}`,
      },
      onResponseError: (error) => {
        toast.add({
          title: 'Edit Profile Gagal',
          color: 'rose',
          description: error.response._data,
          icon: 'solar:user-cross-rounded-linear',
        })
      },
    })

    await verify()

    toast.add({
      title: 'Edit Profile Berhasil',
      description: 'Anda berhasil mengedit profile superadmin',
      icon: 'solar:user-check-rounded-linear',
    })
  }

  const logout = () => {
    localStorage.removeItem('superadmin_token')
    authSuperadmin.value = undefined
    toast.add({
      title: 'Logout Berhasil',
      description: 'Anda berhasil logout dari superadmin',
      icon: 'solar:user-cross-rounded-linear',
    })
    return router.replace({ name: 'SuperadminLogin' })
  }

  return { authSuperadmin, login, verify, logout, editProfile }
})
