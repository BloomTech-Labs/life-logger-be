
exports.up = function (knex) {
    return knex.schema
      .createTable('categories', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.integer('user_id').references('id').inTable('users');
      })
    
  };
  
  exports.down = function (knex) {
    return knex.schema
 
      .dropTable('categories')
      
  };