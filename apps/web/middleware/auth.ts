export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Try to fetch user if not already loaded
  if (!authStore.user) {
    try {
      await authStore.fetchUser()
    } catch (error) {
      // User is not authenticated
      return navigateTo('/auth/login')
    }
  }

  // User is authenticated
  if (!authStore.user) {
    return navigateTo('/auth/login')
  }
})
