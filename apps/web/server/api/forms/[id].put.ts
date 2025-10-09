import * as yup from 'yup'

// Validation schema for form update
const updateFormSchema = yup.object({
  name: yup.string().min(2, 'フォーム名は2文字以上である必要があります'),
  slug: yup.string().matches(/^[a-z0-9-]+$/, 'スラッグは小文字の英数字とハイフンのみ使用できます'),
  description: yup.string().nullable(),
  headerImage: yup.string().nullable(),
  isActive: yup.boolean(),
  fields: yup.array().of(
    yup.object({
      id: yup.string(),
      label: yup.string().required('ラベルは必須です'),
      type: yup
        .string()
        .required('フィールドタイプは必須です')
        .oneOf(
          ['TEXT', 'EMAIL', 'PHONE', 'TEXTAREA', 'NUMBER', 'SELECT', 'MULTI_SELECT', 'CHECKBOX', 'RADIO', 'DATE', 'FILE', 'URL'],
          '無効なフィールドタイプです'
        ),
      placeholder: yup.string().nullable(),
      helpText: yup.string().nullable(),
      required: yup.boolean().default(false),
      order: yup.number().required('順序は必須です'),
      options: yup.string().nullable(), // JSON string
      validation: yup.string().nullable(), // JSON string
      showInTable: yup.boolean().default(false),
    })
  ),
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

  // Get form ID from route params
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'フォームIDが必要です',
    })
  }

  // Parse and validate request body
  const body = await readBody(event)

  try {
    await updateFormSchema.validate(body, { abortEarly: false })
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

  // Check if form exists and belongs to the user's organization
  const existingForm = await prisma.form.findFirst({
    where: {
      id,
      organizationId: currentUser.organizationId,
    },
  })

  if (!existingForm) {
    throw createError({
      statusCode: 404,
      statusMessage: 'フォームが見つかりません',
    })
  }

  // If slug is being updated, check for conflicts
  if (body.slug && body.slug !== existingForm.slug) {
    const slugConflict = await prisma.form.findUnique({
      where: {
        organizationId_slug: {
          organizationId: currentUser.organizationId,
          slug: body.slug,
        },
      },
    })

    if (slugConflict) {
      throw createError({
        statusCode: 409,
        statusMessage: 'このスラッグは既に使用されています',
      })
    }
  }

  // Update form and fields in a transaction
  const form = await prisma.$transaction(async (tx) => {
    // Update form basic info
    const updatedForm = await tx.form.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        headerImage: body.headerImage,
        isActive: body.isActive,
      },
    })

    // If fields are provided, update them
    if (body.fields && Array.isArray(body.fields)) {
      // Get existing field IDs
      const existingFields = await tx.formField.findMany({
        where: { formId: id },
        select: { id: true },
      })

      const existingFieldIds = existingFields.map((f) => f.id)
      const updatedFieldIds = body.fields.filter((f: any) => f.id).map((f: any) => f.id)

      // Delete fields that are not in the updated list
      const fieldsToDelete = existingFieldIds.filter((id) => !updatedFieldIds.includes(id))
      if (fieldsToDelete.length > 0) {
        await tx.formField.deleteMany({
          where: {
            id: { in: fieldsToDelete },
          },
        })
      }

      // Upsert all fields
      for (const field of body.fields) {
        if (field.id) {
          // Update existing field
          await tx.formField.update({
            where: { id: field.id },
            data: {
              label: field.label,
              type: field.type,
              placeholder: field.placeholder,
              helpText: field.helpText,
              required: field.required,
              order: field.order,
              options: field.options,
              validation: field.validation,
              showInTable: field.showInTable,
            },
          })
        } else {
          // Create new field
          await tx.formField.create({
            data: {
              formId: id,
              label: field.label,
              type: field.type,
              placeholder: field.placeholder,
              helpText: field.helpText,
              required: field.required,
              order: field.order,
              options: field.options,
              validation: field.validation,
              showInTable: field.showInTable,
            },
          })
        }
      }
    }

    // Return updated form with fields
    return await tx.form.findFirst({
      where: { id },
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
  })

  return {
    form,
  }
})
