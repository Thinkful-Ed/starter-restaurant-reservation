const data = require('./00-reservations.json');

exports.seed = function (knex) {
	return knex('reservations')
	.truncate()
	.then(function () {
		return knex('reservations').insert(data);
	});
}
