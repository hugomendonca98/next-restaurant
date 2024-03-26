import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextAuthProvider } from '@/providers/NextAuthProvider'
import { getServerSession } from 'next-auth/next'

import { Toaster } from '@/components/ui/toaster'
import { authOptions } from '@/services/nextAuthConfig'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next restaurant',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
