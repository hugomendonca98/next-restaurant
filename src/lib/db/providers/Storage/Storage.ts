import { DiskStorageProvider } from './DiskStorageProvider/DiskStorageProvider'
import { S3StorageProvider } from './S3StorageProvider/S3StorageProvider'

export const StorageProvider = () => {
  if (process.env.STORAGE_DRIVER === 's3') {
    return S3StorageProvider
  }

  return DiskStorageProvider
}
