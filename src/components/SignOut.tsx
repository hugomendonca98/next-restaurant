'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

export default function SignOut() {
  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
    // return window.location.reload()
  }

  return (
    <div>
      <button onClick={handleSignOut} style={{ background: 'red' }}>
        SignOut
      </button>
    </div>
  )
}
