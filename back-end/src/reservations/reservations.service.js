const knex = require("../db/connection.js")

//-------------HELPER FUNCTIONS--------------



//-------------CRUD FUNCTIONS----------------

function list(date){
    return knex("reservations as rs")
        .select("*")
        .where("rs.reservation_date", date)
        .orderBy("rs.reservation_time")
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