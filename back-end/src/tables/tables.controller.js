const { __knex__ } = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

function hasProperties(properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const REQUIRED_PROPERTIES = ["table_name", "capacity"];
const REQUIRED_PARAMETERS = ["reservation_id"];

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);
const hasRequiredUpdateProperties = hasProperties(REQUIRED_PARAMETERS);

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidStatuses = Object.keys(data).filter(
    (field) => ![...REQUIRED_PROPERTIES, "reservation_id"].includes(field)
  );

  if (invalidStatuses.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidStatuses.join(", ")}`,
    });
  }
  next();
}

function hasValidValues(req, res, next) {
  const { table_name, capacity } = req.body.data;

  if (capacity <= 0) {
    return next({
      status: 400,
      message: "table capacity must be greater than 1",
    });
  }
  if (table_name.length === 1) {
    return next({
      status: 400,
      message: "table_name must be greater than 1 character",
    });
  }
  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: "capacity value must be a number",
    });
  }

  next();
}

async function reservation_idExists(req, res, next) {
  //destructure reservation_id
  const { reservation_id } = req.body.data;
  //reservation is promise from read function in /reservations/reservations.service
  if (!reservation_id) {
    return next({
      status: 404,
      message: `reservation_id is ${reservation_id}`,
    });
  }

  const reservation = await reservationsService.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `${req.body.data.reservation_id} not found`,
  });
}

async function isAlreadySeated(req, res, next) {
  const reservation = res.locals.reservation;
  if (reservation.status === "seated") {
    return next({ status: 400, message: `reservation is already seated` });
  }
  next();
}

async function hasCapacityAndAvailable(req, res, next) {
  const { table_id } = req.params;
  //selectedTable returns the object with table_id's info
  const selectedTable = await tablesService.read(table_id);
  //reservation_idExists already assigned await reservationsService.read(reservation_id) to res.locals.reservation so we do not need to write that again
  const reservation = res.locals.reservation;

  //if there are more people than the table can seat,
  if (reservation.people > selectedTable.capacity) {
    //return 400 + msg
    return next({
      status: 400,
      message: `table capacity not sufficient for ${reservation.people} people`,
    });
  }

  if (selectedTable.reservation_id) {
    return next({
      status: 400,
      message: `table is occupied`,
    });
  }
  res.locals.tables = selectedTable;
  next();
}

async function tableIdExists(req, res, next) {
  const tables = await tablesService.read(req.params.table_id);

  if (tables) {
    res.locals.tables = tables;
    return next();
  }
  return next({ status: 404, message: `${req.params.table_id} not found` });
}

function validateTableIsOccupied(req, res, next) {
  const occupied = res.locals.tables.reservation_id;
  if (!occupied) {
    return next({
      status: 400,
      message: "table is not occupied",
    });
  }
  next();
}

async function list(req, res, next) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data: data });
}

async function update(req, res, next) {
  const { reservation_id } = res.locals.reservation;
  const { table_id } = req.params;
  const data = await tablesService.update(reservation_id, table_id);
  res.status(200).json({ data });
}

async function finish(req, res) {
  const { table_id } = req.params;
  const { reservation_id } = res.locals.tables;
  const data = await tablesService.finished(table_id, reservation_id);
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    asyncErrorBoundary(create),
  ],
  update: [
    hasRequiredUpdateProperties,
    asyncErrorBoundary(reservation_idExists),
    asyncErrorBoundary(tableIdExists),
    isAlreadySeated,
    asyncErrorBoundary(hasCapacityAndAvailable),
    asyncErrorBoundary(update),
  ],
  finish: [
    asyncErrorBoundary(tableIdExists),
    validateTableIsOccupied,
    asyncErrorBoundary(finish),
  ],
};
