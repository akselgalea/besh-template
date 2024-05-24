import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import * as Schema from './schema'

export const sqlite = new Database('sqlite.db')
export const db = drizzle(sqlite, { schema: Schema })
