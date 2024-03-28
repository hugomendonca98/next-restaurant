'use client'

import { useToast } from '@/components/ui/use-toast'
import { api } from '@/services/apiClient'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type IHandleLogin = {
  email: string
  password: string
}

type IHandleCreateUser = {
  username: string
  email: string
  password: string
}

export function useAuth() {
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)

  const handleSign = async ({ email, password }: IHandleLogin) => {
    setLoading(true)

    const data = await signIn('login', {
      email,
      password,
      redirect: false,
    })

    console.log('aquiiii', data)

    setLoading(false)

    if (!data?.ok) {
      return toast({
        variant: 'default',
        duration: 3000,
        title: JSON.parse(data?.error ? data.error : JSON.stringify(''))
          ?.errors,
      })
    }

    router.push('/dashboard')
  }

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
    // return window.location.reload()
  }

  const handleCreateUser = async ({
    username,
    email,
    password,
  }: IHandleCreateUser) => {
    try {
      await (
        await api
      ).post('/users', {
        username,
        email,
        password,
      })

      router.push('/dashboard')
    } catch (error) {
      toast({
        variant: 'default',
        duration: 3000,
        title: error as string,
      })
    }
  }

  return { handleSign, loading, handleSignOut, handleCreateUser }
}
