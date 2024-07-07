import { db } from '../../../lib/db/providers/drizzle'
import { users } from '../../../lib/db/schema'

import { eq } from 'drizzle-orm'
import { AppError } from '../../../../server/handlers/AppError'
import { hashProvider } from '../../../lib/db/providers/HashProvider/HashProvider'
import { ensureAuthenticated } from '../../../../server/handlers/ensureAuthenticated'
import { paginateColumn } from '@/lib/db/helpers/paginateColumn'

export async function POST(request: Request) {
  const { username, email, password } = await request.json()

  const userEmailExists = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (userEmailExists) {
    return AppError({
      message: 'Email addres already used.',
      status: 409,
    })
  }

  const usernameExists = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (usernameExists) {
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

  const { offset, limit, meta } = await paginateColumn({
    request,
    table: users,
  })

  const data = await db.query.users.findMany({
    offset,
    limit,
    orderBy: users.createdAt,
    columns: {
      password: false,
    },
  })

  return Response.json({
    data,
    meta,
  })
}
