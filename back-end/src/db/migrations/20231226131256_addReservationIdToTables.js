exports.up = function (knex) {
	return knex.schema.table("tables", (table) => {
		table
			.integer("reservation_id")
			.references("reservation_id")
			.inTable("reservations")
			.onDelete("cascade");
	});
};

exports.down = function (knex) {
	return knex.schema.table("tables", (table) => {
		table.dropColumn("reservation_id");
	});
};
