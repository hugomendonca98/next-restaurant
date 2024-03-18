import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      username: string
      token: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    username: string
    accessToken: string
  }
}

declare module 'next-auth' {
  interface User {
    id: string
    username: string
    token: string
  }
}
