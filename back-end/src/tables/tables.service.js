/** @format */

const knex = require("../db/connection");

function create(newTable) {
	return knex("tables")
		.insert(newTable)
		.returning("*")
		.then((createdRecord) => createdRecord[0]);
}

function read(table_id) {
	return knex("tables").select("*").where({ table_id }).first();
}

function update(updatedTable) {
	return knex("tables")
		.select("*")
		.where({ table_id: updatedTable.table_id })
		.update(updatedTable, "*")
		.then((updatedRecords) => updatedRecords[0]);
}

function list() {
	return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
	create,
	read,
	update,
	list,
};
