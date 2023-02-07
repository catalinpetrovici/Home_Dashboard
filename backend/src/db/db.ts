enum Environment {
  development = 'development',
  production = 'production',
}

const environment = process.env.NODE_ENV || 'development';
import config from './knex-config';
import knex, { Knex } from 'knex';

const KnexInstance: Knex =
  environment !== Environment.production
    ? knex(config.knexDevelopment)
    : knex(config.knexProduction);

export async function connectDB(retries = 5) {
  while (retries) {
    try {
      await KnexInstance.raw('select 1+1 as result');
      console.log('✅ PostgreSQL: Connected successfully!⭐');
      break;
    } catch (error) {
      console.error(`\n❌ Failed to connect to database!💩`, `\n`, ` ${error}`);
      process.exit(1);
    }
  }
}

connectDB();

export default KnexInstance;
