const knex = require("../db/connection");
const tableName = "tables";

function list() {
  return knex(tableName).orderBy("table_name", "asc");
}

function create(table) {
  return knex(tableName)
    .insert(table, "*")
    .then((createdRecords) => createdRecords[0]);
}

function read(table_id) {
  return knex(tableName).where({ table_id: table_id }).first();
}

function seat(table_id, reservation_id) {
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

function finish(table) {
  return knex.transaction(async (transaction) => {
    await knex("reservations")
      .where({ reservation_id: table.reservation_id })
      .update({ status: "finished" })
      .transacting(transaction);

    return knex(tableName)
      .where({ table_id: table.table_id })
      .update({ reservation_id: null }, "*")
      .transacting(transaction)
      .then((records) => records[0]);
  });
}

module.exports = {
  list,
  create,
  read,
  seat,
  finish
};