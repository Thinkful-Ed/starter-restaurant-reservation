const knex = require("../db/connection");


function create(newTable) {
    return knex("tables")
      .insert({
        table_name: newTable.table_name,
        capacity: newTable.capacity,
        reservation_id: null
      })
      .returning("*");
  }


  function read(table_id) {
    return knex("tables").select("*").where({ table_id }).first();
  }

  function readReservation(reservation_id) {
    return knex("reservations").select("*").where({reservation_id}).first();
  }


function list() {
    return knex("tables")
    .select("*")
}

function listAvailable() {
    return knex("tables")
    .select("*")
    .where({ "tables.reservation_id": null })
}

function update(updatedTable) {
    return knex("tables")
      .where({ table_id: updatedTable.table_id })
      .update({ reservation_id: updatedTable.reservation_id })
      .returning("*");
  }

  function deleteReservationId(table_id) {
    return knex("tables")
      .where({ table_id })
      .update({ reservation_id: null });
  }


module.exports = {
    create,
    read,
    readReservation,
    list,
    listAvailable,
    update,
    deleteReservationId
}