const knex = require("../db/connection");

const getAllReservations = async (date) => {
    return await knex("reservations")
        .select("*")
        .whereNot('status', 'finished')
        .where({'reservation_date': date})
        .orderBy('reservation_time')
        .returning('*')
};



module.exports = {
    getAllReservations
}