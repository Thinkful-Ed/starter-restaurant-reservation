const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).first();
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(table_id, reservation_id) {
  return knex("tables").select("*").where({ table_id: table_id }).update(
    {
      reservation_id: reservation_id,
      status: "Occupied",
    },
    "*"
  );
}

module.exports = {
  list,
  read,
  create,
  update,
};
