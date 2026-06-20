const express = require('express');
const healthRoutes = require('./health.routes');
const todosRoutes = require('./todos.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/todos', todosRoutes);

module.exports = router;
