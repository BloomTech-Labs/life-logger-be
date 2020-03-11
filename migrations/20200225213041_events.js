exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('events', function(table) {
      table.increments();
      table.integer('user_id').references('id').inTable('users');
      table.string('Title').notNullable();
      table.string('Event_text').notNullable();
      table.string('Location');
      table.integer('Category').notNull()
      table.timestamp('Event_Ct_Tm').defaultTo(knex.fn.now());
      table.timestamp('Event_St_Tm').defaultTo(knex.fn.now());
      table.timestamp('Event_Et_Tm').defaultTo(knex.fn.now());
     })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('events');
  }