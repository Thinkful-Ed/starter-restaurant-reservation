const knex = require("../db/connection")

function list(){
    return knex("tables").select("*")
}

module.exports = {
    list
}