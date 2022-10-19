const knex = require("../db/connection")

function list(){
    return knex("reservations")

}