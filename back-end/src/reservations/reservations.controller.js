/**
 * List handler for reservation resources
 */
const reservationsService = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasProperties = require('../errors/hasProperties');

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

async function list(req, res) {
  const date = req.query.date;
  const mobile_number = req.query.mobile_number;
  const data = await (date
    ? reservationsService.list(date)
    : reservationsService.search(mobile_number));
  res.json({ data });
}

async function reservationExists(req, res, next){
  const reservationId = 
    req.params.reservation_id || (req.body.data || {}).reservation_id;

  const reservation = await reservationsService.read(reservationId);
  if(reservation){
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservationId} cannot be found.`
  });
}

async function read(req, res ){
  const data = await res.locals.reservation;
  res.json({ data });
}


module.exports = {
  list: asyncErrorBoundary(list),
  read: [reservationExists, asyncErrorBoundary(read)]
};
