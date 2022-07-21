const knex = require("../db/connection.js");

//-------------HELPER FUNCTIONS--------------

//-------------CRUD FUNCTIONS----------------

function list(reservation_date) {
	return knex("reservations as rs")
		.select("*")
		.where({ reservation_date })
		.whereNot("rs.status", "finished")
		.orderBy("rs.reservation_time");
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

function updateStatus(data, reservation_id) {
	return knex("reservations")
		.select("*")
		.where({reservation_id})
		.update(data)
		.returning("*")
		.then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
	list,
	create,
	read,
	updateStatus
};
