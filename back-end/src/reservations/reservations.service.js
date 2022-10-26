const knex = require("../db/connection")

function list(){
    return knex("reservations")
        .select("*")
}

function listByDate(reservation_date){
    return knex("reservations")
        .select("*")
        .where({ reservation_date })
}

function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first()
}

function create(newReservation){
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
}

// function destroy(reservation_id){
//     return knex("reservations")
//         .select("*")
//         .where({ reservation_id })
//         .del()
// }

module.exports = {
    list,
    listByDate,
    read,
    create,
    // destroy
}