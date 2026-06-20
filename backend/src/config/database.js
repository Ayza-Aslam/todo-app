const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool(
  env.databaseUrl
    ? {
        connectionString: env.databaseUrl,
        // Railway Postgres requires SSL even when NODE_ENV is unset
        ssl: { rejectUnauthorized: false },
      }
    : env.pg
);

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err.message);
});

module.exports = pool;
