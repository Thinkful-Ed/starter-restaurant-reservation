const knex = require("../db/connection")

function create(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then((createdTables) => createdTables[0])
}

function read(tableName) {
    return knex("tables")
        .select("*")
        .where({ table_name: tableName })
        .first()
}

function list() {
    return knex("tables")
        .select("*")
}

function update(updatedTable) {
    return knex("tables")
        .where({ table_name: updatedTable.table_name })
        .update(updatedTable, "*")
}

module.exports = {
    create,
    list,
    update,
    read,
}

// when selecting, always returns an array