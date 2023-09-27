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

function readMobileNumber(mb){
    return knex('reservations')
            .where("mobile_number","like",`%${mb}%`)
}

module.exports = {
    list,
    read,
    create,
    readMobileNumber,
}