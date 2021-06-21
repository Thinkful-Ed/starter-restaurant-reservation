exports.up = function (knex) {
  return knex.schema.table("reservations", (table) => {
    table.string("first_name");
    table.string("last_name");
    table.string("mobile_number");
    table.date("reservation_date");
    table.time("reservation_time");
    table.integer("people");
  });
};

exports.down = function (knex) {
  const columns = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  return knex.schema.table("reservations", async (table) => {
    table.dropColumns([...columns]);
  });
};
