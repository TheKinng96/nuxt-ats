export default defineEventHandler(async (event) => {
  // Clear auth cookie
  clearAuthCookie(event)

  return {
    success: true,
    message: 'ログアウトしました',
  }
})
