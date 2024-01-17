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
];

function isValidTimeMiddleware(req, res, next) {
  const { data = {} } = req.body;
  const { reservation_time } = data;

  if (reservation_time && !isValidTime(reservation_time)) {
    return next({
      status: 400,
      message: `Invalid field: reservation_time. Must be a valid time in the format HH:mm.`,
    });
  }
  next();
}

function isValidTime(timeString) {
  const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // Time format HH:mm
  return regex.test(timeString);
}

function isValidDateMiddleware(req, res, next) {
  const { data = {} } = req.body;
  const { reservation_date } = data;

  if (reservation_date && !isValidDate(reservation_date)) {
    return next({
      status: 400,
      message: `Invalid field: reservation_date. Must be a valid date in the format YYYY-MM-DD.`,
    });
  }
  next();
}

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Date format YYYY-MM-DD
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function isValidNumber(req, res, next) {
  const { data = {} } = req.body;
  const { people } = data;
  if (!Number.isInteger(people)) {
    return next({
      status: 400,
      message: `Invalid field: people. Must be a valid number.`
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



async function list(req, res) {
  const { date } = req.query;
  let data;
  if (date) {
    data = await reservationsService.listByDate(date);
  }
  res.json({ data });
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  reservation.reservation_id++;
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    isValidDateMiddleware,
    isValidTimeMiddleware,
    isValidNumber,
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
};
