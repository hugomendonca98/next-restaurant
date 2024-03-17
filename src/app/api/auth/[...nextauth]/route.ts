import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.userId
      session.user.username = token.username

      return session
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials-login',
      name: 'login',
      type: 'credentials',
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('credentials', credentials)
        const authResponse = await fetch(
          'http://localhost:3000/api/users/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          },
        )

        if (!authResponse.ok) {
          throw new Error(
            JSON.stringify({
              errors: await authResponse
                .json()
                .then((data) => data.error.message),
              status: 401,
            }),
          )
        }

        const { user, token } = await authResponse.json()

        return {
          ...user,
          token,
        }
      },
    }),
  ],
}

const nextAuthHandler = NextAuth({
  ...authOptions,
})

export { nextAuthHandler as GET, nextAuthHandler as POST }
