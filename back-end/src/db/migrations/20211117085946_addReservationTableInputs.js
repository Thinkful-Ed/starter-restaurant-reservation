exports.up = function (knex) {
  return knex.schema.table("reservations", (table) => {
    table.text("first_name").notNullable();
    table.text("last_name").notNullable();
    table.text("mobile_number").notNullable();
    table.date("reservation_date").notNullable();
    table.time("reservation_time").notNullable();
    table.integer("people").notNullable();
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
