const reservationService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasValidReservationProperties = require("../errors/hasValidReservationProperties");
const hasValidUpdateResStatusProperties = require("../errors/hasValidUpdateResStatusProperties");

/**
 * List handler for reservation resources for a particular reservation_date or mobile_number
 */

async function list(req, res) {
  const date = req.query.date;
  const mobile_number = req.query.mobile_number;
  const data = mobile_number
    ? await reservationService.search(mobile_number)
    : await reservationService.list(date);
  res.status(200).json({ data });
}

/**
 * Exists handler for a reservation
 */

async function reservationExists(req, res, next) {
  const reservation_id = req.params.reservation_id;
  const reservation = await reservationService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    next();
  } else {
    next({
      status: 404,
      message: `Reservation id ${reservation_id} does not exist.`,
    });
  }
}

/**
 * Read handler for a reservation
 */

function read(req, res, next) {
  const data = res.locals.reservation;
  res.status(200).json({ data });
}

/**
 * Handler to check if the create request has required properties for a new reservation
 */
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

/**
 * Handler to check if the create request has valid properties for a new reservation
 */
const checksValidProperties = hasValidReservationProperties();

async function create(req, res, next) {
  const data = await reservationService.create(req.body.data);
  res.status(201).json({ data });
}

const checkUpdateProperties = hasValidUpdateResStatusProperties();

async function updateStatus(req, res, next) {
  const reservation = res.locals.reservation;
  const newStatus = req.body.data.status;
  const data = await reservationService.update(
    reservation.reservation_id,
    newStatus
  );
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    hasRequiredProperties,
    checksValidProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(checkUpdateProperties),
    asyncErrorBoundary(updateStatus),
  ],
};
