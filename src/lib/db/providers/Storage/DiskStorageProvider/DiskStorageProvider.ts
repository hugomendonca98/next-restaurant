'server only'

import fs from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import { storageConfig } from '../StorageConfig'

export const DiskStorageProvider = {
  async saveFile(file: File): Promise<string> {
    try {
      // Caso a pasta temporária não exista, cria-a
      if (!fs.existsSync(storageConfig.tempFolder)) {
        fs.mkdirSync(storageConfig.tempFolder)
      }

      // Caso a pasta de upload não exista, cria-a
      if (!fs.existsSync(storageConfig.uploadsFolder)) {
        fs.mkdirSync(storageConfig.uploadsFolder)
      }

      const buffer = Buffer.from(await file.arrayBuffer())

      // Cria um hash aleatório para o nome do arquivo
      const fileHash = crypto.randomBytes(10).toString('hex')

      // Concatena o hash com o nome do arquivo
      const fileName = `${fileHash}-${file.name}`

      // Escreve o arquivo no disco
      await writeFile(
        path.join(process.cwd(), 'public/temp/' + fileName),
        buffer,
      )

      // Move o arquivo para a pasta de upload
      await fs.promises.rename(
        path.resolve(process.cwd(), 'public/temp/' + fileName),
        path.resolve(process.cwd(), 'public/uploads/' + fileName),
      )
    } catch (error) {
      console.log('aqui', error)
      throw new Error('There was an error loading the file.')
    }

    return file.name
  },

  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(storageConfig.uploadsFolder, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  },
}
