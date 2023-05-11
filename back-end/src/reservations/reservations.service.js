const knex = require('../db/connection');

function list(reservation_date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date })
      .whereNot({ status: "finished" })
      .orderBy("reservation_time");
  }

  function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

function read(id){
    return knex("restaurants").select("*").where({ reservation_id: id }).first();
}

module.exports = {
    list,
    search,
    read,
}