const knex = require("../db/connection");

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

function read(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

function updateTableStatusToOccupied(tableId, reservationId) {
  return knex("tables")
    .where({ table_id: tableId })
    .update({ status: "Occupied", reservation_id: reservationId });
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
  create,
  read,
  updateTableStatusToOccupied,
  list,
};
