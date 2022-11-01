const knex = require("../db/connection");

async function update(table_id, reservation_id){
    return knex.transaction(async function(trx) {
        await trx("tables")
            .select("*")
            .where({ table_id })
            .update({ reservation_id })
            .returning("*")
        return await trx("reservations")
            .select("*")
            .where({ reservation_id })
            .update({ status: "seated" })
            .returning("*")
            .then(result => result[0]);
    })
}

function finishedRes(table_id, reservation_id) {
    return knex.transaction(async function(trx) {
      await trx("tables")
        .where({ table_id: table_id })
        .update({ reservation_id: null })
      return await trx("reservations")
        .where({ reservation_id })
        .update({ status: "finished" })
    })
}


module.exports = {
    update,
    finishedRes,
}