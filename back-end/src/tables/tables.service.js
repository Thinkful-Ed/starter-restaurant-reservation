const knex = require("../db/connection")


function list(){
    return knex('tables')
             .select("*")
             .orderBy('table_name','asc')
}

function read(id){
    return knex('tables')
             .where({table_id:id})
             .first()

}

function create(data){
  return knex('tables')
           .insert(data);
}

function update(data){
    return knex("tables")
            .where({table_id:data.table_id})
            .update(data)
            .then(()=>{
                return knex("tables").where({table_id:data.table_id}).first()
            })
}
function readReservation(id){
    return knex('reservations')
            .select("*")
            .where({reservation_id:id})
            .first();
}

function destroy(id){
    return knex("tables")
             .where({table_id:id})
             .update({
                reservation_id:null
             })
}


module.exports = {
    list,
    read,
    create,
    update,
    readReservation,
    destroy,
}