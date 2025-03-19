import { Elysia } from 'elysia';
import client from './db';
import cors from '@elysiajs/cors';

const app = new Elysia().use(cors());

// Endpoint untuk mendapatkan semua folder
// app.get('/folders', async () => {
//     const res = await client.query('SELECT * FROM folders');
//     return res.rows;
// });

// // Endpoint untuk mendapatkan subfolder dari folder tertentu
// app.get('/folders/:id/subfolders', async ({ params }) => {
//     const { id } = params;
//     const res = await client.query('SELECT * FROM folders WHERE parent_id = $1', [id]);
//     return res.rows;
// });

// app.get('/folders/:id/files', async ({ params }) => {
//   const { id } = params;
//   const res = await client.query('SELECT * FROM files WHERE folder_id = $1', [id]);
//   return res.rows;
// });

app.get('/responded_question', async () => {
  const res = await client.query('SELECT "DIVISI", COUNT(CASE WHEN "RESPONSE_AUDITEE" IS NOT NULL AND "RESPONSE_AUDITEE" != \'\' THEN 1 END) AS "Open", COUNT(CASE WHEN "RESPONSE_AUDITEE" IS NULL OR "RESPONSE_AUDITEE" = \'\' THEN 1 END) AS "Closed" FROM "RESPONSE_AUDITEE_D" GROUP BY "DIVISI" ORDER BY "DIVISI" ASC;');
  return res.rows;
});

app.get('/iso-data', async () => {
  try {
      const query = `
          SELECT 
              i."NOMOR_ISO", 
              COUNT(p."ID_MASTER_PERTANYAAN") AS jumlah_pertanyaan
          FROM "TM_PERTANYAAN" p
          INNER JOIN "TM_ISO" i ON p."ID_ISO" = i."ID_ISO"
          GROUP BY i."NOMOR_ISO"
          ORDER BY i."NOMOR_ISO" ASC;
      `;

      const res = await client.query(query);
      return res.rows;
  } catch (error) {
      console.error('Error fetching ISO data:', error);
      return { error: 'Failed to fetch ISO data' };
  }
});

app.get('/', async () => {
  try {
      const query = `
          SELECT 
              i."NOMOR_ISO", 
              COUNT(p."ID_MASTER_PERTANYAAN") AS jumlah_pertanyaan
          FROM "TM_PERTANYAAN" p
          INNER JOIN "TM_ISO" i ON p."ID_ISO" = i."ID_ISO"
          GROUP BY i."NOMOR_ISO"
          ORDER BY i."NOMOR_ISO" ASC;
      `;

      const res = await client.query(query);
      return res.rows;
  } catch (error) {
      console.error('Error fetching ISO data:', error);
      return { error: 'Failed to fetch ISO data' };
  }
});


app.listen({
  port: 3000,
  hostname: '0.0.0.0', // Atur hostname ke 0.0.0.0
});

console.log(`🦊 Elysia is running at https://0.0.0.0:3000`);