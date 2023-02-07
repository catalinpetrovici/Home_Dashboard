/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

// require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const knexDevelopment: Knex.Config = {
  client: 'catalin',
  connection: process.env.POSTGRE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: './migrations',
  },
  acquireConnectionTimeout: 2000,
};

const knexProduction: Knex.Config = {
  client: 'catalin',
  connection: process.env.POSTGRE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: './migrations',
  },
};

export default { knexDevelopment, knexProduction };
