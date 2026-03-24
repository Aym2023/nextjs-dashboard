import fs from 'fs';
import path from 'path';
import postgres from 'postgres';

/** Load POSTGRES_URL from .env.local / .env when Next didn't inject it (e.g. some scripts). */
function ensurePostgresEnv() {
  if (process.env.POSTGRES_URL) return;

  try {
    const projectRoot = process.cwd();
    const envLocalPath = path.join(projectRoot, '.env.local');
    const envPath = path.join(projectRoot, '.env');

    const candidate = fs.existsSync(envLocalPath)
      ? envLocalPath
      : fs.existsSync(envPath)
        ? envPath
        : null;

    if (candidate) {
      const contents = fs.readFileSync(candidate, 'utf8');
      for (const line of contents.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const [rawKey, ...rest] = trimmed.split('=');
        const key = rawKey.trim();
        const rawValue = rest.join('=').trim();
        const value = rawValue.replace(/^"+|"+$/g, '');

        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  } catch {
    // fall through
  }

  if (!process.env.POSTGRES_URL) {
    throw new Error(
      'POSTGRES_URL is not set. Make sure it exists in .env.local or .env at the project root and restart `npm run dev`.',
    );
  }
}

ensurePostgresEnv();

const connectionString = process.env.POSTGRES_URL as string;
const isLocal =
  connectionString.includes('localhost') ||
  connectionString.includes('127.0.0.1');

/**
 * Serverless Postgres (Neon, Vercel Postgres, many poolers) + postgres.js:
 * prepared statements often trigger XX000 / dropped connections. Disable for remote hosts.
 */
export const sql = postgres(connectionString, {
  ssl: isLocal ? false : 'require',
  ...(!isLocal ? { prepare: false } : {}),
});
