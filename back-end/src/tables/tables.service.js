const knex = require("../db/connection");

const tableName = "tables";

const list = () => {
  return knex(tableName).select("*");
};

const create = (table) => {
  return knex(tableName).insert(table).returning("*");
};

module.exports = {
  list,
  create,
};
