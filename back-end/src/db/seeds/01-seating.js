const data = require('./01-seating.json');

exports.seed = function (knex) {
	return knex
		.raw('TRUNCATE TABLE reservations RESTART IDENTITY CASCADE')
		.then(function () {
			return knex('seating').insert(data);
		});
};