exports.up = function (knex) {
  return knex.schema.alterTable("tables", (table) => {
    table.integer("reservation_id").references("reservations.reservation_id");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("tables", (table) => {
    table.dropColumn("reservation_id");
  });
};
