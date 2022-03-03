
exports.up = function(knex) {
  return knex.schema.createTable("tables", (table) => {
      table.string("table_name").primary()
      table.integer("capacity").notNullable()
      table
        .foreign("reservation_id")
        .references("reservation_id")
        .inTable("reservations")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("tables")
};
