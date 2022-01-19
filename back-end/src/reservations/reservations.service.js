const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*").orderBy("reservation_time")
}
function listByDate(reservation_date){
    return knex("reservations")
    .select("*")
    .where({reservation_date})
    .whereNot({status: "finished"})
    .whereNot({status: 'cancelled'})
    .orderBy('reservation_time')
}

function create(reservation){
    return knex("reservations")
    .insert(reservation, "*")
    .then((res) =>[0]);
}