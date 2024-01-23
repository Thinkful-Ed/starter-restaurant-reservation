const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Validation middleware

//Validates that new Reservations have the correct properties
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    console.log(req.body);
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName} property.` });
  };
}

//Validates that the inputted table name is more than one character
function nameIsValid(req, res, next) {
  const { data: { table_name } = {} } = req.body;

  if (table_name && table_name.length >= 2) {
    return next();
  }
  next({ status: 400, message: `table_name` });
}

//Validates that the inputted capacity is actually a number
function capacityIsNumber(req, res, next) {
  const { data: { capacity } = {} } = req.body;

  if (typeof capacity === "number") {
    return next();
  }
  next({
    status: 400,
    message: "Table capacity must be at least a two-digit number.",
  });
}

//Validates that data exists when trying to update
function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }

  next({
    status: 400,
    message: "Body must have data property",
  });
}

//Verifies that the reservation, in fact, has an ID when seating
function resHasId(req, res, next) {
  console.log("Req body:", req.body);
  const resId = req.body.data.reservation_id;
  if (resId) {
    return next();
  }
  next({
    status: 400,
    message: "A reservation_id is required",
  });
}

//Executive functions

//Executive function to determine if the inputted tableID exists
async function tableExists(req, res, next) {
  console.log("Req Params:", req.params);
  const { table_id } = req.params;
  console.log("Table ID:", table_id);

  const table = await service.readTable(table_id);

  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `${req.params.table_id} does not exist`,
  });
}

//Executive function to determine if the inputted reservation exists
async function reservationExists(req, res, next) {
  console.log("Res Exists Req Body:", req.body);
  const resId = req.body.data.reservation_id;
  console.log("Res exists ResID:", resId);
  const reservation = await service.readReservation(resId);
  //console.log("Reservation ID:", reservation.reservation_id);
  console.log("Reservation information:", reservation);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }

  next({
    status: 404,
    message: `The provided reservation ID: ${resId} does not exist`,
  });
}

//Validates that the reservation has not already been seated
function reservationNotSeated(req, res, next) {
  const reservation = res.locals.reservation;
  if (reservation.status !== "seated") {
    return next();
  }

  next({
    status: 400,
    message: "Reservation has already been seated",
  });
}

//Validates that the table does not already have a reservation seated at it
function openTable(req, res, next) {
  const table = res.locals.table;
  console.log("Open Table table:", table);
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: "table_id is already occupied",
  });
}

//Validates that the party size of the reservation is smaller than the capacity of the requested table
function canAccommodateRes(req, res, next) {
  const { reservation, table } = res.locals;
  if (reservation.people <= table.capacity) {
    return next();
  }
  next({
    status: 400,
    message: "Table capacity is smaller than party size",
  });
}

//Executive function to create a new Table
async function create(req, res) {
  const newTable = await service.create(req.body.data);

  res.status(201).json({ data: newTable });
}

//Executive function to list Tables
async function list(req, res) {
  const data = await service.list();
  console.log("Table Data:", data);
  res.json({ data });
}

//Executive function to read information on specific table
async function read(req, res) {
  const data = req.locals.table;
  console.log("Table info:", data);
  res.json({ data });
}

//Executive function to seat the reservation
async function seatReservation(req, res) {
  const { reservation, table } = res.locals;
  const data = await service.seatReservation(
    reservation.reservation_id,
    table.table_id
  );
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  create: [
    bodyDataHas("table_name"),
    bodyDataHas("capacity"),
    nameIsValid,
    capacityIsNumber,
    asyncErrorBoundary(create),
  ],
  seatReservation: [
    hasData,
    resHasId,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    //reservationNotSeated,
    openTable,
    canAccommodateRes,
    asyncErrorBoundary(seatReservation),
  ],
};
