import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { setupAPIClient } from '@/services/api'
import { getServerSession } from 'next-auth/next'

// Usado para fazer req server side.
export async function apiServer() {
  const session = await getServerSession(authOptions)

  const api = await setupAPIClient()

  if (session?.user?.token) {
    api.defaults.headers.Authorization = `Bearer ${session?.user?.token}`
  }

  return api
}
