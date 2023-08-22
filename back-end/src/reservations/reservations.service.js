const knex = require('../db/connection');

const tableName = 'reservations';

function listAll() {
	return knex(tableName)
	.select('*')
	.orderBy('reservation_date');
}

function listDate(date) {
	return knex(tableName)
		.select('*')
		.where({ reservation_date: date })
		.orderBy('reservation_time');

}

function create(newReservation) {
	return knex(tableName)
		.insert(newReservation)
		.returning('*')
		.then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
	return knex(tableName)
		.select('*')
		.where({ reservation_id })
		.first();
}

module.exports = {
	listAll,
	listDate,
	create,
	read,
};
