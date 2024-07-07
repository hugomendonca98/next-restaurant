import { AppError } from '../../../../server/handlers/AppError'
import { ensureAuthenticated } from '../../../../server/handlers/ensureAuthenticated'
import { StorageProvider } from '@/lib/db/providers/StorageProvider/StorageProvider'

export async function POST(request: Request) {
  const auth = await ensureAuthenticated(request)

  if (auth?.error) {
    return AppError({
      message: auth.error,
      status: auth.status,
    })
  }

  const formData = await request.formData()

  // const name = formData.get('name')
  // const description = formData.get('description')
  // const price = formData.get('price')
  const image = formData.get('image') as File

  if (!image) {
    return AppError({
      message: 'Image is required.',
      status: 400,
    })
  }

  const fileName = await StorageProvider().saveFile(image)

  console.log(fileName)

  return Response.json({ message: 'ok' })
}
