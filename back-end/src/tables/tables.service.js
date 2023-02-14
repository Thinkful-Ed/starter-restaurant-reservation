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

function update(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, "*")
        .then((updated) => updated[0]);
}

//TODO delete extra code
// function destroy(tableId) {
//     return knex("tables")
//         .where({ table_id: tableId })
//         .del();
// }

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