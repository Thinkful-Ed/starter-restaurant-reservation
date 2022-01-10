const knex = require("../db/connection");
const tableName = "reservations";


function create(newReservation){
    return knex(tableName)
        .insert(newReservation,"*")
        .then( (result)=>result[0] );
}

function read(reservation_id){
    return knex(tableName)
        .select()
        .where({reservation_id : Number(reservation_id)})
        .first();
}

function list(date){
    if ( date ){
        return knex(tableName)
            .select()
            .where({ reservation_date: date })
            .orderBy("reservation_time");
    }
    else{
        return knex(tableName).select().orderBy("reservation_date","reservation_time");
    }
}


module.exports = {
    create,
    read,
    list,
}