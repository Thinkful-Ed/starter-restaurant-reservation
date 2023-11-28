const reservationService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasValidReservationProperties = require("../errors/hasValidReservationProperties");

/**
 * List handler for reservation resources
 */

async function list(req, res) {
  const date = req.query.date;
  const data = await reservationService.list(date);
  res.status(200).json({ data });
}

async function reservationExists(req, res, next) {
  const reservation_id = req.params.reservation_id;
  const reservation = await reservationService.read(reservation_id);
  if (reservation) {
    next();
    res.locals.reservation = reservation;
  }
  next({
    status: 404,
    message: `Reservation id ${reservation_id} does not exist.`,
  });
}

function read(req, res, next) {
  const data = res.locals.reservation;
  res.status(200).json({ data });
}

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const checksValidProperties = hasValidReservationProperties();

async function create(req, res, next) {
  const data = await reservationService.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    hasRequiredProperties,
    checksValidProperties,
    asyncErrorBoundary(create),
  ],
};
