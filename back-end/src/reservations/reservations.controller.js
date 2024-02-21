const service = require("./reservations.service");

async function create(req, res, next) {
  try {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({ data });
}

function isTuesday(date) {
  return date.getDay() === 2; // Day of week, where 0 is Sunday and 2 is Tuesday
}

function isInThePast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Remove time part
  return date < today;
}

// Validation function for reservation data
function hasRequiredFields(req, res, next) {
  const { data = {} } = req.body;
  const requiredFields = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  for (let field of requiredFields) {
    if (!data[field]) {
      return next({
        status: 400,
        message: `Field required: ${field}`,
      });
    }
  }

  //  validation for reservation_date
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.reservation_date)) {
    return next({
      status: 400,
      message: `Invalid date format: reservation_date`,
    });
  }

  //  validation for reservation_time
  if (!/^\d{2}:\d{2}$/.test(data.reservation_time)) {
    return next({
      status: 400,
      message: `Invalid time format: reservation_time`,
    });
  }

  // Example validation for people
  if (typeof data.people !== "number" || data.people < 1) {
    return next({
      status: 400,
      message: `Invalid number of people: people`,
    });
  }

  function isDateInFuture(dateString) {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Consider only the date part
    const reservationDate = new Date(dateString + "T00:00:00Z"); // Set to UTC midnight

    return reservationDate >= today;
  }

  function isNotTuesday(dateString) {
    const reservationDate = new Date(dateString + "T00:00:00Z"); // Set to UTC midnight
    return reservationDate.getUTCDay() !== 2; // 2 represents Tuesday
  }

  next();
}

function validateReservationDate(req, res, next) {
  const { reservation_date } = req.body.data;
  const reservationDate = new Date(reservation_date + "T00:00:00"); // Ensuring the date is treated as local

  const errors = [];
  if (isTuesday(reservationDate)) {
    errors.push("The restaurant is closed on Tuesdays.");
  }

  if (isInThePast(reservationDate)) {
    errors.push("Reservations must be made for a future date."); // Updated error message
  }

  if (errors.length) {
    return next({ status: 400, message: errors.join(" ") });
  }

  next();
}

module.exports = {
  create: [hasRequiredFields, validateReservationDate, create],
  list,
};
