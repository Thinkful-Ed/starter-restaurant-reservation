const knex = require("../db/connection");

/**
 * Makes list request to the database for tables ordered by table name.
 */
function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).first();
}

/**
 * Makes create request to the database for a new table.
 */
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

/**
 * Makes update request to the database for a table.
 */
function update(table_id, reservation_id) {
  return knex("tables").select("*").where({ table_id: table_id }).update(
    {
      reservation_id: reservation_id,
      status: "Occupied",
    },
    "*"
  );
}

function destroy(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).update({
    reservation_id: null,
    status: "Free",
  });
}

module.exports = {
  list,
  read,
  create,
  update,
  destroy,
};
