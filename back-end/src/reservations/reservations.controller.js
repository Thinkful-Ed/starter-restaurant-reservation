const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validation middleware

async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `Reservation with the ID ${req.params.reservationId} cannot be found.`,
  });
}

// validates data property of request

function validateReservationData(req, res, next) {
  if (!req.body.hasOwnProperty("data")) {
    return next({
      status: 400,
      message: "Request must be have a data property.",
    });
  }
  return next();
}

// validates all required properties exist and are not empty

function validateReservationProperties(req, res, next) {
  const { data = {} } = req.body;
  const requiredProperties = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];
  for (const property of requiredProperties) {
    if (!data.hasOwnProperty(property) || data[property] === "") {
      return next({
        status: 400,
        message: `Reservation must include a ${property} property.`,
      });
    }
  }
  return next();
}

// date is valid

function validateDateFormat(req, res, next) {
  const {
    data: { reservation_date },
  } = req.body;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!reservation_date || !dateRegex.test(reservation_date)) {
    return next({
      status: 400,
      message:
        "Invalid reservation_date format. Please use the YYYY-MM-DD format.",
    });
  }

  return next();
}

function validateFutureDate(req, res, next) {
  const {
    data: { reservation_date },
  } = req.body;
  const selectedDate = new Date(reservation_date);
  const currentDate = new Date();
  if (selectedDate < currentDate) {
    return next({
      status: 400,
      message: "Reservation date must be in the future.",
    });
  }
  return next();
}

function validateIsNotTuesday(req, res, next) {
  const {
    data: { reservation_date },
  } = req.body;
  const selectedDate = new Date(reservation_date);
  if (selectedDate.getDay() === 1) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesdays.",
    });
  }
  return next();
}

// time is valid

function validateTime(req, res, next) {
  const {
    data: { reservation_time },
  } = req.body;
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!reservation_time || !timeRegex.test(reservation_time)) {
    return next({
      status: 400,
      message: "Invalid reservation_time format. Please use the HH:mm format.",
    });
  }

  return next();
}

// validate reservation time is between 10:30 AM and 9:30 PM

function validateReservationTime(req, res, next) {
  const {
    data: { reservation_time },
  } = req.body;

  const isValidTime = isTimeValid(reservation_time);

  if (!isValidTime) {
    return next({
      status: 400,
      message: "Invalid reservation_time. Please select a time between 10:30 AM and 9:30 PM.",
    });
  }

  return next();
}

function isTimeValid(reservation_time) {
  const openingTime = "10:30";
  const closingTime = "21:30";

  const selectedTime = new Date(`2000-01-01T${reservation_time}`);
  const openingDateTime = new Date(`2000-01-01T${openingTime}`);
  const closingDateTime = new Date(`2000-01-01T${closingTime}`);

  return selectedTime >= openingDateTime && selectedTime <= closingDateTime;
}

// people is a number over 0

function validatePeople(req, res, next) {
  const {
    data: { people },
  } = req.body;

  if (typeof people !== "number" || people <= 0) {
    return next({
      status: 400,
      message: `Property 'people' must be a number greater than 0.`,
    });
  }

  return next();
}

// CRUD operations

async function create(req, res) {
  const { data } = req.body;
  await reservationsService.create(data);
  res.status(201).json({ data });
}

function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
}

/**
 * List handler for reservation resources
 */

async function list(req, res) {
  const date = req.query.date;
  const data = await reservationsService.list(date);
  data.sort((A, B) => {
    const timeA = A.reservation_time;
    const timeB = B.reservation_time;
    return timeA.localeCompare(timeB);
  });
  res.json({
    data,
  });
}

module.exports = {
  create: [
    validateReservationData,
    validateReservationProperties,
    validateDateFormat,
    validateFutureDate,
    validateIsNotTuesday,
    validateTime,
    validateReservationTime,
    validatePeople,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  list: asyncErrorBoundary(list),
};
