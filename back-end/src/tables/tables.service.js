const knex = require("../db/connection");

//display all tables with given date
function list(date) {
    return knex("tables").select().orderBy("table_name");
  }
  
//query table with given ID
  function read(table_id) {
    return knex("tables").select().where({ table_id }).first();
  }
  
//query to create new table
  function create(newTable) {
    return knex("tables")
      .insert(newTable)
      .returning("*")
      .then((tableData) => tableData[0]);
  }
  
//query to seat table
  function seat(table_id, reservation_id) {
    return knex.transaction(function (trx) {
      return trx("tables")
        .where({ table_id })
        .update({ reservation_id })
        .returning("*")
        .then(() => {
          return trx("reservations")
            .where({ reservation_id })
            .update({ status: "seated" })
            .returning("*")
            .then((updatedRes) => updatedRes[0]);
        });
    });
  }
 
//query to unseat table
  function unseat({ table_id, reservation_id }) {
    return knex.transaction(function (trx) {
      return trx("tables")
        .where({ table_id })
        .update({ reservation_id: null })
        .returning("*")
        .then(() => {
          return trx("reservations")
            .where({ reservation_id })
            .update({ status: `finished` })
            .returning("*")
            .then((tableData) => tableData[0]);
        });
    });
  }

module.exports = {
    list,
    create,
    read,
    seat,
    unseat,
};