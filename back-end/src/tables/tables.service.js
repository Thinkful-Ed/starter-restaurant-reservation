const knex = require("../db/connection")

function create(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then((createdTable) => (createdTable[0]))
}

function read(tableId) {
    return knex("tables").select("*").where({ table_id: tableId }).first()
}

function occupyTable(tableId, reservationId) {
    return knex("tables")
        .where({ table_id: tableId })
        .update({ status: "Occupied", reservation_id: reservationId })
}

function list() {
    return knex("tables").select("*").orderBy("table_name")
}

module.exports = {
    create,
    read,
    occupyTable,
    list,
}