const { select } = require("../db/connection");
const knex = require("../db/connection");

function list() {
    return knex("tables")
        .select("*")
        .orderBy("tables.table_name");
}

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({table_id: table_id})
        .first();
}

function update(table_id, reservation_id) {
    return knex.transaction(async trx => {
        await knex("reservations")
        .select("*")
        .where({ reservation_id })
        .update({ status: "seated" })
        .transacting(trx);

    return knex("tables")
        .select("*")
        .where({ table_id })
        .update({reservation_id})
        .transacting(trx)
        .then((updatedRec)=>updatedRec[0])
    });
}

function create(table){
    return knex("tables")
    .insert(table)
    .returning("*")
    .then((created)=>created[0])
}

function destroy(table_id, reservation_id) {
    return knex.transaction(async (trx) => {
        await trx("reservations")
        .where({ reservation_id })
        .update({ status: "finished" });

    return trx("tables")
        .select("*")
        .where({ table_id })
        .update({ reservation_id: null}, "*")
        .then((updated) => updated[0])
    })
}
module.exports = {
    list,
    read,
    update,
    create,
    destroy
}