

function list() {
    return knex("reservations").select("*");
  }
  
  module.exports={list}