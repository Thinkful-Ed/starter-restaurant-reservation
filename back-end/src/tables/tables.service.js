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

async function seatTable(tableId, reservationId) {
    const trx = await knex.transaction()

    return trx("tables")
        .where({ table_id: tableId })
        .update({ status: "occupied", reservation_id: reservationId })
        .then(function () {
            return trx("reservations")
            .where({ reservation_id: reservationId })
            .update({ status: "seated" })
        })
        .then(trx.commit)
        .catch(trx.rollback)
}

async function finishTable(tableId, reservationId) {
    const trx = await knex.transaction()

    return knex("tables")
        .select("*")
        .where({ table_id: tableId })
        .update({ status: "free", reservation_id: null })
        .then(function () {
            return trx("reservations")
                .where({ reservation_id: reservationId })
                .update({ status: "finished" })
        })
        .then(trx.commit)
        .catch(trx.rollback)
}

function list() {
    return knex("tables").select("*").orderBy("table_name")
}

module.exports = {
    create,
    read,
    seatTable,
    finishTable,
    list,
}