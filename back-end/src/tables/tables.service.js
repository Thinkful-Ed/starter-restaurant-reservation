const knex = require('../db/connection');

function list(){
    return knex("tables").select("*").orderBy("table_name")
}

function read(table_id){
    return knex("tables").select("*").where({ table_id }).first();
}

module.exports = {
    list,
    read,
}