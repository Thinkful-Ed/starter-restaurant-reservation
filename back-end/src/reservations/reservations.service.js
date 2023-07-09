/**
 * interact with PostgreSQL database
 * set of functions to perform CRUD operations on the reservations table
 * use Knex library;
 * knex object imported from db/connection represents the configured database connection
 *
 * @format
 */
const knex = require("../db/connection");

// Insert a new reservation record into the reservations table.
// Return the newly created record within all ("*") other columns.
function create(newReservation) {
	return knex("reservations")
		.insert(newReservation)
		.returning("*")
		.then((newRecord = newRecord[0]));
}

// Retrieve and return the first reservation record that matches the provided input value.
// Use .where to filter and match the records in the reservation_id column with input.
function read(reservation_id) {
	return knex("reservations").select("*").where({ reservation_id }).first();
}

// Update the reservation record in the reservations table with the provided data.
function update(updatedReservation) {
	return knex("reservations")
		.select("*")
		.where({ reservation_id: updatedReservation.reservation_id })
		.update((updatedRecords) => updatedRecords[0]);
}

// Update the status of an existing reservation.
// where reservation ID matches the updatedReservation ID input.
function updateStatus(updatedReservation) {
	return knex("reservations")
		.select("*")
		.where({ reservation_id: updatedReservation.reservation_id })
		.update({ status: updatedReservation.status }, "*")
		.then((updatedRecorrds) => updatedRecords[0]);
}
// Retrieve a list of reservations with the status of seated or booked.
// Return in ascending order by date and time of reservation.
function list() {
	return knex("reservations")
		.select("*")
		.whereIn("status", ["seated", "booked"])
		.orderBy("reservation_date", "asc")
		.orderBy("reservation_time", "asc");
}

// Retrieve a list of reservations that have a status of either booked or seated.
// Return for a specific date, ordered by reservation time.
function listByDate(reservation_date) {
	return knex("reservations")
		.select("*")
		.where({ reservation_data })
		.whereIn("status", ["seated", "booked"])
		.orderBy("reservation_time", "asc");
}

// Search for reservations associated with a specific mobile number
// Return ordered by reservation date
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
