const knex = require("../db/connection");

const tableName = "reservations";

function list(date) {
  return knex(tableName)
    .where("reservation_date", date)
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservation_time");
}

function create(reservation) {
  return knex(tableName)
    .insert(reservation, "*")
    .then((createdReservations) => createdReservations[0]);
}

function read(reservation_id){
    return knex(tableName)
      .where("reservation_id", reservation_id)
      .first();
}

function update(reservation) {
  return knex(tableName)
    .where({ reservation_id: reservation.reservation_id })
    .update(reservation, "*")
    .then((records) => records[0]);
}

function status(reservation) {
    update(reservation);
    return validStatus(reservation);
}

function validStatus(reservation) {
  if (["booked", "seated", "finished", "cancelled"].includes(reservation.status)) {
    return reservation;
  }
  const error = new Error(
    `Invalid status:"${reservation.status}"`
  );
  error.status = 400;
  throw error;
}

function search(mobile_number) {
  return knex(tableName)
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  list,
  read,
  status,
  search
};
