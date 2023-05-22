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
    data: newTable[0]
  })
}

async function validateReservationExists(req, res, next) {
  const reservation = await reservationService.read(req.body.data.reservation_id)
  if(reservation) {
    res.locals.reservation = reservation
    next()
  } else {
    next({
      status: 404,
      message: `reservation_id ${req.body.data.reservation_id} does not exist`
    })
  }
}

async function validateTableExists(req, res, next) {
  const table = await service.read(req.params.table_id)
  if(table[0]) {
    res.locals.table = table[0]
    next()
  } else {
    next({
      status: 404,
      message: `table_id ${req.params.table_id} does not exist`
    })
  }
}

async function validateTableIsFree(req, res, next) {
  if(res.locals.table.status !== "Free") {
    next( {
      status: 400,
      message: `Table is occupied`
    })
  } else {
    next()
  }
}

async function validateTableHasCapacity(req, res, next) {
  //lookup the reservation, if the reservation has more people than the capacity, error
  if(res.locals.reservation.people > res.locals.table.capacity) {
    next({
      status: 400,
      message: `Table does not have the capacity for this party`
    })
  } else {
    next()
  }
}

async function update(req, res) {
  const updatedTableData = {
    ...res.locals.table,
    reservation_id: res.locals.reservation_id,
    status: "Occupied"
  }
  const updatedTable = await service.update(updatedTableData)
  await reservationService.update(res.locals.reservation.reservation_id, "seated")
  res.status(200).json({
    data: updatedTable
  })
}

async function validateReservationExistsFromTable(req, res, next) {
  const reservation = await reservationService.read(res.locals.table.reservation_id)
  if(reservation) {
    res.locals.reservation = reservation
    next()
  } else {
    next({
      status: 404,
      message: `reservation_id ${req.body.data.reservation_id} does not exist`
    })
  }
}

function validateReservationSeated(req, res, next) {
  if(res.locals.reservation.status === "seated") {
    next({
      status: 400,
      message: `reservation_id ${req.body.data.reservation_id} is already seated`
    })
  } else {
    next()
  }
}

async function validateTableIsOccupied(req, res, next) {
  if(res.locals.table.reservation_id) {
    next()
  } else {
    next({
      status: 400,
      message: `table_id ${req.params.table_id} is not occupied`
    })
  }
}

async function destroy(req, res) {
  const deletedEntry = await service.destroy(res.locals.table.table_id, res.locals.reservation.reservation_id)
  await reservationService.update(res.locals.reservation.reservation_id, "finished")
  res.status(200).json({
    data: deletedEntry
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
    validateDataIsSent,
    ["reservation_id"].map(field=>validateHasTextFunction(field)),
    asyncErrorBoundary(validateReservationExists),
    validateReservationSeated,
    asyncErrorBoundary(validateTableExists),
    validateTableIsFree,
    validateTableHasCapacity,
    asyncErrorBoundary(update),
  ],
  destroy: [
    asyncErrorBoundary(validateTableExists),
    validateTableIsOccupied,
    asyncErrorBoundary(validateReservationExistsFromTable),
    asyncErrorBoundary(destroy)
  ]
};
