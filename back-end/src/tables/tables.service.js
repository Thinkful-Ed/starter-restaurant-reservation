const knex = require("../db/connection");

function list() {
    return knex("tables")
    .select("*");
}

function read(table_id) {
    return knex("tables")
    .select("*")
    .where({ table_id })
    .first();
}

module.exports = {
    list,
    read,
}