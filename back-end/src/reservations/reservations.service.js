const knex = require("../db/connection")

function list(date){
    return knex('reservations')
             .select("*")
             .where({reservation_date:date})
             .orderBy('reservation_time', 'asc')
}

function read(id){
  return knex('reservations')
            .select("*")
            .where({reservation_id:id})
            .first()
}

module.exports = {
    list,
    read,
}