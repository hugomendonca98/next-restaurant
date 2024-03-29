import { AppError } from '@/../server/handlers/AppError'
import { db } from '@/lib/db/providers/drizzle'
import { users } from '@/lib/db/schema'

import { hashProvider } from '@/lib/db/providers/HashProvider/HashProvider'
import { sign } from 'jsonwebtoken'
import authConfig from '@/../server/authConfig'
import { NextResponse } from 'next/server'

import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = await db.select().from(users).where(eq(users.email, email))

  if (user.length < 1) {
    return AppError({
      message: 'Usuário não encontrado.',
      status: 401,
    })
  }

  const passwordMatched = await hashProvider.compareHash(
    password,
    user[0].password,
  )

  if (!passwordMatched) {
    return AppError({
      message: 'Usuário ou senha inválidos.',
      status: 401,
    })
  }

  const { secret, expireIn } = authConfig.jwt

  const token = sign({ id: user[0].id }, secret, { expiresIn: expireIn })

  // await db.insert(userToken).values({
  //   expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toDateString(),
  //   token,
  //   userId: user[0].id,
  // })

  return NextResponse.json({
    user: { email: user[0].email, id: user[0].id, username: user[0].username },
    token,
  })
}
