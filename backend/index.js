const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DEBUG LOGS
========================= */
console.log("App starting...");
console.log("PORT:", process.env.PORT);
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "FOUND" : "MISSING");

/* =========================
   DATABASE (SAFE)
========================= */
let pool = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      text VARCHAR(255),
      done BOOLEAN DEFAULT FALSE
    )
  `)
  .then(() => console.log("DB Ready 🚀"))
  .catch(err => console.log("DB Init Error:", err.message));
}

/* =========================
   TEST ROUTES
========================= */
app.get('/', (req, res) => {
  res.send("Todo API running 🚀");
});

app.get('/test', (req, res) => {
  res.json({ message: "Backend working fine 🚀" });
});

/* =========================
   TODOS ROUTES
========================= */
app.get('/todos', async (req, res) => {
  try {
    if (!pool) return res.status(500).json({ error: "DB not connected" });

    const result = await pool.query('SELECT * FROM todos ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/todos', async (req, res) => {
  try {
    if (!pool) return res.status(500).json({ error: "DB not connected" });

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

app.put('/todos/:id', async (req, res) => {
  try {
    if (!pool) return res.status(500).json({ error: "DB not connected" });

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

app.delete('/todos/:id', async (req, res) => {
  try {
    if (!pool) return res.status(500).json({ error: "DB not connected" });

    const { id } = req.params;

    await pool.query('DELETE FROM todos WHERE id = $1', [id]);

    res.json({ message: "Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   START SERVER (RAILWAY SAFE)
========================= */
const PORT = process.env.PORT || 3004;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});