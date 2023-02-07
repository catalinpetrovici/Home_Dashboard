import { Knex } from 'knex';

exports.up = function (knex: any) {
  // knex.schema.hasTable('users').then(function (exists: any) {
  //   if (!exists) {
  return knex.schema
    .createTable('users', (table: any) => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('email', 100).notNullable().unique();
      table.string('phone_number').notNullable();
      table.string('password').notNullable();
      table.string('first_name', 100).notNullable();
      table.string('last_name', 100).notNullable();
      table.string('gender', 15);
      table.timestamps(true, true); // created_at, updated_at
      // table
      //   .timestamps('last_login', { precision: 6 })
      //   .defaultTo(knex.fn.now(6));
      table.text('bio');
      table.string('role').notNullable().defaultTo('UNVERIFIED');
      table.string('verification_code', 50);
    })
    .createTable('comments', (table: any) => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.text('text', 1000).notNullable();
    })
    .createTable('likes', (table: any) => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('comment_id')
        .references('comments.id')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .uuid('user_id')
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.boolean('liked').defaultTo(0).notNullable();
    });
};
// });
// };

exports.down = function (knex: any) {
  return knex.schema
    .dropTable('users')
    .dropTable('comments')
    .dropTable('likes');
};

// DROP TABLE IF EXISTS comments CASCADE;
// CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
