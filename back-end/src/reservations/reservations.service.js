function list(){
    return knex('reservations').select("*")
}

function create(res){
    return knex("reservations")
    .insert(res)
    .returning("*")
    .then((res)=> res[0])
}

module.exports = {
    list,
    create
}