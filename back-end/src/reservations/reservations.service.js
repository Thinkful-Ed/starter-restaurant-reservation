const knex = require("../db/connection");


function read(reservation) {

}
function create(reservation) {
    return knex("reservations")
    .insert(reservation);
}
function list(reservation_date) {
        return knex("reservations")
        .where({reservation_date})
        .orderBy("reservation_time", "asc");
}

module.exports = {
    list,
    create
}