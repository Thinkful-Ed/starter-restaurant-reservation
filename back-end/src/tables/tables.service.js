const knex = require("../db/connection.js");

//---------HELPER FUNCTIONS------------

//---------CRUD FUNCTIONS--------------

function list() {
	return knex("tables as tb").select("*").orderBy("tb.table_name");
}

function create(table) {
	return knex("tables")
		.insert(table)
		.returning("*")
		.then((createdRecords) => createdRecords[0]);
}

module.exports = {
	list,
	create,
};
