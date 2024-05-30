import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    dbName: 'sqlite',
    url: `file:${__dirname}/sqlite.db`
  }
})
