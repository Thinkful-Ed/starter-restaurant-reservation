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

function updateTableById(tableid, reservation_id) {
  return knex("tables")
    .select("*")
    .where({ table_id: tableid })
    .update({ reservation_id }, "*")
    .then((updatedRecords) => updatedRecords[0])
    .catch((error) => {
      console.error(error);
    });
}

function deleteReservationId(tableid) {
  return knex("tables")
    .select("*")
    .where({ table_id: tableid })
    .update({ reservation_id: null }, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function getReservationById(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function seatTable(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .update({ status: "seated" }, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

async function finishTable(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .update({ status: "finished" }, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  post: postTables,
  get: getTableById,
  getAll: getAllTables,
  put: updateTableById,
  getReservationById,
  delete: deleteReservationId,
  seatTable,
  finishTable,
};
