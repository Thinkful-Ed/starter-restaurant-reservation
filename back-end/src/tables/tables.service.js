const knex = require("../db/connection")

/**
 * CRUDL service for table & seat resources
 * Create returns a list, of which we only need the first element
 */
function list() {
  return knex("tables").select("*").orderBy("tables.table_name")
}
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdTables) => createdTables[0])
}
function read(id) {
  return knex("tables").select("*").where({ table_id: id })
}
function update(updatedTable, id) {
  return knex("tables")
    .select("*")
    .where({ table_id: id })
    .update(updatedTable, "*")
}

module.exports = {
  list,
  create,
  read,
  update,
}
