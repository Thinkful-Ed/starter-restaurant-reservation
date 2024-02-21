const service = require("./reservations.service");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');



async function create(req, res, next) {
  const { status } = req.body.data;
  if (status && status !== "booked") {
    return next({ status: 400, message: `Status '${status}' is not allowed upon creation.` });
  }

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


async function read(req, res) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id); // Assuming you have a 'read' method in your service

  if (reservation) {
    return res.json({ data: reservation });
  } else {
    return res.status(404).json({ error: `Reservation not found: ${reservation_id}` });
  }
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
    errors.push("Reservations must be made for a future date."); 
  }

  if (errors.length) {
    return next({ status: 400, message: errors.join(" ") });
  }

  next();
}


function isValidTime(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const reservationTime = new Date();
  reservationTime.setHours(hours, minutes, 0, 0);

  const openingTime = new Date();
  openingTime.setHours(10, 30, 0, 0); // 10:30 AM

  const closingTime = new Date();
  closingTime.setHours(21, 30, 0, 0); // 9:30 PM

  return reservationTime >= openingTime && reservationTime <= closingTime;
}

function isReservationDateTimeInFuture(dateString, timeString) {
  const reservationDateTime = new Date(`${dateString}T${timeString}`);
  return reservationDateTime > new Date();
}


function validateReservationDateTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;

  const errors = [];

  if (!isValidTime(reservation_time)) {
    errors.push("Reservation time must be between 10:30 AM and 9:30 PM.");
  }

  if (!isReservationDateTimeInFuture(reservation_date, reservation_time)) {
    errors.push("Reservation must be set for a future date and time.");
  }

  if (errors.length) {
    return next({ status: 400, message: errors.join(" ") });
  }

  next();
}

async function updateReservationStatus(req, res, next) {
  const { reservation_id } = req.params;
  const { status } = req.body.data;

  const reservation = await service.read(reservation_id);
  if (!reservation) {
    return next({ status: 404, message: `Reservation ${reservation_id} cannot be found.` });
  }

  // Add validation for the new status
  const validStatuses = ['booked', 'seated', 'finished'];
  if (!validStatuses.includes(status)) {
    return next({ status: 400, message: `Status '${status}' is not valid.` });
  }

  if (reservation.status === 'finished') {
    return next({ status: 400, message: 'A finished reservation cannot be updated.' });
  }

  await service.updateStatus(reservation_id, status);
  res.status(200).json({ data: { status } });
}




module.exports = {
  create: [hasRequiredFields, validateReservationDate, validateReservationDateTime, create],
  list,
  read: asyncErrorBoundary(read),
  updateReservationStatus: asyncErrorBoundary(updateReservationStatus),

};
