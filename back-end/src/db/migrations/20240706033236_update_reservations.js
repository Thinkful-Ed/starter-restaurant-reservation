exports.up = function (knex) {
    return knex.schema.alterTable("reservations", (table) => {
      table.date("reservation_date").alter();
      table.time("reservation_time").alter();
      table.string("status").defaultTo("booked");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable("reservations", (table) => {
      table.string("reservation_date").alter();
      table.string("reservation_time").alter();
      table.dropColumn("status");
    });
  };

  