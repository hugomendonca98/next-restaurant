/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound, redirect } from 'next/navigation'

import { RedirectError } from '@/services/handlers/RedirectError'

export function apiErrors(error: any) {
  if (error instanceof RedirectError) {
    return redirect('/redirect/logout')
  }

  if (
    error.response.data.status === 404 ||
    error.response.data.status === 400
  ) {
    return notFound()
  }

  return redirect('/server-error')
}
