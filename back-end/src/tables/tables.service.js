const knex = require("../db/connection")

function list(){
    return knex("tables").select("*").orderBy("table_name")
}

function create(res){
    return knex("tables")
    .insert(res)
    .returning("*")
    .then((res)=> res[0])
}

module.exports = {
    list,
    create
}