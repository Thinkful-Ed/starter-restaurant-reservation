const knex = require("../db/connection");

function list(){
    return knex("tables")
        .select("*")
        .orderBy("table_name");
};

function create(newTable){
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then(result => result[0]);
};

function read(table_id){
    return knex("tables")
        .select("*")
        .where({ table_id })
        .returning("*")
        .then(result => result[0]);
}

function readReservation(reservation_id) {
    return knex("reservations")
      .select("*")
      .where({ reservation_id })
      .returning("*")
      .then(result => result[0]);
  }

function update(table_id, reservation_id){
    return knex("tables")
        .where({ table_id })
        .update({ reservation_id })
        .returning("*")
        .then(result => result[0]);
}

function finish(table_id){
    return knex("tables")
        .where({ table_id })
        .update("reservation_id", null);
}

module.exports = {
    list,
    create,
    read,
    readReservation,
    update,
    finish,
}