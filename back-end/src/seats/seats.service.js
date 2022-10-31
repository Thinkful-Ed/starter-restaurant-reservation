const knex = require("../db/connection");

function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first();
}

async function update(table_id, reservation_id, updateTable){
    return knex.transaction(async function(trx) {
        await trx("tables")
            .select("*")
            .where({ table_id })
            .update(updateTable, "*")
        return await trx("reservations")
            .select("*")
            .where({ reservation_id })
            .update({ status: "seated "})
    })
}

async function finishedRes(reservation_id){
    return knex.transaction(async function (trx){
        await trx("reservations")
            .where({ reservation_id })
            .update({ status: "finished" })
        return await trx("tables")
            .where({ reservation_id })
            .update({ reservation_id: null })
    })
}


module.exports = {
    read,
    update,
    finishedRes,
}