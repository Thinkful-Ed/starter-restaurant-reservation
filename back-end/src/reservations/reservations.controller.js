const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
//========validation========//
const requiredFields = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

//validate that alll fields are filled and entered correctly
// async function hasValidFields(res, req, next) {
//   for (const field of requiredFields) {
//     if (!req.body.data.hasOwnProperty(field) || req.body.data === "") {
//       next({ status: 400, message: `${field} field is required` });
//     }
//   }
//   //mobile number must be in correct format
//   //date must be a future date
//   //number of people must be a number greater than 0
//   //res time must be between certain hours
// }

//check if reservation exists for read
async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const foundReservation = await reservationsService.read(reservationId);
  if (!foundReservation) {
    return next({
      status: 404,
      message: `Reservation with id: ${reservationId} was not found`,
    });
  }
  res.locals.foundReservation = foundReservation;
  return next;
}

function dateNotTuesday(reservation_date) {
  const date = new Date(reservation_date);
  return date.getUTCDay() !== 2;
}

function businessHours(reservation_time) {
  return reservation_time >= "10:30" && reservation_time <= "21:30";
}


function hasValidFields(req, res, next) {
  const { first_name, last_name, mobile_number, reservation_date, reservation_time, people, status } = req.body.data;
console.log("Look for people", req.body.data)
  const presentTime = Date.now();
  const requestedTime = new Date(`${reservation_date} ${reservation_time}`);
  const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;

  //validate that reservation time is in the future
  if (requestedTime < presentTime) {
    return next({ status: 400, message: "Reservation must be in the future." });
  }
  //validate date is in correct format
  if (!reservation_date.match(dateFormat)) {
    return next({
      status: 400,
      message: "Please enter a date. Date format must be DD-MM-YYYY.",
    });
  }
  //validate that reservation is made during business hours
  if (!businessHours(reservation_time)) {
    return next({
      status: 400,
      message: "The reservation time must be between 10:30 AM and 9:30 PM",
    });
  }
  //validate that party size is greater than zero
  if (people < 1) {
    return next({
      status: 400,
      message:
        "Please enter number of guests. Must be a number greater than zero.",
    });
  }
  if (!dateNotTuesday(reservation_date)) {
    return next({
      status: 400,
      message:
        "The restaurant is closed on Tuesdays",
    });
  }
  if (!first_name || !last_name){
    next({
      status: 400,
      message: "Please enter your first and last name.",
    })
  }
  if (!mobile_number){
    next({
      status: 400,
      message: "Please enter your phone number.",
    })
  }
  next();
}

async function read(req, res) {
  const { reservationId } = req.params;
  res.json({ data: await reservationsService.read(reservationId) });
}

async function list(req, res) {
  const date = req.query.date;
  res.json({ data: await reservationsService.list(date) });
}

async function create(req, res) {
  //console.log("Request Body",req.body.data) testing***
  res
    .status(201)
    .json({ data: await reservationsService.create(req.body.data) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasValidFields, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
};
