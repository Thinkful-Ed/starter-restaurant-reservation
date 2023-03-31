const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const reservationsService = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const date = req.query.date;

  const data = date ? await reservationsService.listByDate(date) : await reservationsService.list();
  res.json({ data });
}
async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `Reservation ${req.params.reservation_id} cannot be found.` });
}

async function read(req, res) {
  res.json({ data: res.locals.reservation });
}

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Data is missing!"});
}

function validateReservationDate(req, res, next) {
  const { reservation_date } = req.body.data;
  if (reservation_date.match(/\d\d\d\d-\d\d-\d\d/)) {
    return next();
  }
  next({ status: 400, message: `reservation_date property must be an actual date, in the format: 'YYYY-MM-DD'.` })
}
function validateReservationTime(req, res, next) {
  const { reservation_time } = req.body.data;
  if (reservation_time.match(/\d\d:\d\d/)) {
    return next();
  }
  next({ status: 400, message: `reservation_time property must be an actual time, in the format: 'HH:MM'.` })
}
function validatePeople(req, res, next) {
  const { people } = req.body.data;
  
  if (typeof(people) === 'number' && people > 0) {
    return next();
  }
  next({ status: 400, message: `people property must be a number greater than zero.` });
}

const requiredProperties = ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"];

//Will check if any property is either missing or empty
const hasRequiredProperties = hasProperties(...requiredProperties);


async function create(req, res) {
  const newReservation = await reservationsService.create(req.body.data);

  res.status(201).json({ data: newReservation });
}

module.exports = {
  list,
  create: [
    hasData,
    hasRequiredProperties,
    validateReservationDate,
    validateReservationTime,
    validatePeople,
    asyncErrorBoundary(create)
  ],
  read: [
    asyncErrorBoundary(reservationExists),
    read,
  ], 
};
