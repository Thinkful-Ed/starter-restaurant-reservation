exports.up = function (knex) {
    return knex.schema.createTable("tables", (table) => {
      table.increments("table_id").primary();
      table.string("table_name").notNullable();
      table.string("capacity").notNullable();
      table.string("status").defaultTo("Free");
      table.integer("reservation_id").unsigned()
      table.foreign("reservation_id").references("reservation_id").inTable("reservations").onDelete("CASCADE");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("tables");
  };
  