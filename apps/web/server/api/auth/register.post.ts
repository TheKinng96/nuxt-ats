import * as yup from 'yup'
import type { Prisma } from '@prisma/client'

// Validation schema
const registerSchema = yup.object({
  name: yup.string().required('名前は必須です').min(2, '名前は2文字以上である必要があります'),
  email: yup.string().required('メールアドレスは必須です').email('有効なメールアドレスを入力してください'),
  password: yup.string().required('パスワードは必須です').min(8, 'パスワードは8文字以上である必要があります'),
  organizationName: yup.string().required('組織名は必須です').min(2, '組織名は2文字以上である必要があります'),
})

export default defineEventHandler(async (event) => {
  try {
    // Parse and validate request body
    const body = await readBody(event)

    let validatedData
    try {
      validatedData = await registerSchema.validate(body, { abortEarly: false })
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Validation Error',
          data: {
            errors: error.errors,
          },
        })
      }
      throw error
    }

    const { name, email, password, organizationName } = validatedData

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: 'このメールアドレスは既に登録されています',
      })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Generate organization slug from name
    const slug = organizationName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    // Create organization and user in a transaction
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create organization
      const organization = await tx.organization.create({
        data: {
          name: organizationName,
          slug,
        },
      })

      // Create user with ADMIN role (first user is always admin)
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: 'ADMIN',
          organizationId: organization.id,
        },
      })

      return { user, organization }
    })

    // Generate JWT token
    const token = generateToken(result.user.id, result.organization.id)

    // Set auth cookie
    setAuthCookie(event, token)

    // Return user data (without password hash)
    return {
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        organizationId: result.user.organizationId,
      },
      organization: {
        id: result.organization.id,
        name: result.organization.name,
        slug: result.organization.slug,
      },
    }
  } catch (error) {
    // If it's already a createError, rethrow it
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    // Log unexpected errors
    console.error('Registration error:', error)

    // Return generic error
    throw createError({
      statusCode: 500,
      statusMessage: '登録中にエラーが発生しました',
    })
  }
})
