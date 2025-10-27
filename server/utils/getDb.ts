import type { D1Database } from '@cloudflare/workers-types'
import * as schema from '@@/server/db/schema'
import { drizzle } from 'drizzle-orm/d1'

export function getDb(event: any) {
  const d1Db = event.context.cloudflare.env.ihka_jabar_v2 as D1Database
  return drizzle(d1Db, { schema })
}
