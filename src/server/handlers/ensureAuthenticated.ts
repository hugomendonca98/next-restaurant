import { headers } from 'next/headers'

import { verify } from 'jsonwebtoken'
import authConfig from '../authConfig'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export const ensureAuthenticated = async (request: Request) => {
  const headersList = headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) {
    return {
      error: 'No token provided.',
      status: 401,
    }
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as ITokenPayload

    request.user = {
      id: sub,
    }

    return {
      success: true,
      status: 200,
    }
  } catch (err) {
    return {
      error: 'Invalid token.',
      status: 401,
    }
  }
}
