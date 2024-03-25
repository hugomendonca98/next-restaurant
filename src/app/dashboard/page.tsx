import { getServerSession } from 'next-auth/next'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

import { apiServer } from '@/services/apiServer'
import { apiErrors } from '@/services/handlers/apiErrors'
import { Orders } from '@/components/orders'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/')
  }

  const response = await getUsers()

  return (
    <div>
      <Orders />
    </div>
  )
}

const getUsers = async () => {
  const api = await apiServer()

  try {
    const response = await api.get('/users')
    const data = await response.data

    return data
  } catch (error) {
    apiErrors(error)
    return {}
  }
}
