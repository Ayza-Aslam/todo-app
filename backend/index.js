const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
DEBUG: ENV CHECK
========================= */
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "FOUND" : "MISSING");

/* =========================
DATABASE CONNECTION
========================= */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* =========================
SAFE DB CONNECTION CHECK
========================= */
/*pool.connect()
  .then(client => {
    console.log("DB Connected 🚀");

    return client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        done BOOLEAN DEFAULT FALSE
      )
    `).then(() => client.release());
  })
  .catch(err => console.log("DB Error:", err.message));
*/
/* =========================
TEST ROUTE
========================= */
app.get('/', (req, res) => {
  res.send("Todo API is running 🚀");
});

app.get('/test', (req, res) => {
  res.json({ message: "Backend working fine 🚀" });
});

/* =========================
ROUTES
========================= */

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add todo
app.post('/todos', async (req, res) => {
  try {
    const { text } = req.body;

    const result = await pool.query(
      'INSERT INTO todos (text, done) VALUES ($1, $2) RETURNING *',
      [text, false]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Toggle todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'UPDATE todos SET done = NOT done WHERE id = $1 RETURNING *',
      [id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM todos WHERE id = $1', [id]);

    res.json({ message: 'Deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
START SERVER (RAILWAY SAFE)
========================= */
const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});