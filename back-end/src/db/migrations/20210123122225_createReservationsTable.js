exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.timestamps(true, true);
    table.string("first_name");
    table.string("last_name");
    table.string("mobile_number");
    table.string("people");
    table.string("reservation_date")
    table.string("reservation_time");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
