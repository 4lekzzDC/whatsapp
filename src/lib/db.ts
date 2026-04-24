/**
 * Cliente Postgres com pool compartilhado.
 *
 * Se DATABASE_URL não está definido, `query()` lança um erro claro.
 * Isso permite que o build e o dev server rodem sem DB — as rotas que
 * dependem dele retornam 503 e as páginas com mock continuam funcionando.
 */

import { Pool, type QueryResult, type QueryResultRow } from "pg";
import { env } from "./env";

let _pool: Pool | null = null;

function pool(): Pool {
  if (_pool) return _pool;
  const url = env.databaseUrl();
  if (!url) {
    throw new Error(
      "DATABASE_URL não configurado. Configure .env antes de usar o banco."
    );
  }
  _pool = new Pool({
    connectionString: url,
    max: 10,
    idleTimeoutMillis: 30_000,
  });
  _pool.on("error", (err) => {
    // eslint-disable-next-line no-console
    console.error("[pg] erro inesperado no cliente ocioso:", err);
  });
  return _pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: readonly unknown[]
): Promise<QueryResult<T>> {
  const p = pool();
  return p.query<T>(text, params as unknown[] | undefined);
}

export async function one<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: readonly unknown[]
): Promise<T | null> {
  const { rows } = await query<T>(text, params);
  return rows[0] ?? null;
}

export async function many<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: readonly unknown[]
): Promise<T[]> {
  const { rows } = await query<T>(text, params);
  return rows;
}

export async function tx<T>(fn: (q: typeof query) => Promise<T>): Promise<T> {
  const client = await pool().connect();
  try {
    await client.query("BEGIN");
    const bound: typeof query = (text, params) =>
      client.query(text, params as unknown[] | undefined);
    const out = await fn(bound);
    await client.query("COMMIT");
    return out;
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}

export function isDbReady(): boolean {
  return env.dbReady();
}
