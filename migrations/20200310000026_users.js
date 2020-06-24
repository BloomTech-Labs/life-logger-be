exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
    })
    .createTable('task_names', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.integer('user_id').references('id').inTable('users');
    })
    .createTable('categories', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.integer('user_id').references('id').inTable('users');
    })
    .createTable('tasks', function (table) {
      table.increments();
      table.integer('task_id').references('id').inTable('task_names');
      table.integer('user_id').references('id').inTable('users');
      table.string('name').notNullable();
      table.string('task_notes');
      table.integer('category_id');
      table.datetime('due_date').notNullable();
      table.boolean('all_day');
      table.boolean('is_complete').defaultTo(false);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('tasks')
    .dropTable('categories')
    .dropTable('task_names')
    .dropTable('users');
};
