exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("mobile_number").notNullable();
    table.date("reservation_date").notNullable();
    table.time("reservation_time").notNullable();
    table.integer("people").unsigned().notNullable();
    table.string("status").notNullable().defaultTo("booked");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
