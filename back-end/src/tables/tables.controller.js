const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../utils/hasProperties");

const REQUIRED_PROPERTIES = ["table_name", "capacity"];

async function list(req, res) {
  const tables = await service.list();
  res.json({
    data: [...tables],
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function validateProperties(req, res, next) {
  const {
    data: { table_name, capacity },
  } = res.locals;
  try {
    if (table_name.length < 2) {
      const error = new Error(`'table_name must be at least 2 characters`);
      error.status = 400;
      throw error;
    }
    if (typeof capacity !== "number") {
      const error = new Error(`'capacity must be a number`);
      error.status = 400;
      throw error;
    }
    if (capacity < 1) {
      const error = new Error(`'Capacity must be at least 1`);
      error.status = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function tableExists(req, res, next) {
  const data = await service.read(req.params.table_id);
  if (data) {
    res.locals.table = data;
    return next();
  }
  return next({ status: 404, message: `${req.params.table_id} not found` });
}

async function reservationExists(req, res, next) {
  const data = await reservationService.read(res.locals.data.reservation_id);
  if (data) {
    res.locals.reservation = data;
    return next();
  }
  return next({
    status: 404,
    message: `${req.body.data.reservation_id} not found`,
  });
}

async function notSeated(req, res, next) {
  if (res.locals.reservation.status === "seated") {
    return next({
      status: 400,
      message: `${req.body.data.reservation_id} already seated`,
    });
  }
  next();
}

function capacity(req, res, next) {
  const { people } = res.locals.reservation;
  const { capacity } = res.locals.table;
  if (people > capacity) {
    return next({
      status: 400,
      message: `table does not have sufficient capacity`,
    });
  }
  return next();
}

function occupied(req, res, next) {
  const occupied = res.locals.table.reservation_id;
  if (occupied) {
    return next({ status: 400, message: `table is occupied` });
  }
  return next();
}

function notOccupied(req, res, next) {
  const occupied = res.locals.table.reservation_id;
  if (!occupied) {
    return next({ status: 400, message: `table is not occupied` });
  }
  return next();
}

async function seat(req, res) {
  const { reservation_id } = req.body.data;
  const { table_id } = req.params;
  const data = await service.seat(table_id, reservation_id);
  console.log(data);
  res.json({
    data,
  });
}

async function unseat(req, res) {
  const { table_id } = req.params;
  const { table } = res.locals;
  const data = await service.unseat(table);
  res.json({
    data,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  seat: [
    hasProperties("reservation_id"),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(notSeated),
    asyncErrorBoundary(capacity),
    asyncErrorBoundary(occupied),
    asyncErrorBoundary(seat),
  ],
  unseat: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(notOccupied),
    asyncErrorBoundary(unseat),
  ],
  create: [
    hasProperties(...REQUIRED_PROPERTIES),
    asyncErrorBoundary(validateProperties),
    // validateReservationDate,
    // validateReservationTime,
    asyncErrorBoundary(create),
  ],
  // read: asyncErrorBoundary(read),
};
