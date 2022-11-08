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

function update(reservation_id, table_id) {
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
          .then((seatedReservation) => seatedReservation[0]);
      });
  });
}

function finished(table_id, reservation_id) {
  return knex.transaction(function (trx) {
    return trx("tables")
      .where({ table_id: table_id })
      .update({ reservation_id: null })
      .then((resp) => {
        return trx("reservations")
          .where({ reservation_id })
          .update({ status: "finished" })
          .then(() => resp);
      });
  });
}

// function unseat({ table_id, reservation_id }) {
//   return knex.transaction(function (trx) {
//     return trx("tables")
//       .where({ table_id: table_id })
//       .update({ reservation_id: null })
//       .returning("*")
//       .then((updated) => updated[0])
//       .then((updated) => {
//         return trx("reservations")
//           .where({ reservation_id })
//           .update({ status: "finished" });
//       });
//   });
// }

module.exports = {
  list,
  create,
  read,
  update,
  finished,
};
