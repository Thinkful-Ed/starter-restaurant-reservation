const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function hasValidFields(req, res, next) {
  const { data = {} } = req.body;
  const validFields = new Set([
    "table_name",
    "capacity",
  ]);

  const invalidFields = Object.keys(data).filter(
    field => !validFields.has(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

function hasTableId(req, res, next) {
  const table = req.params.table_id;
  console.log(table);
  if(table){
      res.locals.reservation = table;
      next();
  } else {
      next({
          status: 400,
          message: `missing table_id`,
      });
  }
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

const has_table_name = bodyDataHas("table_name");
const has_capacity = bodyDataHas("capacity");

function isValidTableName(req, res, next){
  const { data = {} } = req.body;
  if (data['table_name'].length < 2){
      return next({ status: 400, message: `table_name length is too short.` });
  }
  next();
}

function isValidNumber(req, res, next){
  const { data = {} } = req.body;
  if ('capacity' in data){
      if (data['capacity'] === 0 || !Number.isInteger(data['capacity'])){
          return next({ status: 400, message: `capacity must be a number.` });
      }
  }
  next();
}

async function list(req, res) {
  const data = await service.list(req.query.date);

  res.json({
    data,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({
    data: data,
  });
}

async function read(req, res) {
  const data = res.locals.reservation;
  res.status(200).json({
    data,
  })
}

function hasCapacity(req, res, next) {
  const tableCapacity = res.locals.table.capacity;
  const guests = res.locals.reservation.people;
  if ( tableCapacity < guests ) {
    next({
      status: 400,
      message: `Too many guests ( ${guests} ) for table size. Please choose table with capacity.`,
    });
  } else {
    next();
  }
}

async function seat(req, res) {
  const data = await service.seat(res.locals.table.table_id, res.locals.reservation.reservation_id);
  res.json({
    data,
  });
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(Number(table_id));

  if (table) {
    res.locals.table = table;
    next();
  } else {
    next({ status: 404, message: `No such table: ${table_id}` });
  }
}

function isOccupied(req, res, next) {
  if (res.locals.table.reservation_id) {
    next();
  } else {
    next({
      status: 400,
      message: `Table is not occupied`,
    });
  }
}

async function occupy(req, res) {
    console.log("DEBUG FINISH");
    console.log(res.locals.table);
  const data = await service.occupy(res.locals.table);

  res.json({
    data,
  });
}

function isAvailable(req, res, next) {
  if (res.locals.table.reservation_id) {
    next({
      status: 400,
      message: `Table id is occupied: ${res.locals.table.table_id}`,
    });
  } else {
    next();
  }
}

function isBooked(req, res, next) {
  if (res.locals.reservation.status === "booked") {
    next();
  } else {
    // if it is seated:
    next({
      status: 400,
      message: `Reservation is ${res.locals.reservation.status}.`,
    });
  }
}
module.exports = {
  create: [
      has_table_name,
      has_capacity,
      isValidTableName,
      isValidNumber,
//      hasValidFields,
      asyncErrorBoundary(create)
  ],
  read: [hasTableId, asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
  seat: [tableExists, isAvailable, hasCapacity, isBooked, seat],
  occupy: [tableExists, isOccupied, occupy]
};
