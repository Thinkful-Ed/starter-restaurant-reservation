const knex = require("../db/connection");

function createTable(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

function readTable(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

function seatTable(tableId, reservationId) {
  return knex("tables")
    .where({ table_id: tableId })
    .update({ status: "Occupied", reservation_id: reservationId });
}

function unseatTable(tableId) {
  return knex("tables")
    .select("*")
    .where({ table_id: tableId })
    .update({ status: "Free", reservation_id: null });
}

function listTables() {
  return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
  createTable,
  readTable,
  seatTable,
  unseatTable,
  listTables,
};
