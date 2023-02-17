const knex = require("../db/connection");

function list() {
    return knex("tables")
        .select("table_name", "capacity", "table_id", "reservation_id")
        .orderBy("table_name")
        .groupBy("table_id") ;
}

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((newTable) => newTable[0]);
}

function read(tableId) {
    return knex("tables")
        .where({ table_id:tableId })
        .first();
}

async function update(updatedTable, reservationId) {
    try{
        await knex.transaction(async(trx) => {
            const returnedUpdatedTable = await trx("tables")
                .where({ table_id: updatedTable.table_id })
                .update(updatedTable, "*")
                .then((updatedTables) => updatedTables[0]);

            const returnedUpdatedReservation = await trx("reservations")
                .where({ reservation_id: reservationId })
                .update({status: "seated"})
                .then((updatedReservations) => updatedReservations[0])
        });
    } catch (error){
        console.error(error)
    }
}


function destroy(tableId) {
    return knex("tables")
        .select("*")
        .where({ table_id: tableId })
        .update({reservation_id: null})
        .then((updated) => updated[0])
}


module.exports = {
    list,
    create,
    read,
    update,
    delete: destroy,
}