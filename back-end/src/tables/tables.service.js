const knex = require("../db/connection");

/**
 * Makes a list request to the database for tables ordered by table name.
 */
function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).first();
}

/**
 * Makes a create request to the database for a new table.
 */
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

/**
 * Makes an update request to the database for a table.
 */
function update(table_id, reservation_id) {
  return knex("tables").select("*").where({ table_id: table_id }).update(
    {
      reservation_id: reservation_id,
    },
    "*"
  );
}
/**
 * Makes an update request to the tables database to remove a reservation from the table.
 */
function destroy(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).update({
    reservation_id: null,
  });
}

module.exports = {
  list,
  read,
  create,
  update,
  destroy,
};
