exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.string('first_name');
    table.string('last_name');
    table.string('mobile_number');
    table.integer('people');
    table.date('reservation_date');
    table.time('reservation_time');
    table.timestamps(true, true);
    table.string('status').defaultTo("booked")
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
