import * as yup from 'yup'

// Validation schema
const loginSchema = yup.object({
  email: yup.string().required('メールアドレスは必須です').email('有効なメールアドレスを入力してください'),
  password: yup.string().required('パスワードは必須です'),
})

export default defineEventHandler(async (event) => {
  try {
    // Parse and validate request body
    const body = await readBody(event)

    let validatedData
    try {
      validatedData = await loginSchema.validate(body, { abortEarly: false })
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

    const { email, password } = validatedData

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        organization: true,
      },
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'メールアドレスまたはパスワードが正しくありません',
      })
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash)

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'メールアドレスまたはパスワードが正しくありません',
      })
    }

    // Generate JWT token
    const token = generateToken(user.id, user.organizationId)

    // Set auth cookie
    setAuthCookie(event, token)

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
  } catch (error) {
    // If it's already a createError, rethrow it
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    // Log unexpected errors
    console.error('Login error:', error)

    // Return generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'ログイン中にエラーが発生しました',
    })
  }
})
