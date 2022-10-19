const knex = require("../db/connection")

function list(){
    return knex("reservations")
        .select("*")
}

function listByDate(reservation_date){
    return knex("reservations")
        .distinct()
        .select("*")
        .where({ "reservation_date": reservation_date })
}

function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first()
}

module.exports = {
    list,
    listByDate,
    read
}