import type { Admin } from '@@/types/Admin'

export const useAuthAdminStore = defineStore('AuthAdmin', () => {
  // State ============================================================
  const router = useRouter()
  const user = ref<Admin>()
  const toast = useToast()

  // Actions ==========================================================
  const login = async (formData: { email: string, password: string }) => {
    const data = await $fetch<{ admin: Admin, token: string }>('/api/auth/admin/login', {
      method: 'POST',
      body: formData,
      onResponseError: (error) => {
        toast.add({
          title: 'Login Gagal',
          color: 'rose',
          icon: 'solar:user-block-bold-duotone',
          description: error.response._data,
        })
      },
    })
    localStorage.setItem('admin_token', data.token)
    user.value = data.admin
    toast.add({
      title: 'Login Berhasil',
      description: `Selamat datang, ${data.admin.name}`,
    })
    router.replace({ name: 'Berita' })
  }
  const editProfile = async (formData: { email?: string, name?: string, no_telp?: string, password?: string }) => {
    await $fetch<{ admin: Admin }>(`/api/admin/${user.value!.id}`, {
      method: 'PATCH',
      body: formData,
      onResponseError: (error) => {
        toast.add({
          title: 'Update Gagal',
          description: error.response._data,
        })
      },
    })
    user.value = { ...user.value!, ...formData } as Admin

    // try {
    //   await axiosInstance.patch(`/admin/${user.value?.id}`, formData)
    //   user.value = { ...user.value, ...formData } as Admin
    //   $toast.success('Berhasil memperbarui profil')
    // } catch (error) {
    //   if (error instanceof AxiosError && error.response) {
    //     $toast.error(error.response.statusText)
    //   }
    // }
  }

  const logout = async () => {
    localStorage.removeItem('admin_token')
    user.value = undefined
    return router.replace({ name: 'AdminLogin' })
  }

  const verifyToken = async () => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      user.value = undefined
      return
    }
    const data = await $fetch<Admin>('/api/auth/admin/verify', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      onResponseError: (error) => {
        toast.add({
          title: 'Login Gagal',
          description: error.response._data,
        })
        localStorage.removeItem('admin_token')
      },
    })
    user.value = data
    // try {
    //   const { data } = await axiosInstance.post<{ admin: Admin }>('/auth/admin/verify', null, { headers: { Authorization: `Bearer ${token}` } })
    //   user.value = data.admin
    // } catch (error) {
    //   if (error instanceof AxiosError) {
    //     console.error(error.response?.data.message)
    //     console.error(error.response?.status)
    //     localStorage.removeItem('token')
    //     return router.replace({ name: 'Login' })
    //   }
    // }
  }

  return { user, login, verifyToken, logout, editProfile }
})
