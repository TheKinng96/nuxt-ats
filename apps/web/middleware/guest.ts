export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Try to fetch user if not already loaded
  if (!authStore.user) {
    try {
      await authStore.fetchUser()
    } catch (error) {
      // User is not authenticated, allow access to guest pages
      return
    }
  }

  // User is authenticated, redirect to dashboard
  if (authStore.user) {
    return navigateTo('/dashboard')
  }
})
