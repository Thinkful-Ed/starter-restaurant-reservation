/**
 * List handler for reservation resources
 */
const reservationsService = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

function hasBodyData(req, _res, next) {
  const { data } = req.body;
  if (!data)
    next({
      status: 400,
    });
  next();
}

async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `${req.params.reservation_id}`,
  });
}

// Validate name exists and is not empty
function nameIsValid(req, _res, next) {
  const { first_name, last_name } = req.body.data;
  const error = { status: 400 };
  if (!first_name || !first_name.length) {
    error.message = `first_name`;
    return next(error);
  }
  if (!last_name || !last_name.length) {
    error.message = `last_name`;
    return next(error);
  }

  next();
}

function mobileNumberIsValid(req, _res, next) {
  const { mobile_number } = req.body.data;
  if (!mobile_number)
    return next({
      status: 400,
      message: "mobile_number",
    });
  next();
}

function dateIsValid(req, _res, next) {
  const { reservation_date } = req.body.data;
  if (!reservation_date || new Date(reservation_date) == "Invalid Date")
    return next({
      status: 400,
      message: "reservation_date",
    });
  next();
}

function timeIsValid(req, res, next) {
  let { reservation_time } = req.body.data;

  const error = {
    status: 400,
    message: "reservation_time",
  };
  if (!reservation_time) return next(error);
  if(reservation_time[2] === ":") {
    reservation_time = reservation_time.replace(":", "");
    reservation_time = reservation_time.substring(0,4);
  }
  res.locals.hour = reservation_time.substring(0,2)
  res.locals.mins = reservation_time.substring(2,4)
  if(Number.isInteger(Number(reservation_time))) {
    next()
  } else {
    next(error);
  }
}

function peopleIsValid(req, _res, next) {
  const { people } = req.body.data;
  if (!people || !Number.isInteger(people) || people <= 0) {
    return next({
      status: 400,
      message: `people`,
    });
  }
  next();
  
}

function dateIsInTheFuture(req, _res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const dateTime = new Date(`${reservation_date}T${reservation_time}`);
  if (dateTime < new Date()) {
    return next({
      status: 400,
      message: "Reservation must be in the future",
    });
  }
  next();
}

function dateIsNotTuesday(req, _res, next) {
  const { reservation_date } = req.body.data;
  const day = new Date(reservation_date).getUTCDay();
  if (day === 2)
    return next({
      status: 400,
      message: "closed",
    });
  next();
}

function isDuringOpenHours(_req, res, next) {
  const { hour, mins } = res.locals;
  if (hour >= 22 || (hour <= 10 && mins <= 30)) {
    return next({
      status: 400,
      message: "Not open during those hours",
    });
  }
  next();
}

function hasValidStatus(req, res, next) {
  const { status } = req.body.data;
  const currentStatus = res.locals.reservation.status;

  if (currentStatus === "finished" || currentStatus === "cancelled") {
    return next({
      status: 400,
      message: `Reservation status is finished`,
    });
  }
  if (
    status === "booked" ||
    status === "seated" ||
    status === "finished" ||
    status === "cancelled"
  ) {
    res.locals.status = status;
    return next();
  }
  next({
    status: 400,
    message: `Invalid status: ${status}`,
  });
}

function isNotFinished(_req, res, next) {
  if (res.locals.reservation.status === "finished")
    return next({
      status: 400,
      message: "finished",
    });
  next();
}

async function list(req, res, _next) {
  const { date } = req.query;
  if (date) {
    return res.json({ data: await reservationsService.listOnDate(date) });
  }
  const { mobile_number } = req.query;
  if (mobile_number) {
    return res.json({ data: await reservationsService.search(mobile_number) });
  }

  data = await reservationsService.list();
  return res.json({ data });
}

async function read(req, res ){
  const data = await res.locals.reservation;
  res.json({ data });
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedRes = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await reservationsService.update(updatedRes);
  res.status(200).json({ data });
}

async function updateStatus(req, res, _next) {
  res.locals.reservation.status = req.body.data.status;
  const data = await reservationsService.update(res.locals.reservation);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [reservationExists, asyncErrorBoundary(read)],
  create: [
    hasBodyData,
    nameIsValid,
    mobileNumberIsValid,
    dateIsValid,
    timeIsValid,
    peopleIsValid,
    dateIsInTheFuture,
    dateIsNotTuesday,
    isDuringOpenHours,
    asyncErrorBoundary(create),
  ],
  update: [
    hasBodyData,
    nameIsValid,
    mobileNumberIsValid,
    dateIsValid,
    timeIsValid,
    peopleIsValid,
    dateIsInTheFuture,
    dateIsNotTuesday,
    isDuringOpenHours,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    hasBodyData,
    asyncErrorBoundary(reservationExists),
    isNotFinished,
    hasValidStatus,
    asyncErrorBoundary(updateStatus)
  ],
  reservationExists
};
