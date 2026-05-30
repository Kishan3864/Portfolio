import { Pool } from "pg";

// A single shared connection pool, reused across requests (and dev hot-reloads).
// Connection string comes from DATABASE_URL (set in .env.local on the server,
// never committed). The portfolio DB is local to the server (127.0.0.1), so no SSL.
const globalForPg = globalThis as unknown as { _pgPool?: Pool };

export const pool =
  globalForPg._pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg._pgPool = pool;
}
