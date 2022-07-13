const knex = require("../db/connection.js")

//-------------HELPER FUNCTIONS--------------



//-------------CRUD FUNCTIONS----------------

function list(){
    return knex("reservations").select("*")
}



module.exports = {
    list
}