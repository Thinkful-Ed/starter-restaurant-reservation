const knex = require("../db/connection.js");

//-------------HELPER FUNCTIONS--------------

//-------------CRUD FUNCTIONS----------------

function listByDate(reservation_date) {
	return knex("reservations as rs")
		.select("*")
		.where({ reservation_date })
		.whereNot("rs.status", "finished")
		.orderBy("rs.reservation_time");
}

function listByTelephoneNumber(mobile_number) {
	return knex("reservations as rs")
		.whereRaw(
			"translate(mobile_number, '() -', '') like ?",
			`%${mobile_number.replace(/\D/g, "")}%`
		)
		.orderBy("rs.reservation_date");
}

function read(reservation_id) {
	return knex("reservations").select("*").where({ reservation_id }).first();
}

function create(reservation) {
	return knex("reservations")
		.insert(reservation)
		.returning("*")
		.then((createdRecords) => createdRecords[0]);
}

function update(data, reservation_id) {
	return knex("reservations")
		.select("*")
		.where({ reservation_id })
		.update(data)
		.returning("*")
		.then((updatedRecords) => updatedRecords[0]);
}

function updateReservation(data, reservation_id) {}

module.exports = {
	listByDate,
	listByTelephoneNumber,
	create,
	read,
	update,
};
