const knex = require("../db/connection");

function list() {
  return knex('tables').select('*').orderBy('table_name');
}

function create (table) {
    return knex('tables')
      .insert(table)
      .returning('*')
      .then(result => result[0])
  }

  function read(tableId) {
    return knex('tables').select('*').where({ table_id: tableId }).first();
  }

  function setReservationId(tableId, reservationId){
    return knex('tables').select('*').where({ table_id: tableId }).update({reservation_id: reservationId});
  }

module.exports = {
    list,
    create,
    read,
    setReservationId
}