exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary().notNullable()
    table.string("first_name").notNullable()
    table.string("last_name").notNullable()
    table.string("mobile_number").notNullable()
    table.string("reservation_date")
    table.string("reservation_time")
    table.integer("people")
    table.timestamps(true, true)
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
