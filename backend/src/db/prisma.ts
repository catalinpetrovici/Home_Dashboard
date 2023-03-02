import { PrismaClient } from '@prisma/client';
import { logger } from '../log/pino';

const db = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function connectToDatabase() {
  try {
    await db.$connect();
    logger.info('✅✅✅ PostgreSQL: Connected successfully!');
    // console.log('✅✅✅ PostgreSQL: Connected successfully!💃');
  } catch (error) {
    logger.error({ error }, `❌❌❌ PostgreSQL: Connected successfully! 💩`);
    // console.error(
    //   `\n❌❌❌ PostgreSQL: Failed to connect to database!💩 ${error}`
    // );
    process.exit(1);
  }
}

connectToDatabase();

export default db;
