const knex = require("../db/connection");

const getAllReservations = async (date) => {
    return await knex("reservations")
        .select("*")
        .whereNot('status', 'finished')
        .where({'reservation_date': date})
        .orderBy('reservation_time')
        .returning('*')
        .catch(err => console.log(err));
};

const getReservation= async (reservation_id) => {
    return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .first();
}

const timeIsAvailable = async (time, date) => {
    return await knex("reservations")
        .select("*")
        .where({'reservation_date': date})
        .where({'reservation_time': time})
        .whereNot('status', 'finished')
        .returning('*')
};

const updateReservation = async (id, data) => {
    return await knex("reservations")
        .where({'reservation_id': id})
        .update(data)
        .returning('*')
}



module.exports = {
    getAllReservations,
    getReservation,
    timeIsAvailable,
    updateReservation
}