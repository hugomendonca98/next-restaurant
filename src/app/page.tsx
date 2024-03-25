import { Login } from '@/components/Login'
import { SignUp } from '@/components/SignUp'
import { Suspense } from 'react'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { createAccount } = searchParams

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!createAccount && (
        <Suspense>
          <Login />
        </Suspense>
      )}
      {createAccount && (
        <Suspense>
          <SignUp />
        </Suspense>
      )}
    </main>
  )
}
