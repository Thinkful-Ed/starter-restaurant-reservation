const knex = require("../db/connection");

function postTables(table) {
  return knex("tables")
    .insert(table, "*")
    .then((createdRecords) => createdRecords[0]);
}

function getTableById(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

function getAllTables() {
  return knex("tables").select("*");
}

function updateTableById(tableid) {
  return knex("tables").select("*").where({ table_id: tableid });
  // .update(tables, "*")
  // .then((updatedRecords) => updatedRecords[0])
  // .catch((error) => {
  //   console.error(error);
  // });
}

// knex('users')
//   .where({ id: 2 })
//   .update({ name: 'Homer' })

function getReservationById(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

module.exports = {
  post: postTables,
  get: getTableById,
  getAll: getAllTables,
  put: updateTableById,
  getReservationById,
};
