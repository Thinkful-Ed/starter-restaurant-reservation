const knex = require('../db/connection');


function listAll() {
  return knex('reservations')
    .select('*')
    .orderBy('reservation_date')
    .orderBy('reservation_time');
}


function list(date) {  
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time", "asc");
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}



module.exports = {
  listAll,
	list,
  create
  
};
