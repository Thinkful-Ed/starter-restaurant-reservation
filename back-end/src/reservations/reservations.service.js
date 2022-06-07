const knex = require("../db/connection");

function list() {
    return knex("reservations").select("*").orderBy("reservation_time");
}

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .then(rows => rows[0]);
}

function readByDate(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .andWhere('status', '!=', 'finished')
        // .andWhere('status', '!=', 'cancelled')
        .orderBy("reservation_time");
}

function readByMobileNumber(mobile_number) {
    console.log("res service readmobnum: ", mobile_number);

    return knex("reservations")
        .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            `%${mobile_number.replace(/\D/g, "")}%`
        )
        .orderBy("reservation_date");
}
// function readByMobileNumber(mobile_number){
//     console.log("res service readmobnum: number", mobile_number);
//     return knex("reservations")
//     .select("*")
//     .where(knex.raw(`mobile_number ILIKE '%${mobile_number}%'`))
//     .orderBy("reservation_time");
// }

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then(rows => rows[0]);
}

function update(updatedRes) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedRes.reservation_id })
        .update(updatedRes, "*")
        .then(records => records[0]);
}

function destroy(reservation_id) {
    return knex("reservations")
        .where({ reservation_id })
        .del();
}

module.exports = {
    list,
    read,
    readByDate,
    readByMobileNumber,
    create,
    update,
    destroy
}