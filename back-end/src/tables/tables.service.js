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

module.exports = {
    listTables,
    create
}