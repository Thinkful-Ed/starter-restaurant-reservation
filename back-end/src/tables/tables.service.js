const knex = require("../db/connection");

const list = () => {
  return knex("tables").select("*").orderBy("table_name");
};

const create = (newTable) => {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
};

const read = (table_id) => {
  return knex("tables").select("*").where({ table_id: table_id }).first();
};

// Read reservation by id in order to update a table //
const readReservation = (reservation_id) => {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
};

const update = async (updatedTable, updatedReservation) => {
  const trx = await knex.transaction();
  return trx("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    .then((updatedRecords) => updatedRecords[0])
    .then(() => {
      return trx("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*")
        .then((updatedResRecords) => updatedResRecords[0]);
    })
    .then(trx.commit)
    .catch(trx.rollback);
};

module.exports = {
  create,
  list,
  read,
  readReservation,
  update,
};