const knex = require("../db/connection");

function read(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

function update(updatedTable, reservation_id) {
  return knex.transaction((trx) => {
    return trx("reservations")
      .transacting(trx)
      .where({ reservation_id: reservation_id })
      .update({ status: "seated" })
      .then(() => {
        return trx("tables")
          .select("*")
          .where({ table_id: updatedTable.table_id })
          .update(updatedTable, "*");
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
}


function create(table) {
  return knex("tables as t")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function destroy(table_id, reservation_id) {
    return knex.transaction((trx) => {
      return trx("reservations")
        .transacting(trx)
        .where({ reservation_id: reservation_id })
        .update({ status: "finished" })
        .then(() => {
          return trx("tables")
          .where({ table_id })
          .update({ reservation_id: null, status: "Free" })
          .returning("*");
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  }



function list() {
  return knex("tables").orderBy("table_name", "asc");
}

module.exports = { list, create, read, update, destroy };
