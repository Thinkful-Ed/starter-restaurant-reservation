const knex = require("../db/connection");

/**
 * List services for reservation resources
 */
function list() {
	return knex("reservations as r")
		.select("*")
		.orderBy("r.reservation_time", "asc");
}
function listDate(date) {
	return knex("reservations as r")
		.select("*")
		.where({ "r.reservation_date": date })
		.whereNot({ "r.status": "finished" })
		.orderBy("r.reservation_time", "asc");
}
function search(mobile_number) {
	return knex("reservations")
		.whereRaw(
			"translate(mobile_number, '() -', '') like ?",
			`%${mobile_number.replace(/\D/g, "")}%`,
		)
		.orderBy("reservation_date");
}

/**
 * CRUD services for reservation resources
 * Returns a list, of which we only need the first element
 */
function create(reservation) {
	return knex("reservations")
		.insert(reservation)
		.returning("*")
		.then((createdReservations) => createdReservations[0]);
}
function read(id) {
	return knex("reservations as r")
		.select("*")
		.where({ "r.reservation_id": id })
		.then((reservations) => reservations[0]);
}
function update(updatedReservation, id) {
	return knex("reservations")
		.select("*")
		.where({ reservation_id: id })
		.update(updatedReservation, "*")
		.then((updatedReservations) => updatedReservations[0]);
}

module.exports = {
	list,
	listDate,
	search,
	create,
	read,
	update,
};
