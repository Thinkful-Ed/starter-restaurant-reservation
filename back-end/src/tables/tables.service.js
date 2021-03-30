const knex = require("../db/connection");

const tableName = "tables";

function list(date) {
  return knex(tableName)
    .orderBy("table_name");
}

function create(table) {
  return knex(tableName)
    .insert(table, "*")
    .then((createdTables) => createdTables[0]);
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

module.exports = {
  create,
  list,
  seat
};
