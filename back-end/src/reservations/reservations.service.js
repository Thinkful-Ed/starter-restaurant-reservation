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

module.exports = {
    list,
    listByDate,
    create
}