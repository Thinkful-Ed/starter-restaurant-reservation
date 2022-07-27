const knex = require("../db/connection")

function list(){
    return knex("tables").select("*").orderBy("table_name")
}

function create(res){
    return knex("tables")
    .insert(res)
    .returning("*")
    .then((res)=> res[0])
}

function read(table_id){
    return knex("tables")
    .select("*")
    .where({ table_id})
    .first()
}

function readReservationId(reservation_id){
    return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .first()
}

function listTablesAndReservationId(){
    return knex("tables as t")
    .join("reservations as r", "r.reservation_id", "t.reservation_id")
    .select("*")
}

function update(table_id, reservation_id){
    return knex("tables")
    .where({ table_id })
    .select("reservation_id",)
    .update({ reservation_id })
    .then(()=> knex("reservations").where({ reservation_id: Number(reservation_id)})
    .update({ status: "seated" })
    )
}

module.exports = {
    list,
    listTablesAndReservationId,
    create,
    read,
    readReservationId,
    update
}