const knex = require("../db/connection");

function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name", "asc")
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(tableId) {
  return knex("tables")
    .select("*")
    .where({ "table_id": tableId })
    .first();
}

function reservationCheck(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_id": reservationId})
    .first();
}

function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ "table_id": updatedTable.table_id })
    .where({ "reservation_id": updatedTable.reservation_id})
    .update(updatedTable, "*")
}

module.exports = {
  list,
  create,
  read,
  reservationCheck,
  update,
};
