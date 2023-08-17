const knex = require("../db/connection");

function list() {
  return knex("seating")
  .select("*")
  .orderBy("seating_name");
}

// function listAll() {
//   return knex("seating")
//   .select("*")
//   .orderBy("seating_name");
// }

module.exports = {
  list,
};