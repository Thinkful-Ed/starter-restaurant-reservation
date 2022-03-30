const knex = require("../db/connection")

function create(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then((createdTables) => createdTables[0])
}

function list() {
    return knex("tables")
        .select("*")
}

function update(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, "*")
}

module.exports = {
    create,
    list,
    update,
}