const knex = require("../db/connection");

function list(date) {
  return knex("reservations").select("*").where({ reservation_date: date });
}

module.exports = {
  list,
};
