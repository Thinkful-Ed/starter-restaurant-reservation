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
		.andWhereNot({ status: 'finished' })
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

function update(reservation_id, status) {
	return knex(tableName)
		.where({ reservation_id: reservation_id })
		.update({ status: status })
		.returning('*')
		.then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
	listAll,
	listDate,
	create,
	read,
	update,
};
