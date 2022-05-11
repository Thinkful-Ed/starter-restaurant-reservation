const { where } = require("../db/connection");
const knex = require("../db/connection");
const table = "reservations";

function listReservations(date) {
  return knex(table)
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" });
}

function readReservation(reservationId) {
  return knex(table)
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function create(newReservation) {
  return knex(table)
    .insert(newReservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

function update(updatedReservation) {
  return knex(table)
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((reservation) => reservation[0]);
}

function updateStatus(reservationId, newStatus) {
  return knex(table)
    .where({ reservation_id: reservationId })
    .update({ status: newStatus }, "*")
    .then((reservation) => reservation[0]);
}

function finishReservation(reservationId) {
  knex(table)
    .where({ reservation_id: reservationId })
    .update({ status: "finish" })
    .transacting(trx)
    .then(() => {
      return knex("tables")
        .where({ reservation_id: reservationId })
        .update({ reservation_id: null }, "*")
        .then((tableData) => tableData[0]);
    })
    .then(trx.commit)
    .catch(trx.rollback);
}

module.exports = {
  listReservations,
  create,
  update,
  readReservation,
  updateStatus,
  finishReservation,
};
