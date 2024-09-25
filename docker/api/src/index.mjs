import Fastify from 'fastify';
import cors from '@fastify/cors';
import connect, { sql } from '@databases/sqlite';
import initDb from './initDb.mjs';
const fastify = Fastify({
  logger: false,
});

await fastify.register(cors, {
  origin: true,
});
let db = connect('./db.sqlite');
fastify.get('/record', async function handler() {
  const currentDate = getDate();
  const result = await db.query(sql`
    SELECT 
    r.id AS register_id,
    r.referenceDate,
    rec.id AS record_id,
    rec.checked,
    rec.name,
    rec.value,
    rec.type
FROM 
    registers r
LEFT JOIN 
    records rec ON r.id = rec.referenceDate
WHERE 
    r.referenceDate = ${currentDate}
LIMIT 1
    `);

  const incomes = result
    .filter((record) => record.type === 'incomes')
    .map((record) => {
      return {
        id: record.record_id,
        name: record.name,
        value: record.value,
        checked: record.checked,
      };
    });
  const expenses = result
    .filter((record) => record.type === 'expenses')
    .map((record) => {
      return {
        id: record.record_id,
        name: record.name,
        value: record.value,
        checked: record.checked,
      };
    });
  const investments = result
    .filter((record) => record.type === 'investments')
    .map((record) => {
      return {
        id: record.record_id,
        name: record.name,
        value: record.value,
        checked: record.checked,
      };
    });

  const response = {
    ok: true,
    data: {
      id: result[0].register_id,
      date: currentDate,
      records: {
        incomes,
        expenses,
        investments,
      },
    },
  };

  return response;
});

fastify.post('/record', async function handler(request) {
  const currentDate = getDate();
  const recordData = request.body;

  const query = [].concat(
    recordData.incomes.map(
      (record) => sql`
    (${record.name}, ${record.value}, incomes, ${currentDate}, ${record.checked})
  `
    ),
    recordData.expenses.map(
      (record) => sql`
    (${record.name}, ${record.value}, expenses, ${currentDate}, ${record.checked})
  `
    ),
    recordData.investments.map(
      (record) => sql`
    (${record.name}, ${record.value}, investments, ${currentDate}, ${record.checked})
  `
    )
  );

  await db.query(sql`
    INSERT INTO registers (referenceDate)
    VALUES (${currentDate})
  `);

  await db.query(sql`
    INSERT INTO records (id, name, value, type, referenceDate, checked) VALUES
    ${sql.join(query, sql`,`)}
  `);

  return { ok: true };
});

fastify.get('/extract', async function handler() {
  return {
    data: 'https://www.reddit.com/r/learnpython/comments/bfz8l2/what_are_your_favorite_free_public_apifree_ones.csv',
  };
});

fastify.get('/version', async function handler() {
  const result = await db.query(sql`
    SELECT 1 FROM version
    `);
  return { data: result[0] };
});

fastify.post('/version', async function handler() {
  const result = await db.query(sql`
    SELECT value FROM version LIMIT 1
    `);
  const value = result[0];
  const incrementedValue = (value ?? 0) + 1;

  await db.query(sql`
    INSERT INTO version (value) VALUES (${incrementedValue})
    `);
  return { ok: true };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    await initDb(db);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

function getDate() {
  const date = new Date().toISOString().split('-');
  return `${date[0]}-${date[1]}`;
}

start();
