const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool(
  env.databaseUrl
    ? {
        connectionString: env.databaseUrl,
        ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
      }
    : env.pg
);

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err.message);
});

module.exports = pool;
