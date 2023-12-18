const reservationsService = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { first } = require("../db/connection");

// LIST
async function list(req, res) {
  const { date } = req.query;
  const { mobile_number } = req.query;
  let data;
  if (date) {
    data = await reservationsService.listByDate(date);
  } else if (mobile_number) {
    data = await reservationsService.search(mobile_number);
  } else {
    data = await reservationsService.list();
  }
  res.json({ data });
}

// READ
async function read(req, res) {
  const { reservation } = res.locals;
  const data = await reservationsService.read(reservation.reservation_id);
  res.json({ data });
}

// POST
async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

// ---------- //
// VALIDATION //
// ---------- //
async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await reservationsService.read(reservationId);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  } else {
    return next({
      status: 404,
      message: `No reservation found for id '${reservationId}'.`,
    });
  }
}

function hasValidName(req, res, next) {
  const {
    data: { first_name, last_name },
  } = req.body;

  if (/^[0-9]+$/.test(first_name) || /^[0-9]+$/.test(last_name)) {
    return next({
      status: 400,
      message: "Name must include only letters A-Z.",
    });
  }

  return next();
}

function hasValidDate(req, res, next) {
  const {
    data: { reservation_date, reservation_time },
  } = req.body;
  const invalidDate = 2;
  const submitDate = new Date(reservation_date + " " + reservation_time);
  const dayAsNum = submitDate.getUTCDay();
  const today = new Date();

  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  if (!reservation_date) {
    return next({
      status: 400,
      message: `reservation_date cannot be empty. Please select a date.`,
    });
  }
  if (!reservation_date.match(dateFormat)) {
    return next({
      status: 400,
      message: `the reservation_date must be a valid date in the format 'YYYY-MM-DD'`,
    });
  }
  if (dayAsNum === invalidDate) {
    return next({
      status: 400,
      message: `The restaurant is closed on Tuesdays. Please select a different day.`,
    });
  }

  // if editing, don't do final check for past date
  if (res.locals.reservation) {
    return next();
  }

  next();
}

function hasValidTime(req, res, next) {
  const {
    data: { reservation_time },
  } = req.body;
  const validTimeFormat = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;

  if (!reservation_time) {
    next({
      status: 400,
      message: `reservation_time cannot be empty. Please select a time.`,
    });
  }
  if (!reservation_time.match(validTimeFormat)) {
    return next({
      status: 400,
      message: `the reservation_time must be a valid time in the format '12:30`,
    });
  }
  if (reservation_time <= "10:29:59") {
    next({
      status: 400,
      message: "The restaurant does not open until 10:30 a.m.",
    });
  } else {
    if (reservation_time >= "21:30:00") {
      next({
        status: 400,
        message: `The restaurant closes at 22:30 (10:30 pm). Please schedule your reservation at least one hour before close.`,
      });
    }
  }
  next();
}

function hasValidPhoneNumber(req, res, next) {
  const {
    data: { mobile_number },
  } = req.body;

  if (/[a-zA-Z.,]/.test(mobile_number) === true) {
    return next({
      status: 400,
      message: "Mobile Number must only include numbers",
    });
  }

  next();
}

function hasValidPeople(req, res, next) {
  const {
    data: { people },
  } = req.body;

  if (people <= 0 || typeof people !== "number") {
    return next({
      status: 400,
      message: "'people' value must be greater than 0 and be a number",
    });
  }

  next();
}

function checkBooked(req, res, next) {
  const { status } = req.body.data;
  if (status) {
    if (status !== "booked") {
      next({
        status: 400,
        message: `A new reservation cannot have a status of ${status}`,
      });
    }
  }
  next();
}

function checkStatus(req, res, next) {
  const { status } = req.body.data;
  const validStatuses = ["booked", "seated", "finished", "cancelled"];
  if (!validStatuses.includes(status)) {
    return next({
      status: 400,
      message: `The status property must be either ${validStatuses.join(
        ", "
      )}.  You entered '${status}'`,
    });
  }
  next();
}

function validateFinish(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    return next({
      status: 400,
      message: `Reservation status is currently finished and cannot be updated`,
    });
  }
  next();
}

function hasData(req, res, next) {
  const data = req.body.data;
  if (data) {
    next();
  } else {
    next({
      status: 400,
      message: `Request is missing 'data'.`,
    });
  }
}
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
];

function hasOnlyValidProperties(req, res, next) {
  // iterate through keys in req.body
  const invalidFields = Object.keys(req.body.data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  // if there are any invalid fields
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  create: [
    hasData,
    hasOnlyValidProperties,
    hasRequiredProperties,
    checkBooked,
    hasValidName,
    hasValidTime,
    hasValidDate,
    hasValidPhoneNumber,
    hasValidPeople,
    asyncErrorBoundary(create),
  ],
};
