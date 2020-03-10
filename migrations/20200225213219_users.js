
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('users', function(table) {
      table.increments();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
     })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  }