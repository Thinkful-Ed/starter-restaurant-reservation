/**
 * List handler for reservation resources
 */

//Imports for our controller
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

function validateDateAndTime(req, res, next) {
  const date = req.body.data.reservation_date;
  const time = req.body.data.reservation_time;
  if (Date.parse(`${date} ${time}`)) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_date and reservation_time must be valid`,
  });
}

function peopleIsNumber(req, res, next) {
  const people = req.body.data.people;
  if (typeof people === "number") {
    return next();
  }
  next({ status: 400, message: `people must be number` });
}

function dateInFuture(req, res, next) {
  const date = req.body.data.reservation_date;
  const time = req.body.data.reservation_time;
  const current = new Date();
  if (Date.parse(`${date} ${time}`) > current) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_date and reservation_time must be in the future",
  });
}

function dateNotTuesday(req, res, next) {
  const date = req.body.data.reservation_date;
  const time = req.body.data.reservation_time;
  const current = new Date(`${date} ${time}`);
  if (current.getDay() === 2) {
    return next({ status: 400, message: "Restaurant is closed on Tuesdays" });
  }
  next();
}

async function list(req, res) {
  const date = req.query.date;
  const data = await service.list(date);
  res.json({
    data,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    validateDateAndTime,
    dateNotTuesday,
    dateInFuture,
    peopleIsNumber,
    asyncErrorBoundary(create),
  ],
};
