import { AppError } from '@/server/handlers/AppError'
import { db } from '../../../../../db/providers/drizzle'
import { userToken, users } from '../../../../../db/schema'

import { hashProvider } from '../../../../../db/providers/HashProvider/HashProvider'
import { sign } from 'jsonwebtoken'
import authConfig from '@/server/authConfig'
import { NextResponse } from 'next/server'

import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  console.group('bateu')

  const user = await db.select().from(users).where(eq(users.email, email))

  console.log('user', user)

  if (user.length < 1) {
    return AppError({
      message: 'User not found.',
      status: 401,
    })
  }

  const passwordMatched = await hashProvider.compareHash(
    password,
    user[0].password,
  )

  console.log('passwordMatched', passwordMatched)

  if (!passwordMatched) {
    return AppError({
      message: 'Invalid credentials.',
      status: 401,
    })
  }

  const { secret, expireIn } = authConfig.jwt

  const token = sign({ id: user[0].id }, secret, { expiresIn: expireIn })

  await db.insert(userToken).values({
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toDateString(),
    token,
    userId: user[0].id,
  })

  return NextResponse.json({
    user: { email: user[0].email, id: user[0].id, username: user[0].username },
    token,
  })
}
