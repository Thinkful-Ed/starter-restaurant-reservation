const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*").orderBy("reservation_time");
}

function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where({reservation_id})
        .then(rows => rows[0]);
}

function readDate(date){
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

function update(updatedRes){
    return knex("reservations")
    .select("*")
    .where({reservation_id: updatedRes.reservation_id})
    .update(updatedRes, "*")
    .then(records => records);
}

function destroy(reservation_id){
    return knex("reservations")
        .where({reservation_id})
        .del();
}

module.exports = {
    list,
    read,
    readDate,
    create,
    update,
    destroy
}