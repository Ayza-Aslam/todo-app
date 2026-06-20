const env = require('../config/env');

function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  if (!err.isOperational) {
    console.error(err);
  }

  res.status(statusCode).json({
    error: message,
    ...(env.nodeEnv === 'development' && !err.isOperational && { stack: err.stack }),
  });
}

module.exports = errorHandler;
