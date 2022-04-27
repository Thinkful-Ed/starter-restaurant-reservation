exports.up = function (knex) {
  return knex.schema.table("reservations", (table) => {
    table.string("status").default("booked");
  });
};

exports.down = function (knex) {
  return knex.schema.table("reservations", (table) => {
    table.dropColumn("status");
  });
};
