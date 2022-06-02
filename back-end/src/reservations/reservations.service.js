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

function readByDate(date){
    return knex("reservations")
        .select("*")
        .where({reservation_date: date})
        .andWhere('status','!=','finished')
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
    .then(records => records[0]);
}

function destroy(reservation_id){
    return knex("reservations")
        .where({reservation_id})
        .del();
}

module.exports = {
    list,
    read,
    readByDate,
    create,
    update,
    destroy
}