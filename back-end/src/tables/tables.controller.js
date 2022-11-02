const { __knex__ } = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

const REQUIRED_PROPERTIES = ["table_name", "capacity"];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidStatuses = Object.keys(data).filter(
    (field) => !REQUIRED_PROPERTIES.includes(field)
  );

  if (invalidStatuses.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidStatuses.join(", ")}`,
    });
  }
  next();
}

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

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

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

// ------------------ SEAT VALIDATION ------------------

function hasReservationId(req, res, next) {
  const table = req.body.data;
  //if there is no data body
  if (!table) {
    return next({ status: 400, message: "Must have data property" });
  }
  //if there is no reservation_id in req body
  if (!table.reservation_id) {
    return next({ status: 400, message: "Must have reservation_id" });
  }
  next();
}

async function reservation_idExists(req, res, next) {
  //destructure reservation_id
  const { reservation_id } = req.body.data;
  //reservation is promise from read function in /reservations/reservations.service
  const reservation = await reservationsService.read(reservation_id);
  //if cannot read,
  if (!reservation) {
    //return 404+msg
    return next({ status: 404, message: `${reservation_id} does not exist` });
  }
  //put reservation in res.locals to use later
  res.locals.reservation = reservation;
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
  next();
}

async function list(req, res, next) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  console.log(req.body);
  console.log(data);
  res.status(201).json({ data: data });
}

async function update(req, res, next) {
  const tableId = req.params.table_id;
  const updatedRes = {
    ...req.body.data,
    table_id: tableId,
  };
  tablesService
    .update(updatedRes, tableId)
    .then((data) => res.status(200).json({ data }))
    .catch(next);
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
    hasReservationId,
    asyncErrorBoundary(reservation_idExists),
    asyncErrorBoundary(hasCapacityAndAvailable),
    asyncErrorBoundary(update),
  ],
};
