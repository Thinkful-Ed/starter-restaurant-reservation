exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.string("first_name");
    table.string("last_name");
    table.string("mobile_number");
    table.date("reservation_date");
    table.time("reservation_time");
    table.integer("people");
    table.timestamps(true, true); //creates the created_at and updated_at columns
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
// {
//   "first_name": "Rick",
//   "last_name": "Sanchez",
//   "mobile_number": "202-555-0164",
//   "reservation_date": "2020-12-31",
//   "reservation_time": "20:00:00",
//   "people": 6,
//   "created_at": "2020-12-10T08:30:32.326Z",
//   "updated_at": "2020-12-10T08:30:32.326Z"
// },

// exports.up = function (knex) {
//   return knex.schema.createTable("critics", (table) => {
//     table.increments("critic_id").primary(); //sets critic_id as the primary Key
//     table.string("preferred_name");
//     table.string("surname");
//     table.string("organization_name");
//     table.timestamps(true, true); //adds created_at and updated_at columns
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTable("critics");
// };
