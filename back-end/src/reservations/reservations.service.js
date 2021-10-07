const knex = require("../db/connection");

const reservName = "reservations";

const list = (date) => {
  // if a date argument was passed in, we apply that search restriction
  if (date) {
    return knex(reservName)
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_time");
  }
  // otherwise, just return all the reservations
  return knex(reservName).select("*");
};

const create = (reservation) => {
  return knex(reservName).insert(reservation).returning("*");
};

module.exports = {
  list,
  create,
};
