const knex = require("../db/connection");

function update(table_id, reservation_id) {
  return knex("tables")
    .select("*")
    .where({ table_id: table_id })
    .update({ reservation_id })
    .then((updated) => updated[0]);
}

module.exports = { update };
