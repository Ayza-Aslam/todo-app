const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DATABASE (LOCAL + CLOUD SAFE)
========================= */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false
});

/* =========================
   SAFE TABLE INIT
========================= */
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        done BOOLEAN DEFAULT FALSE
      )
    `);
    console.log("DB Ready 🚀");
  } catch (err) {
    console.log("DB Error:", err.message);
  }
};

initDB();

/* =========================
   ROUTES
========================= */

// Health check
app.get('/', (req, res) => {
  res.send("Todo API Running 🚀");
});

// Test route
app.get('/test', (req, res) => {
  res.json({ status: "OK", message: "Server working fine 🚀" });
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id');
    res.json(result.rows);
  } catch (err) {
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
    res.status(500).json({ error: err.message });
  }
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM todos WHERE id = $1', [id]);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   START SERVER (CLOUD SAFE)
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});