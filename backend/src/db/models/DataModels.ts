import { Knex } from 'knex';

export default class DataModel {
  public db: Knex;

  constructor(connection: Knex) {
    this.db = connection;
  }
}
