import type { Config } from 'drizzle-kit'
// import { loadEnvConfig } from '@next/env'
// import { cwd } from 'node:process'

// loadEnvConfig(cwd())

// import * as dotenv from 'dotenv'
// dotenv.config({ path: '.env.local' })

export default {
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './local.db',
  },
  verbose: true,
  strict: true,
} satisfies Config
