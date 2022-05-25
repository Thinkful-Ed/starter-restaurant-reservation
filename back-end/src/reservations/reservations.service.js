const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*");
}

function read(date){
    return knex("reservations")
        .select("*")
        .where({reservation_date: date});
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