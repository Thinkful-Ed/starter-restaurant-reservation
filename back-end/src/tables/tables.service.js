const knex = require("../db/connection")

function create(newTable) {
    return knex("tables")
      .insert(newTable)
      .then(tables => tables[0])
}

function list() {
    return knex("tables")
      .select("*")
}

function read(tableId) {
  return knex("tables")
    .select("*")
    .where({
      "table_id": tableId
    })
    .then(table => table[0])
}

function update(newTable) {
  return knex("tables")
    .select("*")
    .where({
      "table_id": newTable.table_id
    })
    .update(newTable, "*")
}

function reservation(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({
      "reservation_id": reservation_id
    })
    .then(reservation => reservation[0])
}

function destroy(table) {
  return knex("tables")
    .where({
      "table_id": table.table_id
    })
    .update({
      "reservation_id": 0,
      "status": "Free"
    })
}

module.exports = {
    list,
    create,
    read,
    update,
    destroy,
    reservation
}