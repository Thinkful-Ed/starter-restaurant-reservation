const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

module.exports = {
  list,
};
