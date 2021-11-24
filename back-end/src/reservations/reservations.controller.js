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
function isValidDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const { people } = req.body.data;
  const parsedDate = Date.parse(date);
  const dateRegex = /\d{4}-\d{2}-\d{2}/;

  if (isNaN(parsedDate) || !date.match(dateRegex)) {
    next({
      status: 400,
      message: `Invalid reservation_date.`,
    });
  }

  if (parsedDate < Date.now()) {
    next({
      status: 400,
      message: `Reservation date must be placed in the future.`,
    });
  }

  if (new Date(date).getUTCDay() === 2) {
    next({ status: 400, message: `Restaurant is closed on Tuesday.` });
  }

  if (typeof people !== "number" || people.length < 2) {
    next({
      status: 400,
      message: `You submitted ${people.length} people in your party. There must be at least 2 people per party.`,
    });
  }

  next();
}

function isValidTime(req, res, next) {
  const time = req.body.data.reservation_time;
  const timeRegex = /[0-9]{2}:[0-9]{2}/;
  const [hours, minutes] = time.split(":");

  if (!time.match(timeRegex)) {
    next({
      status: 400,
      message: "Invalid reservation_time.",
    });
  }

  if (hours <= 10 && minutes < 30) {
    next({
      status: 400,
      message: `Restaurant opens at 10:30 AM.`,
    });
  }

  if (hours >= 21 || (hours === 20 && minutes >= 30)) {
    next({
      status: 400,
      message: `Reservations close at 9:30 PM.`,
    });
  }
  next();
}

async function list(req, res, next) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({ data });
}

async function create(req, res, next) {
  const reservation = req.body.data;
  const reservationTime = req.body.data.reservation_time;
  const data = await service.create(reservation);
  if (reservationTime.length > 1) {
    next({
      status: 400,
      message: "Reservation_time is not available.",
    });
  }
  res.status(201).json({ data });
}

async function read(req, res) {
	const data = res.locals.reservation;
	res.json({ data });
}



module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasRequiredProperties,
    isValidDate,
    isValidTime,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(read)],
  
};
