exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.string("first_name");
    table.string("last_name");
    table.text("mobile_number");
    table.date("reservation_date");
    table.time("reservations_time");
    table.integer("people");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
