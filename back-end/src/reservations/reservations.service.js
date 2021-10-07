const knex = require("../db/connection");

const tableName = "reservations";

const list = (date) => {
  // if a date argument was passed in, we apply that search restriction
  if (date) {
    return knex(tableName)
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_time");
  }
  // otherwise, just return all the reservations
  return knex(tableName).select("*");
};

const create = (reservation) => {
  return knex(tableName).insert(reservation).returning("*");
};

module.exports = {
  list,
  create,
};
