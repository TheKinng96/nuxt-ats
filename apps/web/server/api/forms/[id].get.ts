export default defineEventHandler(async (event) => {
  // Get current user from token
  const currentUser = getCurrentUser(event)

  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: '認証が必要です',
    })
  }

  // Get form ID from route params
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'フォームIDが必要です',
    })
  }

  // Fetch the form with all fields
  const form = await prisma.form.findFirst({
    where: {
      id,
      organizationId: currentUser.organizationId,
    },
    include: {
      fields: {
        orderBy: {
          order: 'asc',
        },
      },
      _count: {
        select: {
          candidates: true,
          submissions: true,
        },
      },
    },
  })

  if (!form) {
    throw createError({
      statusCode: 404,
      statusMessage: 'フォームが見つかりません',
    })
  }

  return {
    form,
  }
})
