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

function seat() {

}

module.exports = {
    create,
    list,
    seat,
}