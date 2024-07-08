import { AppError } from '../../../../server/handlers/AppError'
import { ensureAuthenticated } from '../../../../server/handlers/ensureAuthenticated'
import { StorageProvider } from '@/lib/db/providers/StorageProvider/StorageProvider'
import { createProductSchema } from './createProductSchema'
import { fromZodError } from '@/lib/db/helpers/handleZodError'
import { db } from '@/lib/db/providers/drizzle'
import { productImages, products } from '@/lib/db/schema'

export async function POST(request: Request) {
  const auth = await ensureAuthenticated(request)

  if (auth?.error) {
    return AppError({
      message: auth.error,
      status: auth.status,
    })
  }

  const formData = await request.formData()

  const formDataObj = Object.fromEntries(formData.entries())

  const { data, error } = createProductSchema.safeParse({
    ...formDataObj,
    price: Number(formDataObj.price),
  })

  if (error) {
    const { error: zodError } = fromZodError(error)

    return AppError({
      message: zodError.message,
      status: 400,
    })
  }

  const { description, image, name, price } = data
  const userId = Number(request.user.id)

  const productId = await db
    .insert(products)
    .values({
      name,
      description,
      price,
      userId,
    })
    .returning({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      userId: products.userId,
    })

  const imageKey = await StorageProvider().saveFile(image)

  const productImage = await db
    .insert(productImages)
    .values({
      imageKey,
      productId: productId[0].id,
    })
    .returning({
      id: productImages.id,
      imageKey: productImages.imageKey,
      productId: productImages.productId,
    })

  if (!productImage[0]?.id || !productId[0]?.id) {
    await StorageProvider().deleteFile(imageKey)

    return AppError({
      message: 'Failed to create product',
      status: 500,
    })
  }

  return Response.json({
    ...productId[0],
    ...productImage[0],
  })
}
