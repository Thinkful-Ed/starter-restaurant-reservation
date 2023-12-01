const knex = require("../db/connection");


function create(newTable) {
    return knex("tables")
      .insert({
        table_name: newTable.table_name,
        capacity: newTable.capacity,
        reservation_id: null
      })
      .returning("*");
  }


function list() {
    return knex("tables")
    .select("*")
}


module.exports = {
    create,
    list
}