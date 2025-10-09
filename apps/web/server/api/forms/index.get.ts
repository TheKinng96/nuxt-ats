export default defineEventHandler(async (event) => {
  // Get current user from token
  const currentUser = getCurrentUser(event)

  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: '認証が必要です',
    })
  }

  // Fetch all forms for the organization
  const forms = await prisma.form.findMany({
    where: {
      organizationId: currentUser.organizationId,
    },
    include: {
      _count: {
        select: {
          fields: true,
          candidates: true,
          submissions: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    forms,
  }
})
