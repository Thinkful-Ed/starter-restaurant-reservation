const knex = require("../db/connection");
const tableName = "tables";

function create(newTable){
    return knex(tableName)
        .insert(newTable, "*")
        .then( (result) => result[0] );
        /* The .insert() method of Knex can be used to insert more than one record, 
        so when used with "*" it returns an array of the records inserted. 
        For this API, only one table will ever be inserted at a time */
}

function read(table_id){
    return knex(tableName)
        .select()
        .where({table_id : Number(table_id)})
        .first();
}

function update(table_id, reservation_id){
    return knex(tableName)
        .select("*")
        .where({table_id,})
        .update({reservation_id,}, "*")
        .then( (result) => result[0] ); 
        /* The .update() method of Knex can be used to update more than one record, 
        so when called with "*" it returns an array of the records updated. 
        For this API, only one table will ever be updated at a time */
}

function list(){
    return knex(tableName)
        .select("*")
        .orderBy("table_name");
}

module.exports = {
    create,
    read,
    update,
    list,
}