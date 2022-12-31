const knex = require("../db/connection");

//Knex query to list tables
function list() {
    return knex("tables")
    .select("*")
    .from("tables as t")
    .orderBy("t.table_name");
}
//Knex query to read table based on table id provided
function read(table_id){
    return knex
    .select("*")
    .from("tables as t")
    .where({"t.table_id":table_id})
    .first();

}
//Knex query to create table 
function create(table) {
    return knex("tables")
      .insert(table)
      .returning("*")
      .then((createdTable) => createdTable[0]);
  }

//Knex query to update a specific reservation
function update(tableId, tableUpdate){
    return knex("tables")
    .select("*")
    .where({table_id: tableId})
    .update(tableUpdate, ["*"])
    .then((data)=> data[0]);
}

module.exports = {
    list, read, create, update
}