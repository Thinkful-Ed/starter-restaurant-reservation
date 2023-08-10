const knex = require("../db/connection")

const table = "reservations"


function getAllReservations(){
    return knex(table).select("*")
}

function reservationsOnDate(date){
    return knex(table).select("*").where({reservation_date: date})
}


module.exports = {
    getAllReservations,
    reservationsOnDate
}