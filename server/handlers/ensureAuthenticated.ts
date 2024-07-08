import { headers } from 'next/headers'

import { verify } from 'jsonwebtoken'
import authConfig from '../authConfig'

interface ITokenPayload {
  id: number
  iat: number
  exp: number
}

export const ensureAuthenticated = async (request: Request) => {
  const headersList = headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) {
    return {
      error: 'Invalid token.',
      status: 401,
    }
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { id } = decoded as ITokenPayload

    request.user = {
      id,
    }

    console.log('decoded', decoded)

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
