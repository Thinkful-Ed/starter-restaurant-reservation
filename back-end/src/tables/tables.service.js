const knex = require("../db/connection");

function list() {
   return knex("tables").select("*").orderBy("table_name");
}

function create(newTable) {
   return knex("tables")
	 .insert({
	   ...newTable,
	   table_status: newTable.reservation_id ? "occupied" : "free",
	 })
	 .returning("*")
	 .then((result) => result[0]);
}

function readReservation(reservation_id) {
  return knex("reservations")
	.select("*")
	.where({ reservation_id })
	.first();
}

function readTable(table_id) {
  return knex("tables")
  .select("*")
  .where({ table_id })
  .first();
}

function readTableByReservation(reservation_id) {
  return knex("tables")
	.where({ reservation_id })
	.whereExists(knex.select("*").from("tables").where({ reservation_id }))
	.then((result) => result[0]);
}

async function update(reservation_id, table_id) {
  return knex("tables")
	.where({ table_id: Number(table_id) })
	.select("reservation_id", "table_status")
	.update(
	  {
		reservation_id: Number(reservation_id),
		table_status: "occupied",
	  }
	)
	.then(() =>
	  knex("reservations").where({ reservation_id: Number(reservation_id) }).update({ status: "seated" })
	)
}

async function deleteTableReservation(table_id) {
 return knex("tables")
 .where({ table_id: table_id })
 .update(
   {
	 reservation_id: null,
	 table_status: "free",
   }
 )
}

module.exports = {
   list,
   create,
   readReservation,
   readTable,
   readTableByReservation,
   update,
   deleteTableReservation,
}