const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name", "asc");
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
  
  function destroy(table) {
    return knex.transaction(async (transaction) => {
      await knex("reservations")
        .where({ reservation_id: table.reservation_id })
        .update({ status: "finished" })
        .transacting(transaction);
  
      return knex("tables")
        .where({ table_id: table.table_id })
        .update({ reservation_id: null }, "*")
        .transacting(transaction)
        .then((records) => records[0]);
    });
  }
  
  function update(table_id, reservation_id) {
    return knex.transaction(async (transaction) => {
      await knex("reservations")
        .where({ reservation_id })
        .update({ status: "seated" })
        .transacting(transaction);
  
      return knex("tables")
        .where({ table_id })
        .update({ reservation_id }, "*")
        .transacting(transaction)
        .then((records) => records[0]);
    });
  }
  
  module.exports = {
    list,
    create,
    read,
    update,
    readReservation,
    destroy,
  };