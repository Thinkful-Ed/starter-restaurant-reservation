exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary()
    table.foreign("reservation").references("reservation_id").inTable("reservations")
    table.string("table_name").notNullable()
    table.integer("capacity").notNullable()
  });
};

exports.down = function (knex) {
    return knex.schema.dropTable("tables")
}