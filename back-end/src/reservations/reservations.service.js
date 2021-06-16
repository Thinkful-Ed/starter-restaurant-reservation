const knex = require("../db/connection");
const reservations = "reservations";

async function list() {
  return knex(reservations).select("*");
}

function create(newReservation) {
  return knex(reservations)
    .insert(newReservation, "*")
    .then((createdRecords) => createdRecords[0]);
}

async function read() {}

async function update() {}

module.exports = { list, create };
