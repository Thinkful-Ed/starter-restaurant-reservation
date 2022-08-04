const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}
function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}
function readReservation(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

async function update(updatedReservation, table_id) {
  try {
    await knex.transaction(async (trx) => {
      await trx("reservations")
        .select("*")
        .where({ reservation_id: Number(updatedReservation.reservation_id) })
        .update({ status: "seated" })
        .then((upReservation) => upReservation[0]);
    });

    await knex.transaction(async (trx) => {
      await trx("tables")
        .select("*")
        .where({ table_id })
        .update({ reservation_id: Number(updatedReservation.reservation_id) })
        .then((upReservation) => upReservation[0]);
    });
  } catch (error) {
    console.error(error);
  }
}

async function freeUpTable(table_id, reservation_id) {
  try {
    await knex.transaction(async (trx) => {
      await trx("reservations")
        .select("*")
        .where({ reservation_id })
        .update({ status: "finished" })
        .then((upReservation) => upReservation[0]);
    });

    await knex.transaction(async (trx) => {
      await trx("tables")
        .select("*")
        .where({ table_id })
        .update({ reservation_id: null })
        .then((upReservation) => upReservation[0]);
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  list,
  create,
  read,
  readReservation,
  update,
  freeUpTable,
};
