const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const missingFields = require("../errors/missingFields");

//========middleware========//

//variable to declare required fields
const requiredFields = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

//regex for date format
const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;

//check for all fields to make sure they are present
const hasRequiredFields = missingFields(...requiredFields);

//check that a reservation exists in the API
async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const foundReservation = await reservationsService.read(reservationId);
  if (foundReservation) {
    res.locals.foundReservation = foundReservation;
    return next();
  } else {
    return next({
      status: 404,
      message: `Reservation with id: ${reservationId} was not found`,
    });
  }
}

//check to not allow reservations on Tuesdays
function dateNotTuesday(reservation_date) {
  const date = new Date(reservation_date);
  return date.getUTCDay() !== 2;
}

//check for valid reservation time
function businessHours(reservation_time) {
  return reservation_time >= "10:30" && reservation_time <= "21:30";
}

//check for date format
function dateIsValid(date) {
  return date.match(dateFormat);
}

//check for data in request body
async function validateData(req, res, next) {
  if (!req.body.data) {
    return next({ status: 400, message: "Body must include a data object" });
  } else {
    next();
  }
}

//performs check for valid requests when creating and editing a reservation
function hasValidFields(req, res, next) {
  const { reservation_date, reservation_time, people, status } = req.body.data;
  const partySize = Number.isInteger(people);
  const presentTime = Date.now();
  const requestedTime = new Date(`${reservation_date} ${reservation_time}`);

  //validate that reservation time is in the future
  if (requestedTime < presentTime) {
    return next({
      status: 400,
      message: "reservation_time must be in the future.",
    });
  }
  //is status is seated do not allow edit or update
  if (status === "seated") {
    return next({
      status: 400,
      message: "seated",
    });
  }
  //is status is finished do not allow edit or update
  if (status === "finished") {
    return next({
      status: 400,
      message: "finished",
    });
  }
  //validate date is in correct format
  if (!dateIsValid(reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date format must be YYYY-MM-DD.",
    });
  }
  //validate that reservation is made during business hours
  if (!businessHours(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time must be between 10:30 AM and 9:30 PM",
    });
  }
  //validate that party size is greater than zero
  if (people < 1 || !partySize) {
    return next({
      status: 400,
      message: "Please enter number of people.",
    });
  }
  //do not allow reservations on Tuesdays when restaurant is closed
  if (!dateNotTuesday(reservation_date)) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesdays",
    });
  }
  next();
}

//performs check for valid requests when updating a reservation
function isValidReservation(req, res, next) {
  const { foundReservation } = res.locals;
  const validStatus = ["booked", "seated", "finished", "cancelled"];
  //if the reservation does not exist to not allow update
  if (!foundReservation.reservation_id) {
    return next({
      status: 404,
      message: `reservation_id ${foundReservation.reservation_id} not found`,
    });
  }
  //if status is finished do not allow update
  if (foundReservation.status === "finished") {
    return next({
      status: 400,
      message: "a finished reservation cannot be updated",
    });
  }
  //if data is missing in request do not allow update
  if (!validStatus.includes(req.body.data.status)) {
    return next({
      status: 400,
      message: `status ${req.body.data.status} unknown`,
    });
  }
  next();
}

/*CRUDL*/
//C
async function create(req, res) {
  res
    .status(201)
    .json({ data: await reservationsService.create(req.body.data) });
}
//R
async function read(req, res) {
  const { reservationId } = req.params;
  res.json({ data: await reservationsService.read(reservationId) });
}
//U
async function update(req, res) {
  const { foundReservation } = res.locals;
  console.log("Found", foundReservation);
  await reservationsService.update(
    foundReservation.reservation_id,
    req.body.data.status
  );
  res.status(200).json({ data: { status: req.body.data.status } });
}
//U
async function edit(req, res) {
  const edited = await reservationsService.edit(
    res.locals.foundReservation.reservation_id,
    req.body.data
  );
  res.status(200).json({ data: edited[0] });
}
//L
async function list(req, res) {
  const date = req.query.date;
  const mobile_number = req.query.mobile_number;
  const reservations = await reservationsService.list(date, mobile_number);
  const result = reservations.filter(
    (reservation) => reservation.status !== "finished"
  );
  res.json({ data: result });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(validateData),
    hasRequiredFields,
    hasValidFields,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(validateData),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(isValidReservation),
    asyncErrorBoundary(update),
  ],
  edit: [
    asyncErrorBoundary(validateData),
    asyncErrorBoundary(reservationExists),
    hasRequiredFields,
    hasValidFields,
    asyncErrorBoundary(edit),
  ],
};
