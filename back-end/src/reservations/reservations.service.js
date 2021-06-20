const knex = require("../db/connection")

async function list(date){
    return knex("reservations").whereRaw(`reservation_date='${date}'`).select("*")
}

async function create(reservation){
    return knex("reservations").insert(reservation).returning("*")
}

module.exports = {
    list,
    create
}
