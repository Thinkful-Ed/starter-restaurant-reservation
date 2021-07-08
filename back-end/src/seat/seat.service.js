const knex = require("../db/connection");

function list(reservation_id){
    if (reservation_id){
        return knex("tables as t")
            .leftJoin("reservations as r", "t.reservation_id", "t.reservation_id")
            .select("t.*", "r.people")
            .where({reservation_id : Number(reservation_id)})
    }
}