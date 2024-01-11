const knex = require('../db/connection');

function list(){
    return knex('tables')
    .select('*')
    .orderBy('table_name')
}

function create(table){
    return knex('tables')
    .insert(table)
    .returning('*')
    .then(result => result[0])
}

function read(table_id){
    return knex('tables')
    .select('*')
    .where({ table_id })
    .then(result => result[0])
}

function readReservation(reservation_id){
    return knex('reservations')
    .select('*')
    .where({ reservation_id })
    .then(result => result[0])
}

function update(updatedSeat){
    return knex('tables')
    .select('*')
    .where({ table_id: updatedSeat.table_id })
    .update(updatedSeat, '*')
    .then(updatedRecords => updatedRecords[0])
}

function updatedReservationStatus(updatedReservation){
    return knex('reservations')
    .select('*')
    .where({ reservation_id: updatedReservation.reservation_id })
    .update({ status: updatedReservation.status })
    .then(result => result[0])
}

function clearTable(table_id){
    return knex('tables')
    .select('*')
    .where({ table_id })
    .update({ "reservation_id": null })
}

function destroy(table_id){
    return knex('tables')
    .where({ table_id })
    .del()
}

module.exports = {
    list,
    create,
    update,
    updatedReservationStatus,
    read,
    readReservation,
    clearTable,
    delete: destroy,
}