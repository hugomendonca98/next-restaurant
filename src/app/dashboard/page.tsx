import { getServerSession } from 'next-auth/next'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import UpdateUser from '@/components/UpdateUser'
import { api } from '@/services/apiClient'
import SignOut from '@/components/SignOut'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/')
  }

  const response = await getUsers()
  console.log('data kkkkk', response?.data)

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem vindo! {session.user.username}</p>
      <UpdateUser />
      <SignOut />

      <h1>USERS:</h1>
      <ul>
        {response?.data.map((user) => <li key={user.id}>{user.username}</li>)}
      </ul>
    </div>
  )
}

const getUsers = async () => {
  const response = await (await api).get('/users')

  const data = await response.data

  return data
}
