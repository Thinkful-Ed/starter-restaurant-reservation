const knex = require('../db/connection');  // Knex instance for database connection

// Create a new reservation in the database
function create(reservation) {
  return knex('reservations')
    .insert(reservation)
    .returning('*')  // Returns all columns of the newly inserted row
    .then((rows) => rows[0]);  // Retrieves the first row (the inserted reservation)
}

// List all reservations for a specific date
function list() {
  return knex("reservations")
    .select("*")
    .orderBy("reservation_time");
};

function listDate(reservation_date) {
  return knex('reservations')
      .select('*')
      .where({ reservation_date })
      .whereNot({ status: 'finished' })
      .orderBy('reservation_time')
}



function read(reservation_id) {
  return knex('reservations').select('*').where({ reservation_id }).first();
}


function updateStatus(reservation_id, status) {
  return knex('reservations')
    .where({ reservation_id })
    .update({ status })
    .returning('*')  // Return all columns of the updated reservation
    .then(rows => rows[0]);  // Return the updated reservation
}


function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}


function update(reservation_id, updatedReservationData) {
  return knex('reservations')
    .where({ reservation_id })
    .update(updatedReservationData, '*')
    .then(rows => rows[0]);  // Return the updated reservation
}



module.exports = {
  create,
  list,
  read,
  updateStatus,
  search,
  listDate, 
  update,
};
