const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const missingFields = require("../errors/missingFields");

//========validation========//
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

//validate that alll fields are filled and entered correctly
const hasRequiredFields = missingFields(...requiredFields);

//check if reservation exists for read
async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const foundReservation = await reservationsService.read(reservationId);
  if (foundReservation) {
  res.locals.foundReservation = foundReservation;
  return next();
  }else{
    return next({
      status: 404,
      message: `Reservation with id: ${reservationId} was not found`,
    });
  }
}

function dateNotTuesday(reservation_date) {
  const date = new Date(reservation_date);
  return date.getUTCDay() !== 2;
}

function businessHours(reservation_time) {
  return reservation_time >= "10:30" && reservation_time <= "21:30";
}



function dateIsValid(date) {
  return date.match(dateFormat);
}


async function validateData(req, res, next) {
  if (!req.body.data) {
    return next({ status: 400, message: "Body must include a data object" });
  }else{
  next();
  }
}

function hasValidFields(req, res, next) {
  const { reservation_date, reservation_time, people } = req.body.data;
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
  // if(reservation_date === ""){
  //   return next({
  //     status: 400,
  //     message: "reservation_date required.",
  //   });
  // }
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
      message:
        "Please enter number of people.",
    });
  }
  if (!dateNotTuesday(reservation_date)) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesdays",
    });
  }
  next();
}

async function updateStatus(req, res) {
  const newStatus = req.body.data.status;
  const { foundReservation } = res.locals.foundReservation;
  const resObject = foundReservation.find((reservation)=> reservation)
  res.status(200).json({ data: { status: newStatus } });
}

async function read(req, res) {
  const { reservationId } = req.params;
  res.json({ data: await reservationsService.read(reservationId) });
}

async function update(req, res) {
  const resObject = res.locals.foundReservation.find((reservation)=> reservation)
  res.json({data: await reservationsService.update(
    resObject.reservation_id,
    req.body.data.status)});
  }

async function list(req, res) {
  const resDate = req.query.date;
  res.json({ data: await reservationsService.list(resDate) });
}

async function create(req, res) {
  res
    .status(201)
    .json({ data: await reservationsService.create(req.body.data) });
}

module.exports = {
  list: [ asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(validateData), hasRequiredFields, hasValidFields, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(validateData), asyncErrorBoundary(update)],
  updateReservationStatus: [
    asyncErrorBoundary(updateStatus),
  ],
};
