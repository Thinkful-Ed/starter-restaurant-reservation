const knex = require("../db/connection");

// Function to retrieve a list of tables
function list() {
    return knex("tables").select("*").orderBy("table_name");
}

// Function to create a new table
function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((createdTables) => createdTables[0]);
}

// Function to update a table's reservation status
function update(tableId, reservation_id = null) {
    return knex("tables")
        .select("*")
        .where({ table_id: tableId })
        .update({ reservation_id: reservation_id ? reservation_id : null });
}

// Function to retrieve details of a specific table
function getTable(tableId) {
    return knex("tables").select("*").where({ table_id: tableId }).first();
}

// Function to retrieve details of a specific reservation
function getReservation(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .first();
}

// Function to change the status of a reservation
function changeStatus(reservation_id, newStatus) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .update({ status: newStatus });
}

module.exports = {
    list,
    create,
    update,
    getTable,
    getReservation,
    changeStatus,
};