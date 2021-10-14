const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("../reservations/reservations.service");
const hasProperties = require("../errors/missingFields");




async function hasReservationId(req, res, next) {
  const {reservation_id} = req.body.data
  if (reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_id is missing`,
  });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const foundReservation = await reservationsService.read(reservation_id);
  if (foundReservation) {
    res.locals.foundReservation = foundReservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with id: ${reservation_id} was not found`,
  });
}


async function reservationIsBooked(req, res, next) {
  const { foundReservation } = res.locals;
  //const resObject = foundReservation.find((reservation)=> reservation[0])
  if (foundReservation.status !== "seated") {
    console.log("foundReservation.status", foundReservation.status)
    return next();
  }
  next({
    status: 400,
    message: `Reservation is already 'seated'`,
  });
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const foundTable = await tablesService.read(table_id);
  if (foundTable) {
    res.locals.foundTable = foundTable;
    return next();
  }
  next({
    status: 404,
    message: `Table with id: ${table_id} was not found`,
  });
}

function hasValidTableSize(req, res, next) {
  const { foundTable } = res.locals;
  const { foundReservation }  = res.locals;
  if (foundTable.capacity >= foundReservation.people) {
    return next();
  }
  next({
    status: 400,
    message: `Table with id: ${foundTable.table_id} does not have the capacity to seat this reservation`,
  });
}

function tableIsFree(req, res, next) {
  const { foundTable } = res.locals;
  if (!foundTable.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table with id: ${foundTable.table_id} is already occupied`,
  });
}

// function occupyTable(req, res, next) {
//   const { foundTable } = res.locals;
//   const { reservation_id } = req.body.data;
//   foundTable.reservation_id = reservation_id;
//   res.locals.reservationId = reservation_id;
//   res.locals.reservationStatus = "seated";
//   if (foundTable.reservation_id) {
//     return next();
//   }
//   next({
//     status: 400,
//     message: `Table with id: ${foundTable.table_id} could not be assigned reservation id ${foundTable.reservation_id}.`,
//   });
// }

function tableIsOccupied(req, res, next) {
  const { foundTable } = res.locals;
  if (foundTable.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table with id: ${foundTable.table_id} is not occupied`,
  });
}

function cancelTable(req, res, next) {
  const { foundTable } = res.locals;
  res.locals.reservationId = foundTable.reservation_id;
  foundTable.reservation_id = null;
  res.locals.reservationStatus = "finished";
  if (!foundTable.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table with id: ${foundTable.table_id} could not remove reservation id ${foundTable.reservation_id}  for some reason. Please contact backend engineer for assistance`,
  });
}

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

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

const hasRequiredProperties = hasProperties(...["table_name", "capacity"]);



function hasValidTableName(tableName) {
  return tableName.length > 1;
}

function isValidCapacity(capacity) {
  return Number.isInteger(capacity) && capacity >= 1;
}



function hasValidValues(req, res, next) {
  const { table_name, capacity } = req.body.data;

  if (!isValidCapacity(capacity)) {
    return next({
      status: 400,
      message: "capacity must be greater than or equal to 1",
    });
  }
  if (!hasValidTableName(table_name)) {
    return next({
      status: 400,
      message: "table_name must be at least 2 characters long",
    });
  }
  next();
}


// C
async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

// R
async function read(req, res) {
  const { foundTable } = res.locals;
  res.json({ data: foundTable });
}

//U
async function update(req, res, next) {
  const { foundTable } = res.locals;
  const { reservation_id } = req.body.data;
  if(foundTable.table_name){
  const data = await tablesService.updateReservation(reservation_id, "seated");
  const x = await tablesService.occupied(foundTable.table_id, reservation_id);
  res.json({data});
  }
  else{
    return next({
      status: 400,
      message: "table_name required",
    });
  }
}

//L
async function list(req, res) {
  const tables = await tablesService.list();
  res.locals.data = tables;
  const { data } = res.locals;
  res.json({ data: data });
}

function hasData(){
return (!req.body.data !== null)
}



module.exports = {
  create: [hasValidValues, asyncErrorBoundary(create)],
  list: [asyncErrorBoundary(list)],
  updateReservation: [
    asyncErrorBoundary(hasReservationId),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(reservationIsBooked),
    asyncErrorBoundary(tableExists),
    hasValidTableSize,
    tableIsFree,
    asyncErrorBoundary(update)],
};
