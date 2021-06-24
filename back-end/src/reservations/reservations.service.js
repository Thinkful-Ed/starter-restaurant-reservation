const db = require("../db/connection");

const list = () => db("reservations").select("*");
const listByDate = (reservation_date) => {
  return db("reservations").select("*").where({ reservation_date });
};
const create = (reservation) => db("reservations").insert(reservation, "*");

module.exports = {
  list,
  listByDate,
  create,
};
