'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Login() {
  const router = useRouter()
  const handleSign = async () => {
    const data = await signIn('credentials-login', {
      email: 'hugo1234@gmail.com',
      password: 'Teste*123',
      redirect: false,
    })

    console.log('aquiiii', data)

    if (!data?.ok) {
      return alert(data?.error)
    }

    router.push('/dashboard')
  }

  return (
    <div>
      <h1>teste</h1>
      <button onClick={handleSign} style={{ background: 'green' }}>
        LOGIN
      </button>
    </div>
  )
}
