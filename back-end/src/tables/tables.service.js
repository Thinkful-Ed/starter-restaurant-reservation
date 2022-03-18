const knex = require('../db/connection')

function list() {
    return knex('tables')
        .select('*')
        .orderBy('table_name')
}

function read(table_id) {
    return knex('tables')
        .select('*')
        .where({ table_id }, undefined)
        .first()
}
function create(table) {
    return knex('tables')
        .insert(table, '*')
        .then((res) => res[0])
}

function update(reservation_id, table_id) {
    return knex('reservations')
        .where({ reservation_id })
        .update({ status: 'seated' })
        .then(() => {
            return knex('tables')
                .where({ table_id })
                .update({ reservation_id })
                .returning('*')
        })
}

function deleteTable(table_id, reservation_id) {
    return knex('reservations')
        .where({ reservation_id })
        .update({ status: 'finished' })
        .returning('*')
        .then(() => {
            return knex('tables')
                .where({ table_id })
                .update({ reservation_id: null })
                .returning('*')
        })
}

module.exports = {
    list,
    read,
    create,
    update,
    deleteTable
}