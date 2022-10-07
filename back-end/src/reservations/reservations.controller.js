const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../utils/hasProperties");

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const today = new Date().toLocaleDateString().replaceAll("/", "-");
  const { date = today } = req.query;
  const reservations = await service.list(date);
  res.json({
    data: [...reservations],
  });
}

async function create(req, res) {
  const data = await service.create(res.locals.reservation);
  res.status(201).json({ data });
}

async function read(req, res) {
  res.json({
    data: [],
  });
}

async function validateProperties(req, res, next) {
  const {
    reservation: { reservation_date, reservation_time, people },
  } = res.locals;
  try {
    if (!validateDate(reservation_date)) {
      const error = new Error(
        `'${reservation_date}' is invalid 'reservation_date' format. Use YYYY-MM-DD`
      );
      error.status = 400;
      throw error;
    }

    if (!validateTime(reservation_time)) {
      const error = new Error(
        `'${reservation_time}' is invalid 'reservation_time' format. Use HH:MM:SS`
      );
      error.status = 400;
      throw error;
    }

    if (typeof people !== "number") {
      const error = new Error(`'people must be a number`);
      error.status = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}

// put in utils
function validateDate(date) {
  let date_regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  return date_regex.test(date);
}

function validateTime(time) {
  let time_regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  return time_regex.test(time);
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasProperties(...REQUIRED_PROPERTIES),
    asyncErrorBoundary(validateProperties),
    asyncErrorBoundary(create),
  ],
  read: asyncErrorBoundary(read),
};
