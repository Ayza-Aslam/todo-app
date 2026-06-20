const pool = require('../config/database');
const AppError = require('../utils/AppError');

async function getAllTodos() {
  const result = await pool.query(
    'SELECT id, text, done, created_at, updated_at FROM todos ORDER BY id ASC'
  );
  return result.rows;
}

async function createTodo(text) {
  const result = await pool.query(
    'INSERT INTO todos (text, done) VALUES ($1, $2) RETURNING id, text, done, created_at, updated_at',
    [text.trim(), false]
  );
  return result.rows[0];
}

async function toggleTodo(id) {
  const result = await pool.query(
    `UPDATE todos
     SET done = NOT done, updated_at = NOW()
     WHERE id = $1
     RETURNING id, text, done, created_at, updated_at`,
    [id]
  );

  if (result.rowCount === 0) {
    throw new AppError('Todo not found', 404);
  }

  return result.rows[0];
}

async function deleteTodo(id) {
  const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING id', [id]);

  if (result.rowCount === 0) {
    throw new AppError('Todo not found', 404);
  }
}

module.exports = {
  getAllTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
};
