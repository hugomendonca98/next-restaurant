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

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!user) {
    return AppError({
      message: 'Usuário não encontrado.',
      status: 401,
    })
  }

  const passwordMatched = await hashProvider.compareHash(
    password,
    user.password,
  )

  if (!passwordMatched) {
    return AppError({
      message: 'Usuário ou senha inválidos.',
      status: 401,
    })
  }

  const { secret, expireIn } = authConfig.jwt

  const token = sign({ id: user.id }, secret, { expiresIn: expireIn })

  // await db.insert(userToken).values({
  //   expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toDateString(),
  //   token,
  //   userId: user.id,
  // })

  return NextResponse.json({
    user: { email: user.email, id: user.id, username: user.username },
    token,
  })
}
