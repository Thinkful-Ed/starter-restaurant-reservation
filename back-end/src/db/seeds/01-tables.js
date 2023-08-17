const tables = require('./00-tables.json');

exports.seed = function (knex) {
	return knex
		.raw('TRUNCATE TABLE reservations RESTART IDENTITY CASCADE')
		.then(function () {
			return knex('tables').insert(tables);
		});
};