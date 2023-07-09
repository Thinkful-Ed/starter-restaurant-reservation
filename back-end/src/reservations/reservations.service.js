/** @format */

const knex = require("../db/connection");

function create(newReservation) {
	return knex("reservations")
		.insert(newReservation)
		.returning("*")
		.then((createdRecord) => createdRecord[0]);
}

function read(reservation_id) {
	return knex("reservations").select("*").where({ reservation_id }).first();
}

function update(updatedReservation) {
	return knex("reservations")
		.select("*")
		.where({ reservation_id: updatedReservation.reservation_id })
		.update(updatedReservation, "*")
		.then((updatedRecords) => updatedRecords[0]);
}

function updateStatus(updatedReservation) {
	return knex("reservations")
		.select("*")
		.where({ reservation_id: updatedReservation.reservation_id })
		.update({ status: updatedReservation.status }, "*")
		.then((updatedRecords) => updatedRecords[0]);
}

function list() {
	return knex("reservations")
		.select("*")
		.whereIn("status", ["seated", "booked"])
		.orderBy("reservation_date", "asc")
		.orderBy("reservation_time", "asc");
}

//list reservations by date

function listByDate(reservation_date) {
	return knex("reservations")
		.select("*")
		.where({ reservation_date })
		.whereIn("status", ["seated", "booked"])
		.orderBy("reservation_time", "asc");
}

//find reservations by mobile number

function search(mobile_number) {
	return knex("reservations")
		.whereRaw(
			"translate(mobile_number, '() -', '') like ?",
			`%${mobile_number.replace(/\D/g, "")}%`,
		)
		.orderBy("reservation_date");
}

module.exports = {
	create,
	read,
	update,
	updateStatus,
	list,
	listByDate,
	search,
};
