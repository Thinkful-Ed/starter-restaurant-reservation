const knex = require("../db/connection");

//C creates new and returns newly created reservation
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((reservationsArray) => reservationsArray[0]);
}

//R returns based on reservation_id match
function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId }) //left db --- right param
    .first(); 
}

//L used for dashboard and search
function list(date, mobile_number) {
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .whereNotIn("status", ["finished", "cancelled"])
      .orderBy("reservation_time", "asc");
  }
  if (mobile_number) {
    return knex("reservations")
      .select("*")
      .where("mobile_number", "like", `${mobile_number}%`);
  }

  return knex("reservations").select("*");
}

//U can update reservation status
function update(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id: reservation_id })
    .update({ status: status });
}

//edits the body of a reservation
function edit(reservation_id, reservation) {
  return knex("reservations")
    .where({ reservation_id: reservation_id })
    .update({ ...reservation })
    .returning("*");
}



module.exports = { list, create, read, update, edit };
