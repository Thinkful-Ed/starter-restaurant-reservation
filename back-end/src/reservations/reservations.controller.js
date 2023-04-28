const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
// async function list(req, res, next) {
//   const data = await reservationsService.list();
//   res.json({ data });
// }

async function list(req, res) {
  const date = req.query.date;
  if (date) {
    const data = await reservationsService.listDate(date);
    res.json({ data });
  } else {
    const data = await reservationsService.list();
    res.json({ data });
  }
}

function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
}

async function create(req, res) {
  // const { data: {
  //   first_name,
  //   last_name,
  //   mobile_number,
  //   reservation_date,
  //   reservation_time,
  //   people
  // } = {} } = req.body
  const { data = {} } = req.body;
  await reservationsService.create(data);
  res.status(201).json({ data });
}

async function destroy(req, res) {
  const { reservation } = res.locals;
  await reservationsService.delete(reservation.reservation_id);
  res.sendStatus(204);
}

// VALIDATION

async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ID ${req.params.reservationId} cannot be found.`,
  });
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Reservation must include ${propertyName}` });
  };
}

function peopleQuantityIsValid(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (people <= 0 || !Number.isInteger(people)) {
    return next({
      status: 400,
      message: `people must have a quantity that is an integer greater than 0`,
    });
  }
  next();
}

function timeIsValid(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  const isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
    reservation_time
  );
  if (!isValid) {
    return next({
      status: 400,
      message: `reservation_time must be in valid format: HH:MM or HH:MM:SS`,
    });
  }
  next();
}

function dateIsValid(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  const isValid =
    /^([0-9][0-9][0-9][0-9])-(0[0-9]|1[0-2])-([0-2]?[0-9]|3[0-1])?$/.test(
      reservation_date
    );
  if (!isValid) {
    return next({
      status: 400,
      message: `reservation_date must be in valid format: YYYY-MM-DD`,
    });
  }
  next();
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    peopleQuantityIsValid,
    timeIsValid,
    dateIsValid,
    asyncErrorBoundary(create),
  ],
  delete: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
};
