import * as yup from 'yup'

// Validation schema for form creation
const createFormSchema = yup.object({
  name: yup.string().required('フォーム名は必須です').min(2, 'フォーム名は2文字以上である必要があります'),
  slug: yup
    .string()
    .required('スラッグは必須です')
    .matches(/^[a-z0-9-]+$/, 'スラッグは小文字の英数字とハイフンのみ使用できます'),
  description: yup.string().nullable(),
  isActive: yup.boolean().default(true),
})

export default defineEventHandler(async (event) => {
  // Get current user from token
  const currentUser = getCurrentUser(event)

  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: '認証が必要です',
    })
  }

  // Parse and validate request body
  const body = await readBody(event)

  try {
    await createFormSchema.validate(body, { abortEarly: false })
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw createError({
        statusCode: 400,
        statusMessage: error.errors.join(', '),
        data: { errors: error.errors },
      })
    }
    throw error
  }

  // Check if slug already exists for this organization
  const existingForm = await prisma.form.findUnique({
    where: {
      organizationId_slug: {
        organizationId: currentUser.organizationId,
        slug: body.slug,
      },
    },
  })

  if (existingForm) {
    throw createError({
      statusCode: 409,
      statusMessage: 'このスラッグは既に使用されています',
    })
  }

  // Create the form
  const form = await prisma.form.create({
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description,
      isActive: body.isActive ?? true,
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
  })

  return {
    form,
  }
})
