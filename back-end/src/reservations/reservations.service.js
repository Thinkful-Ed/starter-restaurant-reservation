const knex = require("../db/connection");

function create(newReservation){
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((result) => result[0]);
}

function read(reservation_id){
    return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .returning("*")
    .then(result => result[0])
};

function list(reservation_date){
    return knex("reservations")
        .select("*")
        .where({ reservation_date })
        .whereNot({ status: "finished" })
        .returning("*")
        .orderBy("reservation_time");
}

function updateStatus(reservation_id, status) {
    return knex("reservations")
      .select("*")
      .where({ reservation_id })
      .update("status", status )
      .returning("*")
      .then((result) => result[0]);
}

function updateRes(reservation_id, reservation){
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .update(reservation, "*")
        .returning("*")
        .then(result => result[0]);
}

function finishedRes(reservation_id) {
    return knex("reservations")
      .select("*")
      .where({ reservation_id })
      .update({ status: "finished" });
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
    list,
    updateStatus,
    updateRes,
    finishedRes,
    search,
}