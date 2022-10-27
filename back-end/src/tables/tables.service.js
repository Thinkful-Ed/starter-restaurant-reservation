const knex = require("../db/connection")

function list(){
    return knex("tables")
        .select("*")
        .orderBy("table_name", "asc")
}

function read(table_id){
    return knex("tables")
        .select("*")
        .where({table_id})
        .first()
}

function create(newTable){
    return knex("tables")
        .insert(newTable)
        .returning("*")
}

function update(updatedTable){
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, "*")
        .then((updatedRecords) => updatedRecords[0])
}
module.exports = {
    list,
    read,
    create,
    update
}