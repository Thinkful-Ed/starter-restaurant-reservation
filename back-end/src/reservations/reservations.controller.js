const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { isValid, parseISO, parse } = require("date-fns");

//Validation middleware

//Validates that new Reservations have the correct properties
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    console.log(req.body);
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName} property.` });
  };
}

//Validates that the inputted date is a real date
function dateIsValid(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;

  if (reservation_date && isValid(parseISO(reservation_date))) {
    return next();
  }
  next({ status: 400, message: `reservation_date` });
}

//Validates that the inputted time is in the correct format
function timeIsValid(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;

  //Regex to ensure the right format
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (reservation_time && regex.test(reservation_time)) {
    return next();
  }

  next({ status: 400, message: `reservation_time` });
}

//Validates that the provided party size, "people", is a legitimate number
function peopleNumberIsValid(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (people <= 0 || !Number.isInteger(people)) {
    return next({
      status: 400,
      message: `people`,
    });
  }

  next();
}

//Validates that the date of the reservation is during open days
function dateIsOpen(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  const day = new Date(reservation_date).getUTCDay();
  console.log("Day:", day);

  if (day !== 2) {
    return next();
  }

  next({
    status: 400,
    message: "Restaurant is closed on Tuesdays, unable to accept reservation.",
  });
}

//Validates that the date of the reservation is not in the past
function dateIsInFuture(req, res, next) {
  const { data: { reservation_date, reservation_time } = {} } = req.body;
  const today = Date.now();
  console.log("Today:", today);
  const date = new Date(`${reservation_date} ${reservation_time}`).valueOf();
  console.log("Date:", date);

  if (date > today) {
    return next();
  }

  next({
    status: 400,
    message: "Reservation date must be in the future.",
  });
}

//Validates that the time of the reservation is during business hours
function isDuringBusinessHours(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  let open = "10:30";
  let close = "21:30";

  if (reservation_time < open || reservation_time > close) {
    return next({
      status: 400,
      message:
        "Reservation must be during our business hours of 10:30AM and 9:30PM.",
    });
  }
  next();
}

//Validates the current status of the reservation
function checkStatus(req, res, next) {
  const { status } = req.body.data;
  if (req.method === "POST" && status && status !== "booked") {
    next({
      status: 400,
      message: `Reservation cannot have status of ${status}.`,
    });
  }
  if (req.method === "PUT" && status && status === "unknown") {
    next({
      status: 400,
      message: "Reservation is an unknown status.",
    });
  }
  return next();
}

//Validates whether or not the status of the reservation is "finished"
function reservationFinished(req, res, next) {
  const { reservation } = res.locals;
  if (reservation && reservation.status !== "finished") {
    return next();
  }
  next({
    status: 400,
    message: "A finished reservation cannot be updated.",
  });
}

//Executive Functions

//Function to verify that a provided reservation ID exists
async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  console.log("Reservation ID:", reservation_id);
  console.log("Reservation information:", reservation);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }

  next({
    status: 404,
    message: `The provided reservation ID: ${reservation_id} does not exist`,
  });
}

//Executive function to read the information of a provided reservation
async function read(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

//Executive Function to list reservations
async function list(req, res) {
  const { date } = req.query;

  if (date) {
    const data = await service.listForDate(date);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

//Executive function to create a new reservation
async function create(req, res) {
  console.log("Request Body:", req.body);
  const newReservation = await service.create(req.body.data);

  console.log(newReservation);
  res.status(201).json({ data: newReservation });
}

//Executive function to update the status of a reservation
async function updateStatus(req, res) {
  const { reservation } = res.locals;
  const newReservation = {
    ...reservation,
    status: req.body.data.status,
  };
  const data = await service.updateStatus(newReservation);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    dateIsValid,
    timeIsValid,
    dateIsOpen,
    dateIsInFuture,
    isDuringBusinessHours,
    peopleNumberIsValid,
    checkStatus,
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    checkStatus,
    reservationFinished,
    asyncErrorBoundary(updateStatus),
  ],
};
