const knex = require("../db/connection");

function list(date) {
  return knex("tables").select().orderBy("table_name");
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((tableData) => tableData[0]);
}

function read(table_id) {
  return knex("tables").select().where({ table_id }).first();
}

function seat(table_id, reservation_id) {
  return knex.transaction(function (trx) {
    return trx("tables")
      .where({ table_id })
      .update({ reservation_id })
      .returning("*")
      .then(() => {
        return trx("reservations")
          .where({ reservation_id })
          .update({ status: "seated" })
          .returning("*")
          .then((updatedResponse) => updatedResponse[0]);
      });
  });
}

function unseat({ table_id, reservation_id }) {
  return knex.transaction(function (trx) {
    return trx("tables")
      .where({ table_id })
      .update({ reservation_id: null })
      .returning("*")
      .then(() => {
        return trx("reservations")
          .where({ reservation_id })
          .update({ status: "finished" })
          .returning("*")
          .then((tableData) => tableData[0]);
      });
  });
}

module.exports = {
  list,
  create,
  read,
  seat,
  unseat,
};
