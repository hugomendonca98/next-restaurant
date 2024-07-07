import path from 'path'

export const storageConfig = {
  tempFolder: path.resolve(
    process.cwd(),
    process.env.TEMP_FOLDER || 'public/temp/',
  ),
  uploadsFolder: path.resolve(
    process.cwd(),
    process.env.UPLOADS_FOLDER || 'public/uploads',
  ),
  aws: {
    bucket: process.env.AWS_BUCKET_NAME!,
    region: process.env.AWS_DEFAULT_REGION!,
  },
}
