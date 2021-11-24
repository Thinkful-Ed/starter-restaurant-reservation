exports.up = function (knex) {
  return knex.schema.table("tables", (table) => {
    table
      .increments("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .notNullable()
      .primary();
  });
};

exports.down = function (knex) {
  return knex.schema.table("tables", (table) => {
    table.dropColumn("reservation_id");
  });
};
