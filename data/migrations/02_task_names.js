
exports.up = function (knex) {
    return knex.schema
      .createTable('task_names', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.integer('user_id').references('id').inTable('users');
      })
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTable('task_names');
  };