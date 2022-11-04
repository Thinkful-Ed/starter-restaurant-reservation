const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("./reservations.service");

//------------------------ CHECK STATUS ------------------------
//added status
const VALID_FIELDS = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
];

function hasOnlyValidFields(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_FIELDS.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function checkStatus(req, res, next) {
  const { status } = req.body.data;

  if (status === "seated") {
    return next({ status: 400, message: `reservation is seated` });
  }
  if (status === "finished") {
    return next({ status: 400, message: `reservation is finished` });
  }

  next();
}

function checkIfStatusUpdatable(req, res, next) {
  const { status } = req.body.data;

  if (status === "unknown") {
    return next({ status: 400, message: `reservation status is unknown` });
  }

  next();
}

function isCurrentlyFinished(req, res, next) {
  console.log("res.locals.reservation", res.locals.reservation);
  const { status } = res.locals.reservation;

  if (status === "finished") {
    return next({
      status: 400,
      message: `a finished reservation cannot be updated`,
    });
  }
  next();
}
//----------------------------------------------------------------

function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
const timeFormat = /^\d\d:\d\d$/;

function dateIsValid(dateString) {
  return dateString.match(dateFormat)?.[0];
}

function timeIsValid(timeString) {
  return timeString.match(timeFormat)?.[0];
}

function dateNotTuesday(dateString) {
  const date = new Date(dateString);
  return date.getUTCDay() !== 2;
}

function dateNotInPast(dateString, timeString) {
  const today = new Date();
  const reservationDate = new Date(dateString + "T" + timeString);
  return reservationDate > today;
}

function reservationEligibleTime(timeString) {
  const formatTime = timeString.split(":");
  let hour = parseInt(formatTime[0]);
  let minute = parseInt(formatTime[1]);

  const date = new Date();
  const resTimeSec = date.setHours(hour, minute, 0);
  const beforeOpen = date.setHours(10, 30, 0);
  const afterClose = date.setHours(21, 30, 0);
  return resTimeSec < beforeOpen || resTimeSec > afterClose ? false : true;
}

function hasValidValues(req, res, next) {
  const { reservation_date, reservation_time, people } = req.body.data;

  if (!timeIsValid(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time must be in HH:MM:SS format",
    });
  }
  if (!dateIsValid(reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date must be in YYYY-MM-DD format",
    });
  }
  if (typeof people !== "number") {
    return next({
      status: 400,
      message: "people must be a number",
    });
  }
  if (people < 1) {
    return next({
      status: 400,
      message: "# of people must be greater than 1",
    });
  }
  if (!dateNotTuesday(reservation_date)) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesday",
    });
  }
  if (!dateNotInPast(reservation_date, reservation_time)) {
    return next({
      status: 400,
      message: "You must do reservation for future date or time",
    });
  }
  if (!reservationEligibleTime(reservation_time)) {
    return next({
      status: 400,
      message: "Reservation time must be between 10:30 AM and 9:30 PM",
    });
  }
  next();
}

//validation middleware to check if reservation exists
async function reservationExists(req, res, next) {
  console.log(req.params); // example: { reservation_Id: 5 }
  //destructure reservation_Id from req.params
  const { reservation_id } = req.params;
  //reservation is the promise from reservations.service's read
  const reservation = await reservationsService.read(reservation_id);

  //if reservation is true (promise resolves),
  if (reservation) {
    //place reservation in res.locals object for later use
    res.locals.reservation = reservation;
    //move onto next middleware/function
    return next();
  }

  //otherwise, return a 404+msg
  next({
    status: 404,
    message: `The reservation with ID ${reservation_id} does not exist`,
  });
}

//creates a reservation
async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data: data });
}

//lists all reservations given a date query
async function list(req, res) {
  const data = await reservationsService.list(req.query.date);
  res.json({ data });
}

//returns an object for a reservation id
async function read(req, res) {
  const reservation = res.locals.reservation;
  res.json({ data: reservation });
}

async function update(req, res) {
  const { reservation_id } = req.params;
  const { status } = req.body.data;
  const reservation = await reservationsService.update(reservation_id, status);
  res.json({ data: reservation });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    hasOnlyValidFields,
    hasValidValues,
    checkStatus,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationExists),
    checkIfStatusUpdatable,
    isCurrentlyFinished,
    asyncErrorBoundary(update),
  ],
};
