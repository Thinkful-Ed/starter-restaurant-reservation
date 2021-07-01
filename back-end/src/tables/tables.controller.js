const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");



async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation
    return next();
  }
  next({ status: 404, message: `Reservation cannot be found.` });
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await tablesService.read(parseInt(table_id));
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `Table cannot be found.` });
}

function isNotOccupied(req, res, next) {
  if (res.locals.table.status !== "Free") {
    return next({
      status: 400,
      message: "Table is occupied."
    })
  }
  next();
}

async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  if (res.locals.reservation.people <= res.locals.table.capacity) {
  const updatedTable = {
    ...res.locals.table, reservation_id: reservation_id, status: "Occupied"
  };
  const data = await tablesService.update(updatedTable);
  res.status(200).json({ data });
}
}


async function create(req, res) {
  res.status(201).json({
    data: await tablesService.create(req.body.data)
  })
}

async function list(req, res) {
  const tables = await tablesService.list();
  res.json({
    data: tables,
  });
}

module.exports = { 
  update: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(tableExists), isNotOccupied, asyncErrorBoundary(update)],
  create: asyncErrorBoundary(create),
  list: asyncErrorBoundary(list) };
