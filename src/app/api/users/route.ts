import { db } from '../../../lib/db/providers/drizzle'
import { users } from '../../../lib/db/schema'

import { eq } from 'drizzle-orm'
import { AppError } from '../../../../server/handlers/AppError'
import { hashProvider } from '../../../lib/db/providers/HashProvider/HashProvider'
import { ensureAuthenticated } from '../../../../server/handlers/ensureAuthenticated'
import { paginateColumn } from '@/lib/db/helpers/paginateColumn'

export async function POST(request: Request) {
  const res = await request.json()

  const { username, email, password } = res

  const userEmailExists = await db
    .select()
    .from(users)
    .where(eq(users.email, email))

  if (userEmailExists.length > 0) {
    return AppError({
      message: 'Email addres already used.',
      status: 409,
    })
  }

  const usernameExists = await db
    .select()
    .from(users)
    .where(eq(users.username, username))

  if (usernameExists.length > 0) {
    return AppError({
      message: 'Username already used.',
      status: 409,
    })
  }

  const hashPassword = await hashProvider.generateHash(password)

  const data = await db
    .insert(users)
    .values({
      username,
      email,
      password: hashPassword,
    })
    .returning({
      username: users.username,
      email: users.email,
    })

  return Response.json({ data })
}

export async function GET(request: Request) {
  const auth = await ensureAuthenticated(request)

  if (auth?.error) {
    return AppError({
      message: auth.error,
      status: auth.status,
    })
  }

  const { page, total, limit, hasNextPage, hasPreviousPage } =
    await paginateColumn({
      request,
      table: users,
    })

  const data = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      created_at: users.createdAt,
      updated_at: users.updatedAt,
    })
    .from(users)
    .orderBy(users.id)
    .limit(limit)
    .offset((page - 1) * limit)

  return Response.json({
    data,
    meta: {
      total,
      page,
      next_page: hasNextPage ? page + 1 : null,
      previous_page: hasPreviousPage ? page - 1 : null,
    },
  })
}
