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

function listAvailability(reservation_date) {
    return knex("tables as t")
        .join("res_tables as rt")
        .join("reservations as r")
        .select("t.table_id, rt.available")
        .whereBetween("r.reservation_date", [reservation_date, reservation_date])
}


module.exports = {
    create,
    list,
    listAvailability,
}
