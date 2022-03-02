const service = require("./reservations.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// VALIDATION FUNCTIONS FOR CONTROLLER MAIN FUNCTIONS
// Checks if a key exists, returns error if it doesn't.
const exists = (key) => {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[key]) return next();
    else return next({status: 400, message: `A valid "${key}" property is required.`})
  }
}

// Checks that the reservation's date and time are not an invalid date or time.
const dateTimeValid = (req, res, next) => {
  const { data: { reservation_date, reservation_time } = {} } = req.body;
  const reservation = new Date(`${reservation_date}T${reservation_time}Z`);
  const now = new Date();
  const splitTime = reservation_time.split(":");
  const hour = splitTime[0];
  const minute = splitTime[1];
  if (reservation_date === "not-a-date") next({status: 400, message:`reservation_date not a valid date.`});
  else if (reservation_time === "not-a-time") next({status: 400, message:`reservation_time not a valid time.`})
  else if (reservation.getUTCDay() === 2) next({status: 400, message:`Your reservation cannot be on a Tuesday (closed).`})
  else if (reservation < now) next({status: 400, message:`Your reservation must be in the future.`})
  else if (hour < 10 || hour > 21 || (hour == 10 && minute < 30) || (hour == 21 && minute > 30)) next({status: 400, message:`Your reservation time must be between 10:30 AM and 9:30 PM`})
  else next();
}

// Checks that the people key is a number greater than 0
const validPeople = (req, res, next) => {
  const { data: { people } = {} } = req.body;
  if (people <= 0 || typeof(people) !== "number") next({status: 400, message:`The people property is invalid.`});
  else next();
}

// If the query includes a date, list reservations for that date or list nothing.
async function queryInput(req, res, next) {
  const { date } = req.query;
  if (date) {
    const reservations = await service.list(date);
    if (reservations.length) {
      res.locals.reservations = reservations;
      next();
    } else {
      res.locals.reservations = [];
      next();
    }
  }
}


// CONTROLLER MAIN FUNCTIONS FOR ROUTER
async function list(req, res, next) {
  res.json({ data: res.locals.reservations });
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({data});
}

module.exports = {
  list: [
    asyncErrorBoundary(queryInput),
    asyncErrorBoundary(list)
  ],
  create: [
    exists("first_name"),
    exists("last_name"),
    exists("mobile_number"),
    exists("reservation_date"),
    exists("reservation_time"),
    exists("people"),
    asyncErrorBoundary(dateTimeValid),
    asyncErrorBoundary(validPeople),
    asyncErrorBoundary(create)
  ]
};
