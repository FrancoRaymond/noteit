import { Pool } from 'pg';
import 'dotenv/config';

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...(isProduction && {
    ssl: { rejectUnauthorized: false },
  }),
});

pool.on('error', (err) => {
  console.error('Unexpected idle PostgreSQL client error:', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
export default pool;
