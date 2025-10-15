import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './drizzle',
  schema: './server/db/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
})
