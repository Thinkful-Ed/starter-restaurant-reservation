const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bodyDataHas = require("../validations/bodyDataHas");

async function list(req, res) {
  res.status(200).json({ data: await service.list() });
}

function read(req, res, next) {
  res.status(200).json({ data: res.locals.table });
}

async function create(req, res, next) {
  const newTable = await service.create(res.locals.data);
  res.status(201).json({ data: newTable[0] });
}

async function update(req, res, next) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };
  const savedTable = await service.update(updatedTable);
  res.json({ data: savedTable });
}

async function reservationIdExists(req, res, next){
    const { data: currentReservation } = res.locals;
    const foundReservation = await reservationService.read(currentReservation.reservation_id)
    const table = await service.read(req.params.table_id);

    if (table) {
        res.locals.table = table;
    } else {
        next({
            status: 404,
            message: `Table ID: ${req.params.table_id}, not found.`
        })
    }

    if(foundReservation){
        res.locals.reservation = foundReservation
        return next()
    }
    next({
        status: 404,
        message: `Reservation ID: ${currentReservation.reservation_id} not found.`
    })
}

function isTableFree(req, res, next){
    const currentTable = res.locals.table

    if(currentTable.reservation_id != null){
        return next({
            status: 400,
            message: `This table is occupied, please select another table.`
        })
    }
    next()
}

function tableHasSufficientCapacity(req, res, next){
    const currentTable = res.locals.table
    const { reservation } = res.locals
    if(currentTable.capacity < reservation.people){
        return next({
            status: 400,
            message: `The selected table does not have sufficient capacity for the provided number of people.`
        })
    }
    next()
}

async function isValidTableId(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);

  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `The table ID ${table_id} is not valid.`,
  });
}

function validPropertyValues(req, res, next) {
  const {
    data: { table_name, capacity },
  } = res.locals;

  if (table_name === "") {
    next({
      status: 400,
      message: `The table_name must not be empty.`,
    });
  }

  if (table_name.length == 1) {
    next({
      status: 400,
      message: `The table_name must be more than one character.`,
    });
  }

  if (capacity === 0) {
    next({
      status: 400,
      message: `The capacity must be greater than 0.`,
    });
  }

  if (typeof capacity != "number") {
    next({
      status: 400,
      message: `The capacity must be a number.`,
    });
  }
  next();
}

const VALID_PROPERTIES = ["table_name", "capacity"];

function hasValidProperties(req, res, next) {
  const { data } = res.locals;

  const invalidProperties = Object.keys(data).filter(
    (key) => !VALID_PROPERTIES.includes(key)
  );

  if (invalidProperties.length) {
    return next({
      error: 400,
      message: `Invalid properties: ${invalidProperties.join(", ")}`,
    });
  }
  next();
}
module.exports = {
  read: [asyncErrorBoundary(isValidTableId), read],
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataHas("table_name"),
    bodyDataHas("capacity"),
    hasValidProperties,
    validPropertyValues,
    asyncErrorBoundary(create),
  ],
  update: [
    bodyDataHas("reservation_id"),
    asyncErrorBoundary(reservationIdExists),
    tableHasSufficientCapacity,
    isTableFree,
    asyncErrorBoundary(update),
  ],
};
