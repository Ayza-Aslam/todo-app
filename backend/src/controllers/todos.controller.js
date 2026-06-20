const todosService = require('../services/todos.service');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

function parseTodoId(rawId) {
  const id = Number.parseInt(rawId, 10);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError('Invalid todo id', 400);
  }

  return id;
}

const getTodos = asyncHandler(async (_req, res) => {
  const todos = await todosService.getAllTodos();
  res.json(todos);
});

const createTodo = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (typeof text !== 'string' || !text.trim()) {
    throw new AppError('Todo text is required', 400);
  }

  if (text.trim().length > 255) {
    throw new AppError('Todo text must be 255 characters or fewer', 400);
  }

  const todo = await todosService.createTodo(text);
  res.status(201).json(todo);
});

const toggleTodo = asyncHandler(async (req, res) => {
  const id = parseTodoId(req.params.id);
  const todo = await todosService.toggleTodo(id);
  res.json(todo);
});

const removeTodo = asyncHandler(async (req, res) => {
  const id = parseTodoId(req.params.id);
  await todosService.deleteTodo(id);
  res.status(204).send();
});

module.exports = {
  getTodos,
  createTodo,
  toggleTodo,
  removeTodo,
};
