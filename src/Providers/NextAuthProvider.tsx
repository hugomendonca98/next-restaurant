'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

interface NextAuthProviderProps {
  children: React.ReactNode
  session: Session | null
}

export async function NextAuthProvider({
  children,
  session,
}: NextAuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
