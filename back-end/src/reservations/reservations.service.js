/** @format */

const knex = require("../db/connection");

const create = (newReservation) =>
	knex("reservations").insert(newReservation).returning("*");

const read = (reservationId) =>
	knex("reservations")
		.select("*")
		.where({ reservation_id: reservationId })
		.first();

const update = (reservationId, updatedStatus) =>
	knex("reservations")
		.select("status")
		.where({ reservation_id: reservationId })
		.update(updatedStatus, "*");

const list = (reservationDate) =>
	knex("reservations")
		.select("*")
		.where({ reservation_date: reservationDate })
		.orderBy("reservation_time");

const search = (mobile_number) =>
	knex("reservations")
		.whereRaw(
			"translate(mobile_number, '() -', '') like ?",
			`%${mobile_number.replace(/\D/g, "")}%`,
		)
		.orderBy("reservation_date");

module.exports = {
	create,
	read,
	update,
	list,
	search,
};
