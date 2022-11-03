const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("tables.table_name");
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createRecords) => createRecords[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

// /PUT to /tables/:table_id/seat/ to save table assignment
// function update(reservation_id, table_id) {
//   return knex("tables")
//     .select("*")
//     .where({ table_id: table_id })
//     .update(reservation_id, "*")
//     .then((updatedRecord) => updatedRecord[0]);
// }

function update(table_id, reservation_id) {
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
          .then((updatedReservation) => updatedReservation[0]);
      });
  });
}

function finished(table_id, reservation_id) {
  return knex.transaction(function (trx) {
    return trx("tables")
      .where({ table_id: table_id })
      .update({ reservation_id: null })
      .then(() => {
        return trx("reservations")
          .where({ reservation_id })
          .update({ status: "finished" });
      });
  });
}

module.exports = {
  list,
  create,
  read,
  update,
  finished,
};
