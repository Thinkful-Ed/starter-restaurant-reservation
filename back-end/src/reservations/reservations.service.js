const knex = require("../db/connection.js")

//-------------HELPER FUNCTIONS--------------



//-------------CRUD FUNCTIONS----------------

function list(){
    return knex("reservations").select("*")
}

function create(reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecords)=>createdRecords[0])
}



module.exports = {
    list,
    create
}