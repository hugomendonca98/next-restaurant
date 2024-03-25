'use client'

import { Loader2Icon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React, { useEffect } from 'react'

export default function Page() {
  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
    // return window.location.reload()
  }

  useEffect(() => {
    handleSignOut()
  }, [])

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <Loader2Icon className="animate-spin text-white" size={40} />
    </div>
  )
}
