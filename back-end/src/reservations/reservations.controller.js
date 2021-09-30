const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { request } = require("express");

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
async function hasValidFields(res, req, next) {
  if (!req.body.data) {
    return next({
      status: 400,
      message: "Body has no data",
    });
  }

  for (const field of requiredFields) {
    if (!request.body.data.hasOwnProperty(field) || request.body.data === "") {
      return next({ status: 400, message: `${field} field is required` });
    }
  }
  //mobile number must be in correct format
  //date must be a future date
  //number of people must be a number greater than 0
  //res time must be between certain hours
}

//check if reservation exists
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

const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
const timeFormat = /^\d\d:\d\d$/;

function checkReservation(req, res, next) {
  const {
    data: { requiredFields },
  } = req.body;
  if (!first_name || first_name === "") {
    return next({ status: 400, message: "Please enter your first name." });
  }
  if (!last_name || last_name === "") {
    return next({ status: 400, message: "Please enter your last name." });
  }
  if (!mobile_number || mobile_number === "") {
    return next({ status: 400, message: "A mobile number is required." });
  }
  if (!reservation_date || reservation_date === "") {
    return next({
      status: 400,
      message: "Please enter your desired reservation date.",
    });
  }
  if (!reservation_time || reservation_time === "") {
    return next({
      status: 400,
      message: "Please enter your desired reservation time.",
    });
  }
  if (!people || people === "") {
    return next({ status: 400, message: "Please enter number of guests." });
  } else {
    res.locals.foundReservation = {
      reservation_id: nextId(),
      first_name: first_name,
      last_name: last_name,
      mobile_number: mobile_number,
      reservation_date: reservation_date,
      reservation_time: reservation_time,
      people: people,
    };
    next();
  }
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
  res
    .status(201)
    .json({ data: await reservationsService.create(req.body.data) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists),asyncErrorBoundary(read)],
};
