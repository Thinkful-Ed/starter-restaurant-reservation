const knex = require("../db/connection")

async function create(newTable) {
    const createdTables = await knex("tables")
        .insert(newTable)
        .returning("*")
    return createdTables[0]
}

function read(tableId) {
    return knex("tables")
        .select("*")
        .where({ table_id: tableId })
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