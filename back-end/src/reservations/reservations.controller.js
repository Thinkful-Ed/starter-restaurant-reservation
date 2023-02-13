const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

onst REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];


//list route handler
async function list(req, res) {
  res.json({
    data: [],
  });
}

//create route handler
async function create(req, res) {
  const data = await service.create(res.locals.data);
  res.status(201).json({ data });
}

//read route handler
async function read(req, res) {
  const { reservation_id } = req.params;
  const data = await service.read(reservation_id);
  res.json({
    data,
  });
}

//update route handler for res data
async function update(req, res) {
  const data = await service.update(req.params.reservation_id, req.body.data);
  res.json({
    data,
  });
}

//update route handler for res status
async function updateStatus(req, res) {
  const data = await service.updateStatus(
    req.params.reservation_id,
    req.body.data
  );
  res.json({
    data,
  });
}

//check reservation data for valid properties
async function validateProperties(req, res, next) {
  const {
    data: { reservation_date, reservation_time, people, status },
  } = res.locals
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
      const error = new Error(`people must be a number`);
      error.status = 400;
      throw error;
    }

    if (people < 1) {
      const error = new Error(`people must be at least 1`);
      error.status = 400;
      throw error;
    }

    if (status && status !== "booked") {
      const error = new Error(`status must be "booked", received: ${status}`);
      error.status = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}

//check date for valid format
function validateDate(date) {
  let date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  return date_regex.test(date);
}

//check res for valid time
function validateTime(time) {
  let time_regex = /^(2[0-3]|[01][0-9]):[0-5][0-9]$/;
  return time_regex.test(time);
}

//check if res date is valid
function validateReservationDate(req, res, next) {
  const {
    data: { reservation_date, reservation_time },
  } = res.locals;

  const reservationDate = new Date(
    `${reservation_date}T${reservation_time}:00`
  );

  try {
    if (Date.now() > Date.parse(reservationDate)) {
      const error = new Error(`Reservation must be for a future date or time.`);
      error.status = 400;
      throw error;
    }
    if (reservationDate.getDay() == 2) {
      const error = new Error(`Periodic Tables is closed on Tuesdays. Sorry!`);
      error.status = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}

//check res for valid time
function validateReservationTime(req, res, next) {
  const {
    data: { reservation_time },
  } = res.locals;

  const [hours, minutes] = reservation_time.split(":");

  try {
    if ((hours <= 10 && minutes < 30) || hours <= 9) {
      const error = new Error(`Periodic Tables opens at 10:30 AM.`);
      error.status = 400;
      throw error;
    }
    if ((hours >= 21 && minutes > 30) || hours >= 22) {
      const error = new Error(
        `Periodic Tables stops accepting reservations at 9:30 PM.`
      );
      error.status = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}

//check if reservation exists before update
async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `Reservation cannot be found : ${req.params.reservation_id}`,
  });
}

//check if res status is valid
async function validStatus(req, res, next) {
  const validStatuses = ["booked", "seated", "finished", "cancelled"];
  const { status } = req.body.data;
  if (status && validStatuses.includes(status)) {
    return next();
  } else {
    return next({
      status: 400,
      message: `Invalid Status: ${status}`,
    });
  }
}

//prevent completed res from being updated
async function notFinished(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    return next({
      status: 400,
      message: `a finished reservation cannot be updated`,
    });
  }
  next();
}


module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasProperties(...REQUIRED_PROPERTIES),
    asyncErrorBoundary(validateProperties),
    validateReservationDate,
    validateReservationTime,
    asyncErrorBoundary(create),
  ],
  read: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(read)
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasProperties(...REQUIRED_PROPERTIES),
    asyncErrorBoundary(validateProperties),
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(notFinished),
    asyncErrorBoundary(validStatus),
    asyncErrorBoundary(updateStatus),
  ],
};