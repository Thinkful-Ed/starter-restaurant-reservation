const knex = require("../db/connection")

function listTables() {
    return knex("tables").select("*").orderBy("table_name")
}

module.exports = {
    listTables
}