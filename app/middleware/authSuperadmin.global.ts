export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server)
    return
  const token = localStorage.getItem('superadmin_token')

  const { authSuperadmin } = storeToRefs(useAuthSuperadminStore())
  const { verify } = useAuthSuperadminStore()

  if (to.path.startsWith('/superadmin') && to.name !== 'SuperadminLogin') {
    if (token) {
      await verify()
    }

    if (!authSuperadmin.value?.id) {
      return {
        name: 'SuperadminLogin',
      }
    }
  }

  if (to.name === 'SuperadminLogin' && token) {
    await verify()
    return {
      name: 'Admin',
    }
  }
})
