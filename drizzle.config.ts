import { defineConfig } from 'drizzle-kit'
import { ConnectionOptions } from 'tls'

// import * as dotenv from 'dotenv'
// dotenv.config({ path: '.env.local' })

import 'dotenv/config'

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST as string,
    url: process.env.DB_URL as string,
    port: process.env.DB_PORT as unknown as number,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    ssl: process.env.DB_SSL as ConnectionOptions,
  },
})
