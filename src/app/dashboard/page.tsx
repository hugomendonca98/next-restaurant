import { getServerSession } from 'next-auth/next'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import UpdateUser from '@/components/UpdateUser'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem vindo! {session.user.username}</p>
      <UpdateUser />
    </div>
  )
}
