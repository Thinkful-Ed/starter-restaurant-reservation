const knex = require("../db/connection");

const tableName = "tables";
const reservName = "reservations";

const list = () => {
  return knex(tableName).select("*");
};

const create = (table) => {
  return knex(tableName)
    .insert(table)
    .returning("*")
    .then((createdTable) => createdTable[0]);
};

const update = (reservationId, tableId) => {
  return knex(reservName)
    .where({ reservation_id: reservationId })
    .update({ status: "seated" })
    .then(() => {
      return knex(tableName)
        .where({ table_id: tableId })
        .update({ reservation_id: reservationId })
        .returning("*");
    });
};

const readTable = (tableId) => {
  return knex(tableName).select("*").where({ table_id: tableId }).first();
};

const clearTable = (reservationId, tableId) => {
  return knex(reservName)
    .where({ reservation_id: reservationId })
    .update({ status: "finished" })
    .returning("*")
    .then(() => {
      return knex(reservName)
        .where({ table_id: tableId })
        .update({ reservation_id: null });
    });
};

module.exports = {
  list,
  create,
  update,
  readTable,
  clearTable,
};
