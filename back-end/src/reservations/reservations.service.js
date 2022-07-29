// load in knex connection
const knex = require("../db/connection")

function list(){
    return knex('reservations').select("*")
    
}

function listByDate(date){
    return knex('reservations').where({ reservation_date : date }).orderBy("reservation_time")
    
}

function create(res){
    return knex("reservations")
    .insert(res)
    .returning("*")
    .then((res)=> res[0])
}

function read(reservation_id){
    return knex("reservations")
    .select("*")
    .where({reservation_id})
    .first()
}

function changeToFinished(reservation_id){
    return knex("reservations")
    .where({reservation_id})
    .update({status: "finished"})
}

// function update(reservationId){
//     // console.log("reservationId", reservationId)
//     // return knex("tables")
//     // .where({reservation_id: reservationId})
//     // .update({table_status: "occupied"})
// }

module.exports = {
    list,
    listByDate,
    create,
    read,
    changeToFinished
    // update
}