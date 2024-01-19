exports.up = function (knex) {
    return knex.schema.table("reservations", (table) => {
      table.string("status").defaultTo("booked").notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("reservations", (table) => {
      table.dropColumn("status");
    });
  };