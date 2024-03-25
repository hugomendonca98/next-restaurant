import { NextResponse } from 'next/server'

interface IAppError {
  message: string
  status?: number
}

export function AppError({ message, status = 400 }: IAppError) {
  return NextResponse.json(
    {
      error: {
        message,
      },
    },
    {
      status,
    },
  )
}
