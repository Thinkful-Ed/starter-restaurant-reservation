/** @format */

exports.up = function (knex) {
	return knex.schema.alterTable("reservations", (table) => {
		table.string("status").notNullable().defaultTo("booked");
	});
};

exports.down = function (knex) {
	return knex.schema.alterTable("reservations", (table) => {
		table.dropColumn("status");
	});
};
