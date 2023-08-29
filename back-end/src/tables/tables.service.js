const knex = require("../db/connection");
const tableName = "tables";

//list all tables
function list() {
    return knex(tableName).select("*");
}

function create(table) {
    return knex(tableName).insert(table).returning("*");
}

function read(table_id) {
    return knex(tableName).select("*").where({ table_id: table_id}).first();
}

function occupyTable(table_id, reservation_id) {
    return knex(tableName)
    .where({ table_id: table_id })
    .update({ reservation_id: reservation_id, status: "occupied" });
}

function freeTable(table_id) {
    return knex(tableName)
    .where({ table_id: table_id })
    .update({ reservation_id: null, status: "free" });
}

function updateReservation(reservation_id, status) {
    return knex("reservations")
      .where({ reservation_id: reservation_id })
      .update({ status: status });
}

function readReservation(reservation_id) {
    return knex("reservations")
      .select("*")
      .where({ reservation_id: reservation_id })
      .first();
  }

module.exports = {
    list,
    create,
    read,
    occupyTable,
    freeTable,
    updateReservation,
    readReservation
}