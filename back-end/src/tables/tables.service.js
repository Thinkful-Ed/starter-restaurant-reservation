const knex = require("../db/connection");

function read(tableId) {
    return knex("tables").select("*").where({ table_id: tableId }).first();
  }

function update(updatedTable) {
    return knex("tables")
    .select("*")
    .where({table_id: updatedTable.table_id})
    .update(updatedTable, "*")
}

function create(table) {
    return knex("tables as t")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function list() {
    return knex("tables")
    .orderBy("table_name", "asc");
}


module.exports = { create, list, read, update }