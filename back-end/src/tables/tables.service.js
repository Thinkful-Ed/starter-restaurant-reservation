const knex = require("../db/connection");

async function create(newTable) {
  return knex("tables").insert(newTable).returning("*");
}

async function list() {
  return knex("tables").select("*").orderBy("table_name");
}

async function read(table_id) {
  return knex("tables").select("*").where("table_id", table_id);
}

async function update(table) {
  return knex("tables").where("table_id", table.table_id).update(table).returning("*");
}

async function destroy(table_id, reservation_id) {
  return knex("tables").where("table_id", table_id).update({status: "Free", reservation_id: null}).returning("*")
    .then(()=>{
      return knex("reservations").where("reservation_id", reservation_id).update({status: "finished"})
    })
}

module.exports = {
  create,
  list,
  update,
  read,
  destroy,
};