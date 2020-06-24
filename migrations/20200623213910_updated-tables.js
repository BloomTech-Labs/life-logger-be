exports.up = function (knex) {
  return knex.schema
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
      table.string('task_notes');
      table.integer('category_id').references('id').inTable('categories');
      table.datetime('due_date').notNullable();
      table.boolean('all_day');
      table.boolean('is_complete').defaultTo(false);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('tasks')
    .dropTable('categories')
    .dropTable('task_names');
};
