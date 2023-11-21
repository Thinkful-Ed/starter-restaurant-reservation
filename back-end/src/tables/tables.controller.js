const tableService = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * Update handler for assigning a reservation to a table.
 */

async function list(req, res, next) {
  const data = await tableService.list();
  res.status(200).json({ data });
}

async function tableExists(req, res, next) {
  const table_id = req.params.table_id;
  const table = await tableService.read(table_id);
  if (table) {
    res.locals.table = table;
    next();
  } else {
    next({ status: 404, message: `Table Id${table_id} does not exist` });
  }
}

async function validateInput(req, res, next) {
  if (!req.body.data) {
    next({
      status: 400,
      message: `Data is missing.`,
    });
  }
  const reservation_id = req.body.data.reservation_id;
  if (!reservation_id) {
    next({
      status: 400,
      message: `The property reservation_id is missing.`,
    });
  }

  const table = res.locals.table;
  const reservation = await reservationService.read(reservation_id);
  if (reservation) {
    if (table.capacity < reservation.people) {
      next({
        status: 400,
        message: `Table ${table.table_id} does not have sufficient capacity since it fits ${table.capacity} but Reservation ${reservation.reservation_id} which has a party size of ${reservation.people} .`,
      });
    }
    if (table.status === "Occupied") {
      next({
        status: 400,
        message: `Table ${table.table_id} is already occupied by Reservation ${table.reservation_id}.`,
      });
    }
    next();
  } else {
    next({
      status: 404,
      message: `Reservation Id ${reservation_id} does not exist`,
    });
  }
}

async function update(req, res) {
  const table_id = res.locals.table.table_id;
  const reservation_id = req.body.data.reservation_id;
  const data = await tableService.update(table_id, reservation_id);
  res.status(200).json({ data });
}

module.exports = {
  list,
  update: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(validateInput),
    asyncErrorBoundary(update),
  ],
};
