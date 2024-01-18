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

async function validateProperties(req, res, next) {
  const {
    data: { reservation_date, reservation_time, people, status },
  } = res.locals;

  try {
    // validating the reservation date format
    if (!validateDate(reservation_date)) {
      const error = new Error(
        `"${reservation_date}" is invalid. Please use this format: YYYY-MM_DD`
      );
      error.status = 400;
      throw error;
    }

    // validating the reservation time format
    if (!validateTime(reservation_time)) {
      const error = new Error(
        `"${reservation_time}" is invalid. Please use this format: HH:MM:SS`
      );
      error.status = 400;
      throw error;
    }

    // validating the people quantity is a number
    if (typeof people !== "number") {
      const error = new Error(`Reservation people must be a number`);
      error.status = 400;
      throw error;
    }

    // validating that people is 1 or greater
    if (people < 1) {
      const error = new Error(`Reservation must have at least 1 person`);
      error.status = 400;
      throw error;
    }

    // validating the reservation status is booked
    if (status && status !== "booked") {
      const error = new Error("Reservation status must be 'booked'");
      error.status = 400;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
}

// validate functions
function validateDate(date) {
  let date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  return date_regex.test(date);
}

function validateTime(time) {
  let time_regex = /^(2[0-3]|[01][0-9]):[0-5][0-9]$/;
  return time_regex.test(time);
}

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

async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `Reservation was not found : ${req.params.reservation_id}`,
  });
}

async function notFinished(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    return next({
      status: 400,
      message: "a finished reservation cannot be updated",
    });
  }
  next();
}

async function validStatus(req, res, next) {
  const validStatusList = ["booked", "seated", "finished", "cancelled"];
  const { status } = req.body.data;
  if (status && validStatusList.includes(status)) {
    return next();
  } else {
    return next({
      status: 400,
      message: `Invalid Status: ${status}`,
    });
  }
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const today = new Date().toLocaleDateString().split("/").join("-");
  const { date = today, mobile_number } = req.query;
  let reservations;
  if (mobile_number) {
    reservations = await service.search(mobile_number);
  } else {
    reservations = await service.list(date);
  }
  res.json({
    data: [...reservations],
  });
}

async function create(req, res) {
  const data = await service.create(res.locals.data);
  res.status(201).json({ data });
}

async function read(req, res) {
  const { reservation_id } = req.params;
  const data = await service.read(reservation_id);
  res.json({
    data,
  });
}

async function updateStatus(req, res) {
  const data = await service.updateStatus(
    req.params.reservation_id,
    req.body.data
  );
  res.json({
    data,
  });
}

async function update(req, res) {
  const data = await service.update(req.params.reservation_id, req.body.data);
  res.json({
    data,
  });
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
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(notFinished),
    asyncErrorBoundary(validStatus),
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasProperties(...REQUIRED_PROPERTIES),
    asyncErrorBoundary(validateProperties),
    asyncErrorBoundary(update),
  ],
};
