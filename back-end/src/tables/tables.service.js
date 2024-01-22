const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(newTable) {
  return knex("tables")
    .insert(newTable, "*")
    .then((newTable) => newTable[0]);
}

function readTable(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function readReservation(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function seatReservation(reservation_id, table_id) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status: "seated" })
    .then(() => {
      return knex("tables")
        .where({ table_id })
        .update({
          reservation_id: reservation_id,
          table_status: "occupied",
        })
        .returning("*");
    });
}

module.exports = { list, create, readTable, readReservation, seatReservation };
