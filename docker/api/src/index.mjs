import Fastify from 'fastify';
import cors from '@fastify/cors';
import connect, { sql } from '@databases/sqlite';
import initDb from './initDb.mjs';

const PORT = process.env.PORT || 4000;

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

fastify.post('/record', async function handler(request, reply) {
  const currentDate = getDate();
  const recordData = request.body;

  // Validate that necessary fields are present
  if (!recordData || !recordData.incomes || !recordData.expenses || !recordData.investments) {
    return reply.status(400).send({ error: 'Invalid data structure' });
  }

  try {
    const query = [].concat(
      recordData.incomes.map(
        (record) => sql`
              (${record.id}, ${record.name}, ${record.value}, 'incomes', ${currentDate}, ${record.checked})
              `
      ),
      recordData.expenses.map(
        (record) => sql`
              (${record.id}, ${record.name}, ${record.value}, 'expenses', ${currentDate}, ${record.checked})
              `
      ),
      recordData.investments.map(
        (record) => sql`
              (${record.id}, ${record.name}, ${record.value}, 'investments', ${currentDate}, ${record.checked})
              `
      )
    );

    // Insert into registers
    await db.query(sql`
          INSERT INTO registers (referenceDate)
          VALUES (${currentDate})
      `);

    // Insert into records
    await db.query(sql`
          INSERT INTO records (id, name, value, type, referenceDate, checked) VALUES
          ${sql.join(query, sql`, `)}
      `);

    return { ok: true };
  } catch (error) {
    // Log the error for debugging purposes
    fastify.log.error(error);
    return reply.status(500).send({ error: 'Database operation failed' });
  }
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

fastify.post(
  '/version',
  {
    preHandler: (request) => {
      if (request.headers['content-type'] === 'application/json' && !request.body) {
        request.body = {}; // Set to an empty object
      }
    },
  },
  async function handler() {
    const result = await db.query(sql`
    SELECT value FROM version LIMIT 1
    `);
    const value = result[0];
    const incrementedValue = (value ?? 0) + 1;

    await db.query(sql`
    INSERT INTO version (value) VALUES (${incrementedValue})
    `);
    return { ok: true };
  }
);

fastify.get('/ping', async function handler() {
  return { data: 'pong' };
});

function getDate() {
  const date = new Date().toISOString().split('-');
  return `${date[0]}-${date[1]}`;
}
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    await initDb(db);
    fastify.log.info(`server listening on ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
