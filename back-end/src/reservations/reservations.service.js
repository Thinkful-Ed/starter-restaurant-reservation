const knex = require("../db/connection");
const reservations = "reservations";

async function list() {
  return knex(reservations).select("*");
}

async function create() {}

async function read() {}

async function update() {}

module.exports = { list };
