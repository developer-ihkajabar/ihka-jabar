export default defineNuxtRouteMiddleware(async (to) => {
  // if (import.meta.server)
  //   return
  // const token = localStorage.getItem('admin_token')

  // const { user } = storeToRefs(useAuthAdminStore())
  // const { verifyToken } = useAuthAdminStore()

  // if (to.path.startsWith('/admin') && to.name !== 'AdminLogin') {
  //   if (token) {
  //     await verifyToken()
  //   }

  //   if (!user.value?.id) {
  //     return {
  //       name: 'AdminLogin',
  //     }
  //   }
  // }

  // if (to.name === 'AdminLogin' && token) {
  //   await verifyToken()
  //   return {
  //     name: 'news',
  //   }
  // }
})
