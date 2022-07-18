const knex = require("../db/connection.js")

//---------HELPER FUNCTIONS------------

//---------CRUD FUNCTIONS--------------

function list(){
    return knex("tables as tb")
    .select("*")
    .orderBy("tb.table_name")
}

module.exports = {
    list,
}