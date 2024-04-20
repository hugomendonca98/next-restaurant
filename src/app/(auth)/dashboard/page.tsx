import { getServerSession } from 'next-auth/next'
import React from 'react'

import { redirect } from 'next/navigation'

import { apiServer } from '@/services/apiServer'
import { apiErrors } from '@/services/handlers/apiErrors'

import { authOptions } from '@/services/nextAuthConfig'
import { DashboardPage } from '@/components/dashboardPage'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/')
  }

  await getUsers()

  return (
    <div>
      <DashboardPage />
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
