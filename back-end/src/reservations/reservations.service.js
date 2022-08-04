const knex = require("../db/connection");

function listByQuery(date, mobile_number) {
  let dbQuery = knex("reservations").select("*").orderBy("reservation_time");

  if (date) {
    dbQuery = dbQuery.andWhere({ reservation_date: date });
  }

  if (mobile_number) {
    dbQuery = dbQuery.andWhere("mobile_number", "like", `%${mobile_number}%`);
  } else {
    dbQuery = dbQuery.andWhereNot({ status: "finished" });
  }
  return dbQuery;
}

//function to create a reservation which returns only one record
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

function theStatus(reservation_id, status) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status })
    .then((upReservation) => upReservation[0]);
}
function update(updatedReservation, reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .update(updatedReservation, "*")
    .then((upReservation) => upReservation[0]);
}

module.exports = {
  create,
  listByQuery,
  read,
  theStatus,
  update,
};
