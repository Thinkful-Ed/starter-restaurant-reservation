const knex = require("../db/connection.js");

function list() {
	return knex("tables as tb").select("*").orderBy("tb.table_name");
}

function create(table) {
	return knex("tables")
		.insert(table)
		.returning("*")
		.then((createdRecords) => createdRecords[0]);
}

function read(table_id) {
	return knex("tables")
        .select("*")
        .where({ table_id })
        .first();
}

function readReservation(reservation_id) {
	return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first();
}

function update(data) {
	return knex("tables")
		.select("*")
		.where("table_id", data.table_id)
		.update(data)
		.returning("*")
		.then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
	list,
	create,
	read,
	update,
	readReservation
};