'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

export default function UpdateUser() {
  const { update } = useSession()
  return (
    <div>
      <button onClick={async () => await update({ username: 'hugoupdated' })}>
        Update
      </button>
    </div>
  )
}
