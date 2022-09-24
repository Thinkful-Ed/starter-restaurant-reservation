const knex = require("../db/connection");

function createTable(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

function readTable(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

async function seatTable(tableId, reservationId) {
  const trx = await knex.transaction();

  return trx("tables")
    .where({ table_id: tableId })
    .update({ status: "occupied", reservation_id: reservationId })
    .then(function () {
      return trx("reservations")
        .where({ reservation_id: reservationId })
        .update({ status: "seated" });
    })
    .then(trx.commit)
    .catch(trx.rollback);
}

function unseatTable(tableId) {
  return knex("tables")
    .select("*")
    .where({ table_id: tableId })
    .update({ status: "free", reservation_id: null });
}

function listTables() {
  return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
  createTable,
  readTable,
  seatTable,
  unseatTable,
  listTables,
};
