export default defineEventHandler(async (event) => {
  // Get current user from token
  const currentUser = getCurrentUser(event)

  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: '認証が必要です',
    })
  }

  // Fetch user data from database
  const user = await prisma.user.findUnique({
    where: { id: currentUser.userId },
    include: {
      organization: true,
    },
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ユーザーが見つかりません',
    })
  }

  // Return user data (without password hash)
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    },
    organization: {
      id: user.organization.id,
      name: user.organization.name,
      slug: user.organization.slug,
    },
  }
})
