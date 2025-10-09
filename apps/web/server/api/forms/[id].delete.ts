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

  // Check if form exists and belongs to the user's organization
  const existingForm = await prisma.form.findFirst({
    where: {
      id,
      organizationId: currentUser.organizationId,
    },
    include: {
      _count: {
        select: {
          candidates: true,
        },
      },
    },
  })

  if (!existingForm) {
    throw createError({
      statusCode: 404,
      statusMessage: 'フォームが見つかりません',
    })
  }

  // Prevent deletion if there are candidates associated with this form
  if (existingForm._count.candidates > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: `このフォームには${existingForm._count.candidates}人の候補者が紐付いているため削除できません`,
    })
  }

  // Delete the form (fields will be cascade deleted)
  await prisma.form.delete({
    where: { id },
  })

  return {
    success: true,
    message: 'フォームを削除しました',
  }
})
