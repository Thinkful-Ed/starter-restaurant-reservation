const knex = require("../db/connection");

function list(){
    return knex("tables").select("*").orderBy("table_name");
}

function read(table_id){
    return knex("tables")
        .select("*")
        .where({table_id})
        .then(rows => rows[0]);
}

function update(updatedTable){
    return knex("tables")
    .select("*")
    .where({table_id: updatedTable.table_id})
    .update(updatedTable, "*")
    .then(records => records[0]);
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
    create,
    update
}