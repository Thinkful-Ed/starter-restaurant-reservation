const knex = require("../db/connection");

function listByDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

function create(reservation) {
  // validation to add in the future
  // if (!/^\d{10}$/.test(reservation.mobile_number)) {
  //   throw {
  //     status: 400,
  //     message: `Invalid field: mobile_number. Must be a 10-digit number.`,
  //   };
  // }

  // validation to add in the future
  // if (!/^\d+$/.test(reservation.mobile_number)) {
  //   throw {
  //     status: 400,
  //     message: `Invalid field: mobile_number. Must contain only numeric characters.`,
  //   };
  // }
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .whereNot({ status: "finished " })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  read,
  listByDate,
  update,
  search,
};
