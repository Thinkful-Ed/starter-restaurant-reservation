const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("tables.table_name");
}

// function create(reservation) {
//   return knex("reservations")
//     .insert(reservation)
//     .returning("*")
//     .then((createRecords) => createRecords[0]);
// }

module.exports = {
  list,
};
