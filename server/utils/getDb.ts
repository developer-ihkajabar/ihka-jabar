import { D1Database } from "@cloudflare/workers-types";
import { drizzle } from 'drizzle-orm/d1';
import * as schema from "@@/server/db/schema"

export function getDb(event: any) {
  const d1Db = event.context.cloudflare.env.DB as D1Database
  return drizzle(d1Db, { schema })
}
