 const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
app.use(cors());
app.use(express.json());
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'tododb',
password: 'Aiza',
port: 5432
});
pool.query(`  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    done BOOLEAN DEFAULT FALSE
  )`).then(() => console.log('Table ready'))
.catch(err => console.log('DB Error:', err.message));
app.get('/todos', async (req, res) => {
try {
const result = await pool.query('SELECT \* FROM todos ORDER BY id');
res.json(result.rows);
} catch (err) {
console.log(err.message);
res.status(500).json({ error: err.message });
}
});
app.post('/todos', async (req, res) => {
try {
const { text } = req.body;
const result = await pool.query(
'INSERT INTO todos (text, done) VALUES ($1, $2) RETURNING \*',
[text, false]
);
res.json(result.rows[0]);
} catch (err) {
console.log(err.message);
res.status(500).json({ error: err.message });
}
});
app.put('/todos/\:id', async (req, res) => {
try {
const { id } = req.params;
const result = await pool.query(
'UPDATE todos SET done = NOT done WHERE id = $1 RETURNING \*',
[id]
);
res.json(result.rows[0]);
} catch (err) {
console.log(err.message);
res.status(500).json({ error: err.message });
}
});
app.delete('/todos/\:id', async (req, res) => {
try {
const { id } = req.params;
await pool.query('DELETE FROM todos WHERE id = $1', [id]);
res.json({ message: 'Deleted' });
} catch (err) {
console.log(err.message);
res.status(500).json({ error: err.message });
}
});
app.listen(3004, () => {
console.log('Server running!');
});