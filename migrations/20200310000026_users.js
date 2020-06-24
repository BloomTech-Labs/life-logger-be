exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
    })
    .createTable('events', function (table) {
      table.increments();
      table.integer('user_id').references('id').inTable('users');
      table.string('title').notNullable();
      table.string('event_text').notNullable();
      table.string('location');
      table.integer('category').notNull();
      table.timestamp('event_ct_tm').defaultTo(knex.fn.now());
      table.timestamp('event_st_tm').defaultTo(knex.fn.now());
      table.timestamp('event_et_tm').defaultTo(knex.fn.now());
      table.boolean('all_day');
      table.string('event_resource');
      table.boolean('iscomplete').defaultTo(false);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('events').dropTable('users');
};
