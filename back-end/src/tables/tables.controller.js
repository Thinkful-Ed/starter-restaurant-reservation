const tablesService = require("./tables.service");
const reservationsService =require("../reservations/reservations.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const knex = require("../db/connection");

function hasValidFields(req, res, next) {
    const { data: { table_name, capacity } = {} } = req.body;

    if (!table_name || table_name.length < 2 ) {
      return next({ status: 400, message: "table_name must be at least 2 characters long" });
    }

    if (!capacity || !Number.isInteger(capacity) ||  capacity < 1) {
      return next({ status: 400, message: "capacity must be at least 1 person" });
    }

    next();
}

async function create(req, res, next) {
  const newTable = req.body.data;
  const data = await tablesService.create(newTable);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function update(req, res, next) {

  const { table_id } = req.params;
  const { reservation_id } = req.body.data;
  const table = await tablesService.read(table_id);
  const reservation = await reservationsService.read(reservation_id);

  if (!table) {
    return next({ status: 404, message: `Table ${table_id} not found` });
  }

  if(!reservation_id) {
    return next({ status: 400, message: "reservation_id is missing. and data is missing"})
  }

  if (table.reservation_id) {
    return next({ status: 400, message: "Table is already occupied" });
  }

  // const reservation = await knex("reservations").select("*").where({ reservation_id }).first();

  if (!reservation) {
    return next({ status: 404, message: `Reservation ${reservation_id} not found` });
  }

  if (reservation.people > table.capacity) {
    return next({ status: 400, message: "Table capacity is less than the number of people in the reservation" });
  }

  const data = await tablesService.update(table_id, reservation_id);
  res.status(200).json({ data });
}

function hasReservationId(req,res,next) {
  console.log("tables.controller - req.body: ",req.body);
  const reservation_id =  req.body?.data?.reservation_id;
  if(reservation_id){
    res.locals.reservation_id = reservation_id
    next()

  }else{
    next({
      status: 400,
      message: `reservation_id not found: ${ req.body.data.reservation_id}`,
    });

}
}





module.exports = {
  create: [hasValidFields, asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
  update: [hasReservationId,asyncErrorBoundary(update)],
};
