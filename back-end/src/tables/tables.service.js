const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

async function create(table) {
  const createdRecords = await knex("tables").insert(table).returning("*");
  return createdRecords[0];
}

async function update(table_id, reservation_id) {
  return knex.transaction(async (trx) => {
    try {
      // Update the 'tables' table
      const updatedTable = await trx("tables")
        .where({ table_id })
        .update({ reservation_id, occupied: true })
        .returning("*");

      // Update the 'reservations' table
      await trx("reservations")
        .where({ reservation_id })
        .update({ status: "seated" });

      // Commit the transaction
      await trx.commit();

      return updatedTable; // Return the updated table data if needed
    } catch (error) {
      // Rollback the transaction if an error occurs
      await trx.rollback();
      throw error; // Rethrow the error to handle it outside the transaction
    }
  });
}

module.exports = {
  list,
  read,
  create,
  update,
};
