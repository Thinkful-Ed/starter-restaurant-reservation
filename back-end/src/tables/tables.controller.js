const tablesService = require('./tables.service.js');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const reservationsController = require('../reservations/reservations.controller');

function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A ${property} property is required.`);
          error['status'] = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties('table_name', 'capacity');
const hasReservationId = hasProperties('reservation_id');

async function tableExists(req, res, next) {
  const table_id = req.params.table_id;
  const table = await tablesService.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `Table ${table_id} cannot be found.` });
}

function hasValidName(req, res, next) {
  const table_name = req.body.data.table_name;

  if (table_name.length < 2) {
    return next({
      status: 400,
      message: `Invalid table_name`,
    });
  }
  next();
}

function hasValidCapacity(req, res, next) {
  const capacity = req.body.data.capacity;

  if (capacity < 1 || isNaN(capacity)) {
    return next({
      status: 400,
      message: `Invalid capacity`,
    });
  }
  next();
}

function hasSufficientCapacity(req, res, next) {
  const capacity = res.locals.table.capacity;
  const people = res.locals.reservation.people;

  if (capacity < people) {
    return next({
      status: 400,
      message: `Table does not have sufficient capacity`,
    });
  }
  next();
}

function tableIsFree(req, res, next) {
  if (res.locals.table.occupied) {
    return next({
      status: 400,
      message: `Table is occupied`,
    });
  }
  next();
}

function tableIsNotSeated(req, res, next) {
  if (res.locals.reservation.status === 'seated') {
    return next({
      status: 400,
      message: `Table is already seated`,
    });
  }
  next();
}

function tableIsOccupied(req, res, next) {
  if (!res.locals.table.occupied) {
    return next({
      status: 400,
      message: `Table is not occupied`,
    });
  }
  next();
}

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const { reservation_id } = req.body.data;
  const data = await tablesService.update(
    reservation_id,
    res.locals.table.table_id
  );
  res.status(200).json({ data });
}

async function finish(req, res) {
  const data = await tablesService.finish(
    res.locals.table.reservation_id,
    res.locals.table.table_id
  );
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    hasValidName,
    hasValidCapacity,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(tableExists),
    hasReservationId,
    reservationsController.reservationExists,
    hasSufficientCapacity,
    tableIsNotSeated,
    tableIsFree,
    asyncErrorBoundary(update),
  ],
  finish: [
    asyncErrorBoundary(tableExists),
    tableIsOccupied,
    asyncErrorBoundary(finish),
  ],
};
