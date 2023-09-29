const knex = require("../db/connection")

function create(newTable) {
    return knex("tables")
      .insert(newTable)
      .then(tables => tables[0])
}

function list() {
    return knex("tables")
      .select("*")
      .then(table=> table[0])
}

module.exports = {
    list,
    create
}