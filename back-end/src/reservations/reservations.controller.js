const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const reservationsService = require("./reservations.service");

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
];

function hasData(req, res, next) {
  const data = req.body.data;
  if (!data) {
    return next({
      status: 400,
      message: `Request body must have data.`,
    });
  }
  next();
}

function isValidTime(timeString) {
  const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // Time format HH:mm
  return regex.test(timeString);
}


function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Date format YYYY-MM-DD
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function isValidDateTimeMiddleware(req, res, next) {
  const { data = {} } = req.body;
  const { reservation_date, reservation_time } = data;
  if (reservation_date && !isValidDate(reservation_date)) {
    return next({
      status: 400,
      message: `Invalid field: reservation_date. Must be a valid date in the format YYYY-MM-DD.`,
    });
  }
  if (reservation_time && !isValidTime(reservation_time)) {
    return next({
      status: 400,
      message: `Invalid field: reservation_time. Must be a valid time in the format HH:mm.`,
    });
  }
  next();
}

function isValidNumber(req, res, next) {
  const { data = {} } = req.body;
  const { people } = data;
  if (!Number.isInteger(people)) {
    return next({
      status: 400,
      message: `Invalid field: people. Must be a valid number.`,
    });
  }
  next();
}

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function isNotTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const date = Date.parse(reservation_date);
  const dayOfTheWeek = new Date(date);
  if (dayOfTheWeek.getUTCDay() == 2) {
    return next({
      status: 400,
      message: `Reservations cannot be made on a Tuesday. The restaurant is closed.`,
    });
  } else if (date && date > 0) {
    return next();
  }
}

function dateIsNotInPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const day = new Date(`${reservation_date} ${reservation_time}`);
  if (day < new Date()) {
    return next({
      status: 400,
      message: `The reservation must be in the future.`,
    });
  }
  next();
}

function isValidBusinessHours(req, res, next) {
  const { reservation_time } = req.body.data;
  const openingTime = new Date(`1970-01-01T10:30:00`);
  const closingTime = new Date(`1970-01-01T21:30:00`);
  const reservationDateTime = new Date(`1970-01-01T${reservation_time}`);
  if (reservationDateTime < openingTime) {
    return next({
      status: 400,
      message: `Reservation time must be after 10:30 AM.`,
    });
  }
  if (reservationDateTime > closingTime) {
    return next({
      status: 400,
      message: `Reservation time must be before 9:30 PM.`,
    });
  }
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
    message: `${req.params.reservation_id} cannot be found.`,
  });
}

function isValidBookedReservation(req, res, next) {
  const { status } = req.body.data;
  if (status && (status == "seated" || status == "finished")) {
    return next({
      status: 400,
      message: `Cannot create a "seated" or "finished" reservation.`,
    });
  }
  next();
}

function isValidStatus(req, res, next) {
  const { status } = req.body.data;
  const validStatus = ["booked", "seated", "finished"];
  if (!validStatus.includes(status)) {
    return next({
      status: 400,
      message: `Invalid status: ${status}. Must be one of booked, seated, or finished.`,
    });
  }
  res.locals.status = status;
  next();
}

function isValidFinishedReservation(req, res, next) {
  const { reservation } = res.locals;
  if (reservation.status === "finished") {
    return next({
      status: 400,
      message: `Invalid status transition. Can only set status to "finished" when the current status is "seated".`,
    });
  }
  next();
}

async function list(req, res) {
  const { date } = req.query;
  const { mobile_number } = req.query;
  let data;
  if (date) {
    data = await reservationsService.listByDate(date);
  }
  if (mobile_number){
    data = await reservationsService.search(mobile_number);
  }
  res.json({ data });
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function read(req, res) {
  res.json({ data: res.locals.reservation });
}

async function update(req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await reservationsService.update(updatedReservation);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    isValidDateTimeMiddleware,
    isValidNumber,
    hasOnlyValidProperties,
    hasRequiredProperties,
    dateIsNotInPast,
    isNotTuesday,
    isValidBusinessHours,
    isValidBookedReservation,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateReservation: [
    asyncErrorBoundary(reservationExists),
    hasData,
    isValidDateTimeMiddleware,
    isValidNumber,
    hasOnlyValidProperties,
    hasRequiredProperties,
    dateIsNotInPast,
    isNotTuesday,
    isValidBusinessHours,
    isValidBookedReservation,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    isValidStatus,
    isValidFinishedReservation,
    asyncErrorBoundary(update),
  ],
};
