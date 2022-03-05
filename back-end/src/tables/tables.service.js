const knex = require("../db/connection");

function list() {
  return knex("tables").select().orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select().where({ table_id }).first();
}

function create(formData) {
  return knex("tables")
    .insert(formData)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

async function addReservation(reservation_id, table_id) {
  return knex("tables")
    .select()
    .where({ table_id })
    .update(reservation_id, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

async function removeReservation(table_id) {
  return knex("tables")
    .select()
    .where({ table_id })
    .update({ reservation_id: null }, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = { list, create, read, addReservation, removeReservation };
