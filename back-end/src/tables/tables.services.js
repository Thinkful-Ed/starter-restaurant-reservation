const knex = require("../db/connection");

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then(createdRecords => createdRecords[0]);
}

function list() {
    return knex("tables as t")
        .select("t.*")
        .orderBy("t.table_name");
}

/*function listAvailability(reservation_date) {
    return knex("tables as t")
        .leftJoin("res_tables as rt", "t.table_id", "rt.table_id")
        .leftJoin("reservations as r", "rt.reservation_id", "r.reservation_id")
        .select("t.table_name, rt.available")
        .orderBy("t.table_name")
        .whereBetween("r.reservation_date", [reservation_date, reservation_date])
} */

function read(tableId) {
    return knex("tables as t").select("*").where({ table_id: tableId }).first();
}

function seat(res_table) {
    return knex("res_tables as rt")
        .insert(res_table)
        .returning("rt.*")
        .then(createdRecords => createdRecords[0]);
}

function getPeople(reservation_id, table_id) {
    return knex("reservations as r")
        .select("r.people")
        .where("r.reservation_id", reservation_id)
        .first()
}

function getCapacity(table_id) {
    return knex("tables as t")
        .select("t.capacity")
        .where("t.table_id", table_id)
        .first()
}

function getAvailable(table_id) {
    return knex("res_tables as rt")
        .select("rt.available")
        .where("rt.table_id", table_id)
        .first()
}

/* function res_table_list({ res_table_id }) {
    return knex("tables")
        .join("res_tables", "tables.table_id", "res_tables.table_id")
        .join("reservations", "res_tables.reservation_id", "reservations.reservation_id")
        .select("reservations.*", "tables.*", "res_tables.*")
} */


module.exports = {
    create,
    list,
    //listAvailability,
    read,
    seat,
    getPeople,
    getCapacity,
    getAvailable,
    //res_table_list
}
