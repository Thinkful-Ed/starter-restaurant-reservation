const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(reservation_id) {
  return knex("tables").insert(reservation_id).returning("*").then((createdRecords) => createdRecords[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function updateSeat(table_id, reservation_id) {
  return knex("tables").where({ table_id }).update({ reservation_id }).returning("*").then((updatedRecords) => updatedRecords[0]);
}


module.exports = {
    list,
    create,
    read,
    updateSeat,
  };