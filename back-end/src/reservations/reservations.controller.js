const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);
/**
 * List handler for reservation resources
 */

// It's in the middle; makes appropriate checks then returns next() to proceed to next step;
function isValid(req, res, next) {
  const date = req.body.data.reservation_date;
  const time = req.body.data.reservation_time;
  const { people } = req.body.data;
  const parsedDate = Date.parse(date);
  const dateRegex = /\d{4}-\d{2}-\d{2}/;
  const timeRegex = /[0-9]{2}:[0-9]{2}/;

  if (isNaN(parsedDate) || !date.match(dateRegex)) {
    next({
      status: 400,
      message: `Invalid reservation_date.`,
    });
  }

  if (parsedDate < Date.now()) {
    next({ status: 400, message: `Reservation_date must be in the future.`})
  }

  if (new Date(date).getUTCDay() === 2) {
    next({ status: 400, message: `Restaurant is closed on Tuesday.`})
  }

  if (!time.match(timeRegex)) {
    next({
      status: 400,
      message: `Invalid reservation_time.`,
    });
  }

  if (typeof people !== "number" || !people.length > 1) {
    next({ status: 400, message: `people must be a number.` });
  }

  if (date )

  next();
}

async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({ data });
}

async function create(req, res) {
  const reservation = req.body.data;
  const data = await service.create(reservation);
  return res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasRequiredProperties, isValid, asyncErrorBoundary(create)],
};
