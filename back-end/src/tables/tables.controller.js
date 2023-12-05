const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validation middleware

async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: "Table cannot be found." });
}

function validateTableHasData(req, res, next) {
  if (!req.body.hasOwnProperty("data")) {
    return next({
      status: 400,
      message: "Request must be have a data property.",
    });
  }
  return next();
}

function validateTableHasReservationId(req, res, next) {
  if (!req.body.data.hasOwnProperty("reservation_id")) {
    return next({
      status: 400,
      message: "Request must be have a reservation_id property.",
    });
  }
  return next();
}

function validateTableProperties(req, res, next) {
  const { data = {} } = req.body;
  const requiredProperties = [
    "table_name",
    "capacity",
  ];
  for (const property of requiredProperties) {
    if (!data.hasOwnProperty(property) || data[property] === "") {
      return next({
        status: 400,
        message: `Table must include a ${property} property.`,
      });
    }
  }
  return next();
}

function validateTableNameLength(req, res, next) {
  const {
    data: { table_name },
  } = req.body;
  if (table_name.length >= 2) {
    return next();
  } else {
    return next({
      status: 400,
      message: `table_name must be at least 2 characters.`,
    });
  }
}

function validateCapacityIsNumberOverOne(req, res, next) {
  const {
    data: { capacity },
  } = req.body;
  if (typeof capacity !== "number" || Number(capacity) < 1) {
    return next({
      status: 400,
      message: `capacity must be a number and be at least 1.`,
    });
  } else {
    return next();
  }
}

async function validateReservationExists(req, res, next) {
  const reservation = await tablesService.readReservation(req.body.data.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({ status: 404, message: `Reservation with reservation_id ${req.body.data.reservation_id} cannot be found.` });
}

function validateSufficientCapacity(req, res, next) {
  const reservation = res.locals.reservation;
  const table = res.locals.table;
  if (reservation.people > table.capacity) {
    return next({ status: 400, message: "This table does not have sufficient capacity for this reservation." });
  } else {
    return next();
  }
}

function validateTableIsAvailable(req, res, next) {
  const table = res.locals.table;
  if (table.reservation_id) {
    return next({ status: 400, message: "This table is occupied." });
  } else {
    return next();
  }
}

// CRUD

async function create(req, res) {
  const { data } = req.body;
  const newTable = await tablesService.create(data);
  res.status(201).json({ data: newTable[0] });
}



async function list(req, res, next) {
  const free = req.query.free;
  // console.log(free)
  // console.log("free === true", free === "true")
  if (free === "true") {
    const data = await tablesService.listAvailable();
    data.sort((A, B) => {
      const tableNameA = A.table_name;
      const tableNameB = B.table_name;
      return tableNameA.localeCompare(tableNameB);
    });
    res.json({
      data,
    });
  } else {
    const data = await tablesService.list();
    data.sort((A, B) => {
      const tableNameA = A.table_name;
      const tableNameB = B.table_name;
      return tableNameA.localeCompare(tableNameB);
    });
    res.json({
      data,
    });
  }
  }


  async function update(req, res, next) {
    const updatedTable = {
      ...req.body.data,
      table_id: res.locals.table.table_id,
    };
    const data = await tablesService.update(updatedTable);
    res.json({ data });
  }

module.exports = {
    create: [
      validateTableHasData,
      validateTableProperties,
      validateTableNameLength,
      validateCapacityIsNumberOverOne,
      asyncErrorBoundary(create)
    ],
    list: asyncErrorBoundary(list),
    update: [
      validateTableHasData,
      validateTableHasReservationId,
      asyncErrorBoundary(validateReservationExists),
      asyncErrorBoundary(tableExists),
      validateSufficientCapacity,
      validateTableIsAvailable,
      asyncErrorBoundary(update)
    ]
}