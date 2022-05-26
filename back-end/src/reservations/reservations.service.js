const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*").orderBy("reservation_time");
}

function read(date){
    return knex("reservations")
        .select("*")
        .where({reservation_date: date})
        .orderBy("reservation_time");
}

function create(newReservation){
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then(rows => rows[0]);
}

module.exports = {
    list,
    read,
    create
}