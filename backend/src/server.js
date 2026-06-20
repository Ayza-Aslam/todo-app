const app = require('./app');
const env = require('./config/env');
const { initDatabase } = require('./db/init');

async function startServer() {
  try {
    await initDatabase();
    console.log('Database ready');

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} (${env.nodeEnv})`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
