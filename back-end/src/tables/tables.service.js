const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("tables.table_name");
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createRecords) => createRecords[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

// /PUT to /tables/:table_id/seat/ to save table assignment
function update(updatedRes, tableId) {
  return knex("tables")
    .select("*")
    .where({ table_id: tableId })
    .update(updatedRes, "*")
    .then((updatedRecord) => updatedRecord[0]);
}

module.exports = {
  list,
  create,
  read,
  update,
};
