exports.up = function (knex) {
  return knex.schema.createTable("tasks", function (table) {
    table.increments();
    table
      .integer("task_id")
      .references("id")
      .inTable("task_names")
      .notNullable()
    .onDelete("CASCADE")

    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("task_notes");
    table
      .integer("category_id")
      .references("id")
      .inTable("categories")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.datetime("due_date").notNullable();
    table.boolean("all_day");
    table.boolean("is_complete").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
