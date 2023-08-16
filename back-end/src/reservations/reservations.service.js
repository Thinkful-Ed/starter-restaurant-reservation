const knex = require('../db/connection');

function list() {
  
  return knex("reservations")
    .select("*")
    .orderBy("reservation_time");
}



module.exports = {
	list,
  
};
