const pool = require('../config/database');

async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      text VARCHAR(255) NOT NULL,
      done BOOLEAN DEFAULT FALSE
    )
  `);

  await pool.query(`
    ALTER TABLE todos ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW()
  `);
  await pool.query(`
    ALTER TABLE todos ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()
  `);

  console.log('Todos table ready');
}

module.exports = { initDatabase };
