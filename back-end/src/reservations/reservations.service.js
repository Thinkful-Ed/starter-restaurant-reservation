const knex = require("../db/connection");
const tableName = "reservations";


function create(newReservation){
    return knex(tableName)
        .insert(newReservation,"*")
        .then( (result)=>result[0] );
}

function list(date){
    return knex(tableName)
        .select()
        .where({ reservation_date: date })
        .orderBy("reservation_time");
}


module.exports = {
    create,
    list,
}