
exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.timestamps(true, true);
    table.string("table_name").notNull();
    table.integer("capacity").notNull();
    table.integer("reservation_id").unsigned();
    table.foreign("reservation_id").references("reservation_id").inTable("reservations");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};
