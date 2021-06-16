exports.up = function (knex) {
  return knex.schema.table("reservations", (table) => {
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("mobile_number").notNullable();
    table.date("reservation_date").notNullable();
    table.time("reservation_time").notNullable();
    table.integer("people").unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table("reservations", (table) => {
    table.dropColumn("first_name");
    table.dropColumn("last_name");
    table.dropColumn("mobile_number");
    table.dropColumn("reservation_date");
    table.dropColumn("reservation_time");
    table.dropColumn("people");
  });
};
