//const { select } = require("../db/connection")
const knex = require("../db/connection")

function list(){
    return knex("reservations")
    .select("*")
    .orderBy("reservation_date")
    .orderBy("reservation_time");
}

function listByDate(date){
    return knex("reservations")
        .select("*")
        .where({reservation_date: date})
        .orderBy("reservation_time")
}

function create(reservation){
    return knex("reservations")
    .insert(reservation)
    .returning("*")
}

module.exports = {
    list,
    listByDate,
    create,
}