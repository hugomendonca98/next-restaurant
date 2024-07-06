import { AppError } from '../../../../server/handlers/AppError'
import { ensureAuthenticated } from '../../../../server/handlers/ensureAuthenticated'

export async function POST(request: Request) {
  const auth = await ensureAuthenticated(request)

  if (auth?.error) {
    return AppError({
      message: auth.error,
      status: auth.status,
    })
  }

  //   const { name, description, price, image } = await request.json()
}
