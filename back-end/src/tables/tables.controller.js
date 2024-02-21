const service = require('./tables.service');
const knex = require('../db/connection');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Middleware to check if data is present in the request body
function hasData(req, res, next) {
  if (!req.body.data) {
    return next({ status: 400, message: "Data is missing" });
  }
  next();
}

// Validation: Check if table name is valid
function hasValidTableName(req, res, next) {
  const { table_name } = req.body.data;
  if (!table_name || table_name === "" || table_name.length < 2) {
    return next({ status: 400, message: "table_name must be at least 2 characters long" });
  }
  next();
}

// Validation: Check if capacity is valid
function hasValidCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (!capacity || typeof capacity !== 'number' || capacity < 1) {
    return next({ status: 400, message: "capacity must be a number greater than 0" });
  }
  next();
}

// Validation: Check if table exists
async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);

  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `Table ${table_id} cannot be found.` });
}

// Validation: Check if reservation exists and is valid
async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    return next({ status: 400, message: "reservation_id is missing" });
  }
  const reservation = await knex('reservations').where({ reservation_id }).first();

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `Reservation ${reservation_id} cannot be found.` });
}

// Validation: Check if table has sufficient capacity
async function hasSufficientCapacity(req, res, next) {
  const table = res.locals.table;
  const reservation = res.locals.reservation;

  if (table.capacity < reservation.people) {
    return next({ status: 400, message: 'Table does not have sufficient capacity' });
  }
  next();
}

// Validation: Check if table is free
async function isTableFree(req, res, next) {
  const table = res.locals.table;
  
  if (table.occupied) {
    return next({ status: 400, message: 'Table is already occupied' });
  }
  next();
}

// List all tables
async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

// Create a new table
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res, next) {
  const { table_id } = req.params;
  const { reservation_id } = req.body.data;

  // Retrieve the current reservation to check its status
  const currentReservation = await knex('reservations')
    .where({ reservation_id })
    .first();

  // Check if the reservation is already seated
  if (currentReservation.status === 'seated') {
    return next({ status: 400, message: 'Reservation is already seated.' });
  }

  // Update the table with the reservation_id and set it as occupied
  await knex('tables')
    .where({ table_id })
    .update({ reservation_id, occupied: true });

  // Update the reservation status to 'seated'
  await knex('reservations')
    .where({ reservation_id })
    .update({ status: 'seated' });

  res.status(200).json({ data: { status: 'seated' } });
}


async function finish(req, res, next) {
  const { table_id } = req.params;
  const table = await knex('tables')
    .where({ table_id })
    .first();

  if (!table.occupied) {
    return next({ status: 400, message: 'Table is not occupied.' });
  }

  // Update the associated reservation status to 'finished'
  await knex('reservations')
    .where({ reservation_id: table.reservation_id })
    .update({ status: 'finished' });

  // Mark the table as available again
  await knex('tables')
    .where({ table_id })
    .update({ reservation_id: null, occupied: false });

  res.status(200).json({ data: { status: 'finished' } });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasData, hasValidTableName, hasValidCapacity, asyncErrorBoundary(create)],
  update: [
    hasData,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(hasSufficientCapacity),
    asyncErrorBoundary(isTableFree),
    asyncErrorBoundary(update)
  ],
  finish: asyncErrorBoundary(finish),

};
