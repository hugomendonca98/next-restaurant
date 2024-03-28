/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === 'update' && session?.username) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.username = session.username
      }
      if (account && account.type === 'credentials') {
        token.userId = account.providerAccountId
        token.username = user.username
        token.accessToken = user.token
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.userId
      session.user.username = token.username
      session.user.token = token.accessToken

      return session
    },
  },
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      type: 'credentials',
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('credentials', credentials)

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/users/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          },
        )

        if (!data?.ok) {
          console.log('authResponse', data)
          throw new Error(
            JSON.stringify({
              errors: await data.json().then((res: any) => res.error.message),
              status: 401,
            }),
          )
        }

        const { user, token } = await data.json()

        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        // api.then(
        //   (axios) =>
        //     (axios.defaults.headers.common.Authorization = `Bearer ${token}`),
        // )

        return {
          ...user,
          token,
        }
      },
    }),
  ],
}
