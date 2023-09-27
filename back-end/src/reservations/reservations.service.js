const knex = require("../db/connection")

function list(date){
    return knex('reservations')
             .select("*")
             .where({reservation_date:date})
             .whereNot({status:'finished'})
             .orderBy('reservation_time', 'asc')
}

function read(id){
  return knex('reservations')
            .select("*")
            .where({reservation_id:id})
            .first()
}

function create(data){
    return knex('reservations')
             .insert(data)
}

module.exports = {
    list,
    read,
    create,
}