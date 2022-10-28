const services = require("./reservations.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const P = require("pino");

/**
 * List handler for reservation resources
 */

const VALID_PROPERTIES = ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"];

const hasRequiredProperties = hasProperties(VALID_PROPERTIES);

const hasOnlyValidProperties = (req, res, next) => {
  const { data = {} } = req.body;
  const properties = Object.keys(data);
  const invalid = properties.filter(prop => !VALID_PROPERTIES.includes(prop));
  if (invalid.length) {
    next({ status: 400, message: `Invalid fields: ${invalid.join(", ")}` });
  } else {
    next();
  }
}
// 

function isDate(req, res, next) {
  const { data: { reservation_date } } = req.body;
  if (/\d{4}-\d{2}-\d{2}/.test(reservation_date)) {
    next();
  } else {
    next({status: 400, message: "reservation_date must be of date type with YYYY-MM-DD format"});
  }
}

function isNumber(req, res, next) {
  const { data: {people} } = req.body;
  if (typeof(people) === "number") {
    next();
  } else {
    next({status: 400, message: "people must be of number type"});
  }
}

function isTime(req, res, next) {
  const { data: { reservation_time } } = req.body;
  if (/\d{2}:\d{2}/.test(reservation_time) || /\d{2}:\d{2}:\d{2}/.test(reservation_time)) {
    next();
  } else {
    next({status: 400, message: "reservation_time must be of time type with HH:MM or HH:MM:SS format"});
  }
}

function getDate() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
}

async function create(req, res) {
  const data = await services.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await services.list(req.query.date ? req.query.date : getDate());
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasOnlyValidProperties, hasRequiredProperties, isDate, isTime, isNumber, asyncErrorBoundary(create)],
};
