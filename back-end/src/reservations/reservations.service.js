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
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");

const create = (reservation) =>
  db("reservations")
    .insert(reservation, "*")
    .then((data) => data[0]);

const update = (reservation_id, payload) =>
  db("reservations")
    .where({ reservation_id })
    .update(payload, "*")
    .then((res) => res[0]);

const search = (mobile_number) =>
  db("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");

module.exports = {
  list,
  read,
  listByDate,
  create,
  update,
  search,
};
