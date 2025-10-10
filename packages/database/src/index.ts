// Re-export everything from @prisma/client
export * from '@prisma/client'

// Also export PrismaClient as default for easier importing
export { PrismaClient } from '@prisma/client'

// Create a singleton instance
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
