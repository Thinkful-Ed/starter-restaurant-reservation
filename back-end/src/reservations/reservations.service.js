const knex = require("../db/connection");

function list() {
    return knex("reservations")
        .select("*")
        .orderBy("reservation_time");
}

function listByDate(reservation_date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date })
        .orderBy("reservation_time");
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((newReservation) => newReservation[0]);
}

function read(reservation_id) {
	return knex("reservations")
		.select("*")
		.where({reservation_id})
		.first();
}

module.exports = {
    list,
    listByDate,
    create,
    read
};