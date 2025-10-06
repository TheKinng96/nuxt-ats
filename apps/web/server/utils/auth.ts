import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

const SALT_ROUNDS = 10

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(userId: string, organizationId: string): string {
  const config = useRuntimeConfig()
  const secret = config.jwtSecret

  if (!secret) {
    throw new Error('JWT_SECRET is not configured')
  }

  return jwt.sign(
    {
      userId,
      organizationId,
      iat: Math.floor(Date.now() / 1000),
    },
    secret,
    {
      expiresIn: '7d', // Token expires in 7 days
    }
  )
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): { userId: string; organizationId: string } | null {
  try {
    const config = useRuntimeConfig()
    const secret = config.jwtSecret

    if (!secret) {
      throw new Error('JWT_SECRET is not configured')
    }

    const decoded = jwt.verify(token, secret) as {
      userId: string
      organizationId: string
    }

    return decoded
  } catch (error) {
    return null
  }
}

/**
 * Get the current user from the request
 * Checks for JWT token in cookies
 */
export function getCurrentUser(event: H3Event): { userId: string; organizationId: string } | null {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    return null
  }

  return verifyToken(token)
}

/**
 * Set auth token cookie
 */
export function setAuthCookie(event: H3Event, token: string) {
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

/**
 * Clear auth token cookie
 */
export function clearAuthCookie(event: H3Event) {
  deleteCookie(event, 'auth_token')
}
