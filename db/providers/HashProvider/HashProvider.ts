import { hash, compare } from 'bcryptjs'

async function generateHash(payload: string): Promise<string> {
  return hash(payload, 8)
}

async function compareHash(payload: string, hashed: string): Promise<boolean> {
  return compare(payload, hashed)
}

export const hashProvider = {
  generateHash,
  compareHash,
}
