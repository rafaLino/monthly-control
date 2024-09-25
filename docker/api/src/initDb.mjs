import connect, { sql } from '@databases/sqlite';
export default async function initDb() {
  const db = connect('./db.sqlite');

  await db.query(sql`
    CREATE TABLE IF NOT EXISTS registers (
    id TEXT PRIMARY KEY,
    referenceDate TEXT
);`);

  await db.query(sql`
  CREATE INDEX IF NOT EXISTS idx_registers_referenceDate ON registers(referenceDate);`);

  await db.query(sql`
    CREATE TABLE IF NOT EXISTS records (
    id TEXT PRIMARY KEY,
    name TEXT,
    value REAL,
    type TEXT,
    referenceDate TEXT,
    checked BOOLEAN
);`);

  await db.query(sql`
  CREATE INDEX IF NOT EXISTS idx_records_referenceDate ON records(referenceDate);
  CREATE INDEX IF NOT EXISTS idx_records_type ON records(type);`);

  await db.query(sql`
  CREATE TABLE IF NOT EXISTS version (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value INTEGER);`);
}
