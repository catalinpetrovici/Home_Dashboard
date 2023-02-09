import { PrismaClient } from '@prisma/client';
const db = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function connectToDatabase() {
  try {
    await db.$connect();
    console.log('✅✅✅ PostgreSQL: Connected successfully!💃');
  } catch (error) {
    console.error(
      `\n❌❌❌ PostgreSQL: Failed to connect to database!💩 ${error}`
    );
  }
}

connectToDatabase();

export default db;
