const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("../reservations/reservations.service");

function bodyHasData(req, _res, next) {
  const { data } = req.body;
  if (!data) {
    next({
      status: 400,
      message: "body",
    });
  }
  next();
}

function hasCapacity(req, _res, next) {
  const { capacity } = req.body.data;
  if (!capacity) {
    next({ status: 400, message: "capacity" });
  } else {
    next();
  }
}

function isValidCapacity(req, _res, next) {
  const { capacity } = req.body.data;
  if (capacity === 0 || !Number.isInteger(capacity)) {
    next({ status: 400, message: "capacity" });
  }
  next();
}

function bodyHasReservationId(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    return next({
      status: 400,
      message: "reservation_id",
    });
  }
  res.locals.reservation_id = reservation_id;
  next();
}

function isValidName(req, _res, next) {
  const { table_name } = req.body.data;
  if (!table_name || !table_name.length || table_name.length === 1) {
    return next({ status: 400, message: "table_name" });
  }
  next();
}



async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(Number(table_id));
  if (table) {
    res.locals.table = table;
    next();
  } else {
    next({
      status: 404,
      message: table_id,
    });
  }
}


function isTableLargeEnough(_req, res, next) {
  const { capacity } = res.locals.table;
  const { people } = res.locals.reservation;
  if (capacity >= people) return next();
  next({
    status: 400,
    message: "capacity",
  });
}

// verifying that table is NOT occupied
function isAvailable(_req, res, next) {
  // not occupied
  if (!res.locals.table.reservation_id) return next();
  // occupied
  next({
    status: 400,
    message: `occupied`,
  });
}

// verifying that table is occupied
function isOccupied(_req, res, next) {
  // occupied
  if (res.locals.table.reservation_id) return next();
  // not occupied
  next({
    status: 400,
    message: `not occupied`,
  });
}

async function reservationIdExists(_req, res, next) {
  const reservation = await reservationsService.read(res.locals.reservation_id);
  if (!reservation) {
    return next({ status: 404, message: `${res.locals.reservation_id}` });
  } else {
    res.locals.reservation = reservation;
  next();
  }
}


function isReservationSeated(req, res, next) {
  // reservation already seated
  if (res.locals.reservation.status === "seated")
    return next({
      status: 400,
      message: "reservation is already seated",
    });
  // reservation not seated
  next();
}

async function create(req, res, _next) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function list(_req, res, _next) {
  res.json({ data: await service.list() });
}

async function seat(_req, res, _next) {
  const data = await service.seat(
    res.locals.table.table_id,
    res.locals.reservation_id
  );
  res.json({ data });
}

async function finish(_req, res, _next) {
  const data = await service.finish(res.locals.table);
  res.json({ data });
}

module.exports = {
  create: [
    bodyHasData,
    hasCapacity,
    isValidName,
    isValidCapacity,
    asyncErrorBoundary(create),
  ],
  seat: [
    bodyHasData,
    bodyHasReservationId,
    asyncErrorBoundary(reservationIdExists),
    isReservationSeated,
    asyncErrorBoundary(tableExists),
    isTableLargeEnough,
    isAvailable,
    asyncErrorBoundary(seat),
  ],
  finish: [
    asyncErrorBoundary(tableExists),
    isOccupied,
    asyncErrorBoundary(finish),
  ],
  list: asyncErrorBoundary(list),
};