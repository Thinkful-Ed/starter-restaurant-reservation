const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function reservationIdExists(req, res, next) {
  if (!(req.body.data) || !(req.body.data.reservation_id)) {
    return next({
      status: 400,
      message: "reservation_id must exist."
    })
  }
  next();
}
async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `Reservation ${reservation_id} cannot be found.` });
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await tablesService.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `Table ${table_id} cannot be found.` });
}

function tableHasReservation(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (!reservation_id) {
    return next({
      status: 400,
      message: `table is not occupied`,
    });
  }
  next();
}

function isNotOccupied(req, res, next) {
  if (res.locals.table.status !== "Free") {
    return next({
      status: 400,
      message: "Table is occupied.",
    });
  }
  next();
}

function hasSufficientCapacity(req, res, next) {
  if (res.locals.reservation.people > res.locals.table.capacity) {
    return next({
      status: 400,
      message: "Party must not be larger than capacity.",
    });
  }
  next();
}

function isValidTable(req, res, next) {

  const requiredFields = [
    "table_name",
    "capacity"
  ]
  if (!req.body.data) {
     return next({
      status: 400,
      message: `Can not submit empty form.`,
    });
  }
  for (const field of requiredFields) {
    if (!req.body.data[field]) {
       return next({
        status: 400,
        message: `Order must include a ${field}`,
      });
    }
  }

  if (req.body.data.table_name.length <= 1) {
    return next({
      status: 400,
      message: `table_name must be longer than 1 character.`,
    });
  }
  next();
}

function reservationIsNotSeated(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "seated") {
  return next({
    status: 400,
    message: "Reservation is already seated."
  })
}
next();
}



async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  const updatedTable = {
    ...res.locals.table,
    reservation_id: reservation_id,
    status: "occupied",
  };
  const data = await tablesService.update(updatedTable, reservation_id);
  res.status(200).json({ data });
}


async function destroy(req, res) {
  const { table_id } = req.params;
  const { reservation_id } = res.locals.table;
  res.json({ data: await tablesService.destroy(table_id, reservation_id)})
}

async function create(req, res) {
  res.status(201).json({
    data: await tablesService.create(req.body.data),
  });
}

async function list(req, res) {
  const tables = await tablesService.list();
  res.json({
    data: tables,
  });
}

module.exports = {
  update: [
    reservationIdExists,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    isNotOccupied,
    hasSufficientCapacity,
    reservationIsNotSeated,
    asyncErrorBoundary(update),
  ],
  create: [isValidTable, asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
  delete: [asyncErrorBoundary(tableExists), tableHasReservation, asyncErrorBoundary(destroy)]
};
