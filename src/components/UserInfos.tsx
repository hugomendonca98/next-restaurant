'use client'

import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

export async function UserInfos() {
  const { data: session } = useSession()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState(() => session?.user)
  return (
    <div>
      <h1>{user?.username}</h1>
    </div>
  )
}
