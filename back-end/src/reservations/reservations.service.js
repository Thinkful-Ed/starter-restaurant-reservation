const knex = require("../db/connection");

const getAllReservations = async (date) => {
    return await knex("reservations")
        .select("*")
        .whereNot('status', 'finished')
        .where({'reservation_date': date})
        .orderBy('reservation_time')
        .returning('*')
};

const timeIsAvailable = async (time, date) => {
    return await knex("reservations")
        .select("*")
        .where({'reservation_date': date})
        .where({'reservation_time': time})
        .whereNot('status', 'finished')
        .returning('*')
};



module.exports = {
    getAllReservations
}