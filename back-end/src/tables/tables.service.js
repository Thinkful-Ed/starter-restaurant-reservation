const knex = require("../db/connection");

function list(){
    return knex("tables").select("*");
}

function read(table){
    return knex("tables")
        .select("*")
        .where({table_name: table})
        .then(rows => rows[0]);
}

function create(newTable){
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then(rows => rows[0]);
}

module.exports = {
    list,
    read,
    create
}