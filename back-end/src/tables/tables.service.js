const knex = require("../db/connection");

function list() {
    return knex("tables")
      .select("*")
      .orderBy("table_name");
  }

function read(table_id) {
    return knex("tables")
    .select("*")
    .where({ table_id })
    .first();
}

function create(table) {
    return knex("tables")
      .insert(table)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
  }

module.exports = {
    list,
    read,
    create,
}