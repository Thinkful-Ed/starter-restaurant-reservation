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

module.exports = {
    create,
    list,
}