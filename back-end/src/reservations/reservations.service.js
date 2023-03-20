const knex = require("../db/connection");

function list(date = null, time=null){
    if(date){
        return knex("reservations").where({reservation_date: date}).orderBy('reservation_time')
    }
    return knex("reservations").orderBy('reservation_time')
}

function create(reservation){
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

module.exports = {
    list,
    create
}