/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'
import { RedirectError } from './handlers/RedirectError'
import { getSession, signOut } from 'next-auth/react'

// const signOut = () => {
//     destroyCookie({}, '@meupack:token', {
//       path: '/',
//     })
//     destroyCookie({}, '@meupack:user', {
//       path: '/',
//     })
//     if (typeof window !== 'undefined') {
//       window.location.href = '/conta/entrar'
//       return window.location.reload()
//     }
// }

export const baseURL = process.env.NEXT_PUBLIC_API

export async function setupAPIClient() {
  // const session = await getServerSession(authOptions)

  const session = await getSession()

  // const {data: session} = useSession();

  const token = session?.user?.token
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })

  api.interceptors.response.use(
    (response: any) => response,
    (error: AxiosError<any>) => {
      if (error.response?.status === 401) {
        console.log('error.response.data', error.response.data.error.message)
        if (error.response.data.error.message.includes('Invalid token.')) {
          if (typeof window !== 'undefined') {
            return signOut()
          } else {
            return Promise.reject(new RedirectError())
          }
        }
      }
      return Promise.reject(error)
    },
  )

  return api
}
