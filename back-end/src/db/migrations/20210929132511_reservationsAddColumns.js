exports.up = function (knex) {
    return knex.schema.table("reservations", (table) => {
      table.string("first_name");  // Add a new column
      table.string("last_name");
      table.integer("mobile_number");
      table.date("reservation_date");
      table.time("reservation_time");
      table.integer("people");
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