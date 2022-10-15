const knex = require("../db/connection");

function list(date) {
  return knex("tables").select().orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select().where({ table_id }).first();
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((tableData) => tableData[0]);
}

function seat(table_id, reservation_id) {
  return knex("tables").select().where({ table_id }).update({ reservation_id });
}

function unseat(table_id) {
  return knex("tables")
    .select()
    .where({ table_id })
    .update({ reservation_id: null });
}
module.exports = {
  list,
  read,
  create,
  seat,
  unseat,
};
