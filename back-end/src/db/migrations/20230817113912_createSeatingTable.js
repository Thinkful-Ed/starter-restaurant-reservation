exports.up = function (knex) {
	return knex.schema.createTable('seating', (table) => {
		table.increments('table_id').primary();
		table.string('table_name').notNullable();
		table.integer('capacity').notNullable();
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('seating');
};
