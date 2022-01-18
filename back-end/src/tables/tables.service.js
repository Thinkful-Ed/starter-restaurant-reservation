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
        .where({"table_id": table_id})
}

function seat() {

}

module.exports = {
    create,
    list,
    seat,
    read,
}