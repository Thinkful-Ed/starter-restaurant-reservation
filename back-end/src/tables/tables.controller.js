const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

const hasRequiredProperties = hasProperties("table_name", "capacity");

const VALID_PROPERTIES = ["table_name", "capacity"];

function hasData(req, res, next) {
  const data = req.body.data;
  if (!data) {
    return next({
      status: 400,
      message: `Request body must have data.`,
    });
  }
  next();
}

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function isValidNumber(req, res, next) {
  const { data: { capacity } = {} } = req.body;
  if (Number.isInteger(capacity)) {
    next()
  } else {
    return next({
      status: 400,
      message: `Invalid field: capacity. Must be a valid number greater than or equal to 1.`,
    });
  }
}

function validTableName(req, res, next) {
  const { table_name } = req.body.data;
  const table = String(table_name);
  if (table.length < 2) {
    return next({
      status: 400,
      message: `table_name must be longer than one character.`,
    });
  }
  return next();
}

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table ${req.params.table_id} cannot be found.`,
  });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    next({
      status: 400,
      message: `reservation_id is missing.`
    });
  }
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ID ${reservation_id} cannot be found.`
  });
}

function validTableCapacity(req, res, next) {
  const capacity = res.locals.table.capacity;
  if (capacity < res.locals.reservation.people) {
    next({
      status: 400,
      message: `Table does not have sufficient capacity.`
    })
  }
  next();
}

function validTableAvailability(req, res, next) {
  const reservation = res.locals.table.reservation_id;
  if (reservation !== null) {
    next({
      status: 400,
      message: `Table ${res.locals.table.table_id} is occupied.`
    })
  }
  next();
}

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function read(req, res) {
  const { table: data } = res.locals;
  res.json({ data });
}

async function update(req, res) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };

  const updatedReservation = {
    ...res.locals.reservation,
    reservation_id: res.locals.reservation.reservation_id,
  }
  await reservationsService.update(updatedReservation);
  const data = await tablesService.update(updatedTable);
  res.json({ data })
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    isValidNumber,
    hasRequiredProperties,
    hasOnlyValidProperties,
    validTableName,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  update: [
    hasData,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    validTableName,
    validTableCapacity,
    validTableAvailability,
    asyncErrorBoundary(update),
  ]
};
