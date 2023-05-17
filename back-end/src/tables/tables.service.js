const knex = require("../db/connection");

function list() {
  return knex("tables").orderBy("table_name", "asc");
}

function read(table_id) {
  return knex("tables").where({ table_id}).first();
}

function create(table) {
  return knex("tables")
    .insert(table, "*")
    .then((createdRecords) => createdRecords[0]);
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

    return knex("tables")
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