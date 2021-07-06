const db = require("../db/connection");

const list = () =>
  db("reservations")
    .select("*")
    .orderBy(["reservation_date", "reservation_time"]);

const read = (reservation_id) =>
  db("reservations").first("*").where({ reservation_id });

const listByDate = (reservation_date) =>
  db("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time");

const create = (reservation) =>
  db("reservations")
    .insert(reservation, "*")
    .then((data) => data[0]);

module.exports = {
  list,
  read,
  listByDate,
  create,
};
