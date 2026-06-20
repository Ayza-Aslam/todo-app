const express = require('express');
const todosController = require('../controllers/todos.controller');

const router = express.Router();

router.get('/', todosController.getTodos);
router.post('/', todosController.createTodo);
router.put('/:id', todosController.toggleTodo);
router.delete('/:id', todosController.removeTodo);

module.exports = router;
