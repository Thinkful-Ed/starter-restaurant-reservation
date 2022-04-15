const knex = require("../db/connection")

function listTables() {
    return knex("tables").select("*").orderBy("table_name")
}

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then(createdRow => createdRow[0])
}

function read(table_id) {
    return knex("tables").select("*").where({table_id}).first()
}

function update(updatedTable) {
    return knex("tables")
        .select("*")
        .where({table_id: updatedTable.table_id})
        .update(updatedTable)
        .then(updatedRow => updatedRow[0])
}

module.exports = {
    listTables,
    create,
    read,
    update
}