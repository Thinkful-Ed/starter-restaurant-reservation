const data = require('./01-tables.json');

exports.seed = function (knex) {
	return knex('tables')
	.truncate()
	.then(function () {
		return knex('tables').insert(data);
	});
}
