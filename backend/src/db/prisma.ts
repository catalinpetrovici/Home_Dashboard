import { PrismaClient } from '@prisma/client';
import Logger from '../log/pino';

const db = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function connectToDatabase() {
  try {
    await db.$connect();
    Logger.info('✅✅✅ PostgreSQL: Connected successfully!');
  } catch (error) {
    Logger.error({ error }, `❌❌❌ PostgreSQL: Connected successfully! 💩`);
    process.exit(1);
  }
}

connectToDatabase();

export default db;
