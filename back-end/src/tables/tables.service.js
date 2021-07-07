const db = require("../db/connection");

const list = () => db("tables").select("*").orderBy("table_name");
const read = (table_id) => db("tables").first("*").where({ table_id });
const create = (table) =>
  db("tables")
    .insert(table, "*")
    .then((res) => res[0]);
const seatReservation = (table_id, reservation_id) =>
  db("tables").where({ table_id }).update({ reservation_id }, "*");

module.exports = { list, read, create, seatReservation };
