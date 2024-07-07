'server only'

import crypto from 'crypto'
import { storageConfig } from '../StorageConfig'
import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'

export const S3StorageProvider = {
  async saveFile(file: File): Promise<string> {
    const s3 = new S3Client({
      region: storageConfig.aws.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    })

    // Cria o buffer do arquivo para o AWS S3
    const buffer = Buffer.from(await file.arrayBuffer())

    // Cria um hash aleatório para o nome do arquivo
    const fileHash = crypto.randomBytes(10).toString('hex')

    // Concatena o hash com o nome do arquivo
    const fileName = `${fileHash}-${file.name}`

    const uploadToS3 = new PutObjectCommand({
      Bucket: storageConfig.aws.bucket,
      Key: fileName,
      Body: buffer,
      ACL: 'public-read',
      ContentType: file.type,
    })
    await s3.send(uploadToS3)

    return file.name
  },

  async deleteFile(file: string): Promise<void> {
    const s3 = new S3Client({
      region: storageConfig.aws.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    })

    const deleteFromS3 = new DeleteObjectCommand({
      Bucket: storageConfig.aws.bucket,
      Key: file,
    })

    await s3.send(deleteFromS3)
  },
}
