const knex = require("../db/connection");
const table = "tables";

function listTables() {
  return knex(table).select("*");
}

function readTable(tableId) {
  return knex(table).select("*").where({ table_id: tableId }).first();
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
  return knex.transaction((trx) => {
    knex(table)
      .where({ table_id: tableId })
      .update({ reservation_id: reservationId }, "*")
      .then(() => {
        return knex("reservations")
          .where({ reservation_id: reservationId })
          .update({ status: "seated" }, "*")
          .then((reservation) => reservation[0]);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
}

function removeReservation(tableId, reservationId) {
  return knex.transaction((trx) => {
    knex(table)
      .where({ table_id: tableId })
      .update({ reservation_id: null }, "*")
      .then(() => {
        return knex("reservations")
          .where({ reservation_id: reservationId })
          .update({ status: "finished" }, "*")
          .then((reservation) => reservation[0]);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
}

module.exports = {
  listTables,
  create,
  update,
  readReservation,
  readTable,
  removeReservation,
};
