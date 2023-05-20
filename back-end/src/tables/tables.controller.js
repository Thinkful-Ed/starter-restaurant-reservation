const service = require("./tables.service")
const reservationService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const data = await service.list()
  res.json({
    data,
  });
}

function validateDataIsSent(req, res, next) {
  if(req.body.data) {
    next()
  } else {
    next({
      status: 400,
      message: `Request must include data`
    })
  }
}

//validates that all the fields has a value, stores the value in res.locals for further use
function validateHasTextFunction(field) {
  function validateHasText(req, res, next) {
    if(req.body.data[field]) {
      res.locals[field] = req.body.data[field]
      next()
    } else {
      next({
        status: 400,
        message: `Table must include a ${field}`
      })
    }
  }

  return validateHasText
}

function validateTableNameLength(req, res, next) {
    if(res.locals.table_name.length >= 2) {
      next()
    } else {
      next({
        status: 400,
        message: `table_name must be at least 2 characters`
      })
    }
}

function validateCapacityFormat(req, res, next) {
  if(typeof res.locals.capacity === "number") {
    next()
  } else {
    next({
      status: 400,
      message: `capacity must be an integer`
    })
  }
}

function validateCapacity(req, res, next) {
  console.log(typeof res.locals.capacity)
  if(Number(res.locals.capacity) > 0) {
    next()
  } else {
    next({
      status: 400,
      message: `Capacity must be greater than 0`
    })
  }
}

async function create(req, res) {
  const newTable = await service.create(req.body.data)
  res.status(201).json({
    data: newTable
  })
}

async function validateTableIsFree(req, res, next) {
  const table = await service.read(req.body.data)
  if(table[0].status !== "Free") {
    next( {
      status: 400,
      message: `Table is not free`
    })
  } else {
    next()
  }
}

async function validateTableHasCapacity(req, res, next) {
  //lookup the reservation, if the reservation has more people than the capacity, error
  const reservation = await reservationService.read(res.locals.reservation_id)
  if(reservation[0].people > res.locals.capacity) {
    next({
      status: 400,
      message: `Table does not have the capacity for this party`
    })
  } else {
    next()
  }
}

async function update(req, res) {
  const updatedTable = await service.update(req.body.data)
  res.status(201).json({
    data: updatedTable
  })
}
 
module.exports = {
  list: [
    asyncErrorBoundary(list)
  ],
  create: [
    validateDataIsSent,
    ["table_name", "capacity"].map(field=>validateHasTextFunction(field)),
    validateTableNameLength,
    validateCapacityFormat,
    validateCapacity,
    asyncErrorBoundary(create)
  ],
  update: [
    ["table_id","table_name", "capacity", "created_at", "updated_at", "status", "reservation_id"].map(field=>validateHasTextFunction(field)),
    asyncErrorBoundary(validateTableHasCapacity),
    asyncErrorBoundary(validateTableIsFree),
    asyncErrorBoundary(update),
  ]
};
