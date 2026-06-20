require('dotenv').config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3004,
  databaseUrl: process.env.DATABASE_URL,
  pg: {
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'tododb',
    password: process.env.PGPASSWORD || '',
    port: Number(process.env.PGPORT) || 5432,
  },
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};

env.corsOrigins = env.clientUrl.split(',').map((origin) => origin.trim()).filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin) return true;

  if (env.corsOrigins.includes(origin)) return true;

  // Allow Vercel production + preview deployments
  if (/^https:\/\/[\w-]+\.vercel\.app$/.test(origin)) return true;

  return env.nodeEnv !== 'production' && origin.startsWith('http://localhost');
}

env.isAllowedOrigin = isAllowedOrigin;

module.exports = env;
