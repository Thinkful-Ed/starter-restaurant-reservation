const reservationsService = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/**
 * List handler for reservation resources
 */
//create helper functions that returns 400 if data is missing

const requiredFields = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasData(req, res, next) {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: "Data is missing" });
  }

  for (const field of requiredFields) {
    if (!data[field]) {
      return res.status(400).json({ error: `${field} is missing` });
    }

    if (typeof data[field] === "string" && data[field].trim() === "") {
      return res.status(400).json({ error: `${field} cannot be empty` });
    }
  }

  next(); // Proceed to the next middleware
}

function validateReservationDate(req, res, next) {
  const { data } = req.body;
  if (!isNaN(Date.parse(data.reservation_date))) {
    next();
  } else {
    return res.status(400).json({ error: "reservation_date is not a date" });
  }
}

function validateReservationTime(req, res, next) {
  const { data } = req.body;
  const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (timePattern.test(data.reservation_time)) {
    next();
  } else {
    return res.status(400).json({ error: "reservation_time is not a time" });
  }
}

function validatePeople(req, res, next) {
  const { data } = req.body;
  if (typeof data.people === "number" && data.people > 0) {
    next();
  } else {
    return res
      .status(400)
      .json({ error: "people must be a valid positive number" });
  }
}


async function list(req, res) {
	const { date } = req.query;
  const reservations = await reservationsService.list(date);
  res.json({ data: reservations });
}

async function create(req, res) {
	const newReservation = await reservationsService.create(req.body.data);
	res.status(201).json({ data: newReservation});
}


module.exports = {
	list: asyncErrorBoundary(list),
	create: [hasData, validateReservationDate, validateReservationTime, validatePeople, asyncErrorBoundary(create)],
};
