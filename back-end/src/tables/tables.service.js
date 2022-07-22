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

function read(table_id) {
	return knex("tables").select("*").where({ table_id }).first();
}

function readReservation(reservation_id) {
	return knex("reservations").select("*").where({ reservation_id }).first();
}

function update(data,status) {
		return knex.transaction(async (trx )=> {
			
			const table = await knex("tables")
				.where("table_id", data.table_id)
				.update(data)
				.returning("*")
				.transacting(trx)
				.then((updatedRecords) => updatedRecords[0])
			
			await knex("reservations")
				.where("reservation_id", data.reservation_id)
				.update(status)
				.returning("*")
				.transacting(trx)
				.then((updatedRecords)=>updatedRecords[0])
				
			return table
		})	
}

function destroy(data,status,reservation_id){
	return knex.transaction(async (trx )=> {
			
		const table = await knex("tables")
			.where("table_id", data.table_id)
			.update(data)
			.returning("*")
			.transacting(trx)
			.then((updatedRecords) => updatedRecords[0])
		
		await knex("reservations")
			.where({reservation_id})
			.update(status)
			.returning("*")
			.transacting(trx)
			.then((updatedRecords)=>updatedRecords[0])
			
		return table
	})	
}

module.exports = {
	list,
	create,
	read,
	update,
	destroy,
	readReservation,
};
