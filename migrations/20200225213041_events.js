exports.up = function(knex) {
    return knex.schema.createTable('events', function(table) {
      table.increments();
      table.integer('user_id').references('id').inTable('users');
      table.string('Title').notNullable();
      table.string('Event_text').notNullable();
      table.string('Location').notNullable();
      table.integer('Category').notNull()
      table.timestamp('Event_Dt_Tm').defaultTo(knex.fn.now());
     })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('events');
  }