const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const hasData = require("../validation/hasData");
const hasFieldsSeat = require("../validation/hasFields")(["reservation_id"]);
const hasFieldsCreate = require("../validation/hasFields")([
  "table_name",
  "capacity",
]);

//Validation middleware
const reservationExists = async (req, res, next) => {
  const reservation = await reservationsService.read(
    req.body.data.reservation_id
  );
  if (reservation) res.locals.reservation = reservation;

  return !reservation
    ? next({
        status: 404,
        message: `Reservation with reservation_id ${req.body.data.reservation_id} does not exist.`,
      })
    : next();
};

const tableExists = async (req, res, next) => {
  const table = await service.read(req.params.tableId);
  if (table) res.locals.table = table;

  return !table
    ? next({
        status: 404,
        message: `Table with table_id ${req.params.tableId} could not be found.`,
      })
    : next();
};

const validateTableNameLength = async (req, res, next) => {
  return req.body.data.table_name?.length <= 1
    ? next({
        status: 400,
        message: "table_name must be a string with at least two characters.",
      })
    : next();
};

const tableIsNotSeated = async (req, res, next) => {
  return res.locals.table.reservation_id !== null
    ? next({
        status: 400,
        message: `Table with table_id ${req.params.tableId} is currently occupied.`,
      })
    : next();
};

const tableIsSeated = async (req, res, next) => {
  return res.locals.table.reservation_id !== null
    ? next()
    : next({
        status: 400,
        message: `Table with table_id ${req.params.tableId} is currently not occupied.`,
      });
};

const tableHasCapacity = async (req, res, next) => {
  const table = res.locals.table;
  const reservation = res.locals.reservation;

  return table.capacity < reservation.people
    ? next({
        status: 400,
        message: `Cannot seat a party of ${reservation.people} at a table with a capacity of ${table.capacity}.`,
      })
    : next();
};

const reservationIsNotSeated = async (req, res, next) => {
  const reservation = res.locals.reservation;

  return reservation.status === "seated"
    ? next({
        status: 400,
        message: `Reservation with reservation_id ${reservation.reservation_id} is already seated.`,
      })
    : next();
};

//Main route handlers
const list = async (req, res) => res.json({ data: await service.list() });

const create = async (req, res) =>
  res.status(201).json({ data: await service.create(req.body.data) });

const seatReservation = async (req, res, next) =>
  res.json({
    data: await service.seatReservation(
      Number(req.params.tableId),
      Number(req.body.data.reservation_id)
    ),
  });

const finishTable = async (req, res, next) =>
  res.json({
    data: await service.finishTable(Number(req.params.tableId)),
  });

module.exports = {
  list,
  create: [hasData, hasFieldsCreate, validateTableNameLength, create],
  seatReservation: [
    hasData,
    hasFieldsSeat,
    reservationExists,
    tableExists,
    reservationIsNotSeated,
    tableIsNotSeated,
    tableHasCapacity,
    seatReservation,
  ],
  finishTable: [tableExists, tableIsSeated, finishTable],
};
