const db = require("../db/connection");

const list = () => db("tables").select("*").orderBy("table_name");
const read = (table_id) => db("tables").first("*").where({ table_id });
const create = (table) =>
  db("tables")
    .insert(table, "*")
    .then((res) => res[0]);

const seatReservation = (table_id, reservation_id) =>
  db.transaction((trx) =>
    trx("tables")
      .where({ table_id })
      .update({ reservation_id }, "*")
      .then((res) => res[0])
      .then(({ reservation_id }) =>
        trx("reservations")
          .where({ reservation_id })
          .update({ status: "seated" }, "*")
      )
  );

const finishTable = async (table_id) =>
  await db.transaction(async (trx) => {
    const reservation_id = await trx("tables")
      .first("reservation_id")
      .where({ table_id })
      .then(({ reservation_id }) => reservation_id);

    const finishedTable = await trx("tables")
      .where({ table_id })
      .update({ reservation_id: null }, "*")
      .then((res) => res[0]);

    await trx("reservations")
      .where({ reservation_id })
      .update({ status: "finished" });

    return finishedTable;
  });

module.exports = { list, read, create, seatReservation, finishTable };
