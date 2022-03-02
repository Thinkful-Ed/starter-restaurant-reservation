const knex = require("../db/connection");
const tableName = "reservations"

function list() {
    return knex(tableName).select("*");
  }