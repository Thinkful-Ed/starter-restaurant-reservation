const knex = require('../db/connection');

const tableName = 'reservations'

const create = (newReservation) => {
    return knex(tableName)
        .insert(newReservation)
        .returning("*")
        .then(rows => rows[0])
}

module.exports = {
    create
}