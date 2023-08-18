const knex = require("../db/connection");
const tableName = "tables";

function list() {
  return knex(tableName).select("*").orderBy("table_name");
}

function read(table_id) {
  return knex(tableName).where("table_id", table_id).first();
}

function update(tables) {
  return knex(tableName)
    .where({ table_id: tables.table_id })
    .update(reservation_id, "*")
    .then((updated) => updated[0]);
}

function create(table) {
  return knex(tableName)
    .insert(table)
    .returning("*")
    .then((created) => created[0]);
}


module.exports = {
  list,
  update,
  create,
  read
}