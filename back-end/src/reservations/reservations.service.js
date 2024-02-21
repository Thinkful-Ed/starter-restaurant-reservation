const knex = require('../db/connection');  // Knex instance for database connection

// Create a new reservation in the database
function create(reservation) {
  return knex('reservations')
    .insert(reservation)
    .returning('*')  // Returns all columns of the newly inserted row
    .then((rows) => rows[0]);  // Retrieves the first row (the inserted reservation)
}

// List all reservations for a specific date
function list(reservation_date) {
  return knex('reservations')
    .select('*')  // Selects all columns
    .where({ reservation_date })  // Filters by the provided date
    .orderBy('reservation_time');  // Orders by reservation time
}


function read(reservation_id) {
  return knex('reservations').select('*').where({ reservation_id }).first();
}

module.exports = {
  create,
  list,
  read,
};
