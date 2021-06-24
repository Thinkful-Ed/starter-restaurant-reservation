exports.up = function (knex) {
  return knex.schema.alterTable("reservations", (table) => {
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("mobile_number").notNullable();
    table.date("reservation_date").notNullable();
    table.time("reservation_time").notNullable();
    table.integer("people").unsigned().notNullable();
  });
};

exports.down = function (knex) {
  const columns = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  return knex.schema.alterTable("reservations", (table) => {
    table.dropColumns(...columns);
  });
};
