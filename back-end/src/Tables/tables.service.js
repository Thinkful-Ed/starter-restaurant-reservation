const knex = require("../db/connection");
const table = "tables";

function listTables() {
  return knex(table).select("*");
}

function readTable(tableId) {
    return knex(table)
    .select("*")
    .where({ table_id: tableId })
    .first();
}

function readReservation(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function create(newTable) {
  return knex(table)
    .insert(newTable)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function update(tableId, reservationId) {
  return knex(table)
    .where({ table_id: tableId })
    .update({ reservation_id: reservationId }, "*")
    .then((reservation) => reservation[0]);
}

module.exports = { listTables, create, update, readReservation, readTable };
