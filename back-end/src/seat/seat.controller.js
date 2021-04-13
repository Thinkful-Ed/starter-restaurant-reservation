const service = require('./seat.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

////////////////
// MIDDLEWARE //
////////////////

function isValid(request, _, next) {
  if (!request.body.data)
    return next({
      status: 400,
      message: 'Data is missing!',
    })

  next()
}

async function seatExists(request, response, next) {
  const { reservation_id } = request.body.data
  const table = response.locals.table
  const { table_id, capacity } = table

  if (!reservation_id) {
    return next({
      status: 400,
      message: 'Missing reservation_id',
    })
  }

  if (table.reservation_id) {
    return next({
      status: 400,
      message: 'Table is already occupied.',
    })
  }

  // Assign the reservation_id and then check if it is a valid reservation
  table.reservation_id = reservation_id

  let reservation = await service.read(reservation_id)

  if (!reservation) {
    return next({
      status: 404,
      message: `Reservation ${reservation_id} cannot be found.`,
    })
  }

  if (reservation.people > capacity) {
    return next({
      status: 400,
      message: `Table ${table_id} does not have the capacity for your party. Choose another table.`,
    })
  }

  next()
}

// Update
async function update(request, response) {
  const { table } = response.locals

  const { table_id } = request.params

  const updatedTable = { ...table, ...request.body.data }

  const data = await service.update(table_id, updatedTable)

  response.json({ data })
}

// Delete
function destroy(request, response) {
  console.log('CONSOLE LOG: DESTROY', response.locals)
  // const { reservation_id, table_id } = table

  // if (!reservation_id)
  //   return next({
  //     status: 400,
  //     message: 'This table is not occupied.',
  //   })

  // service.delete(table_id).then(() => response.sendStatus(200))
}

module.exports = {
  update: [
    asyncErrorBoundary(isValid),
    asyncErrorBoundary(seatExists),
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(seatExists), asyncErrorBoundary(destroy)],
}
