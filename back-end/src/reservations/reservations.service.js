const knex = require("../db/connection");

// Lists all the reservations in the database regardless of status
const list = () => {
  return knex("reservations").select("*");
};

const filterReservationByDate = async (reservation_date) => {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
    .orderBy("reservation_time");
};

const DisplayReservationByNumber = (mobile_number) => {
  return knex("reservations")
    .whereRaw(
      "translate (mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
};

const create = async (reservation) => {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((newReservation) => newReservation[0]);
};

const read = async (reservation_id) => {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
};

const update = async (updatedReservation) => {
  return knex("reservations")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRes) => updatedRes[0]);
};

const updateTableStatus = async (reservation_id, status) => {
  return knex("reservations")
    .where({ reservation_id: reservation_id })
    .update({ status }, "*")
    .then((updatedRes) => updatedRes[0]);
};

module.exports = {
  list,
  filterReservationByDate,
  DisplayReservationByNumber,
  create,
  read,
  update,
  updateTableStatus,
};