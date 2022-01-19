const knex = require("../db/connection");

function create(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then(res => res[0]);
}

function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({table_id})
        .first();
}

function seat(table_id, reservation) {
    return knex("tables")
        .select("*")
        .where({table_id})
        .update({reservation_id: reservation })
        .returning("*")
        .then(res => res[0]);
}

module.exports = {
    create,
    list,
    seat,
    read,
}