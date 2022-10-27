const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bodyDataHas = require("../validations/bodyDataHas")
async function list(req, res) {
  const { date } = req.query;
  if (!date) {
    return res.status(200).json({ data: await service.list() });
  }

  const foundReservations = await service.listByDate(date);
  foundReservations.sort((a, b) =>
    a.reservation_time < b.reservation_time ? -1 : 1
  );

  res.status(200).json({ data: foundReservations });
}

function read(req, res) {
  res.status(200).json({data: res.locals.reservation});
}

async function create(req, res, next) {
  const reservation = await service.create(req.body.data);
  res.status(201).json({ data: reservation[0] });
}

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasValidProperties(req, res, next) {
  const { data } = res.locals;

  const invalidProperties = Object.keys(data).filter(
    (key) => !VALID_PROPERTIES.includes(key)
  );

  if (invalidProperties.length) {
    return next({
      error: 400,
      message: `Invalid properties: ${invalidProperties.join(", ")}`,
    });
  }
  next();
}

function hasValidPropertyValue(req, res, next) {
  const {
    data: { reservation_time, reservation_date, people },
  } = res.locals;

  const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
  const timeFormat = /^\d\d:\d\d$/;

  function dateIsValid(dateString) {
    return dateString.match(dateFormat)?.[0];
  }

  function timeIsValid(timeString) {
    return timeString.match(timeFormat)?.[0];
  }

  function notWithinHours(time){
    if(time < "10:30" || time > "21:30"){
      return true
    }
    return false
  }

  function dayIsTuesday(date){
    const reservationDate = new Date(date)
    if(reservationDate.getDay() === 1){
      return true
    }
    return false
  }

  const currentDate = new Date()
  const reservationDate = new Date(reservation_date)

  if( currentDate.valueOf() > reservationDate.valueOf()){
    next({
      status: 400,
      message: `The reservation date must be in the future`,
    });
  }

  if(dayIsTuesday(reservation_date)){
    next({
      status: 400,
      message: `Sorry we are closed on Tuesday, please select another day.`,
    });
  }

  if(notWithinHours(reservation_time)){
    next({
      status: 400,
      message: `reservation_time must be a time between 10:30am and 9:30pm.`,
    });
  }

  if (typeof people !== "number") {
    next({
      status: 400,
      message: `The people value must be a number.`,
    });
  }

  if (people === undefined) {
    next({
      status: 400,
      message: `The people value, must contain a number.`,
    });
  }

  if (people === 0) {
    next({
      status: 400,
      message: `The people value must be larger than 0.`,
    });
  }

  if (!timeIsValid(reservation_time)) {
    next({
      status: 400,
      message: `The reservation_time is not valid. Must be "HH:MM".`,
    });
  }

  if (!dateIsValid(reservation_date)) {
    next({
      status: 400,
      message: `The reservation_date is not valid. Must be "YYYY-MM-DD".`,
    });
  }
  next();
}

async function isValidId(req, res, next) {
  const { reservationId } = req.params;

  const reservation = await service.read(reservationId);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ID does not exist: ${reservationId}`,
  });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(isValidId), read],
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    hasValidProperties,
    hasValidPropertyValue,
    asyncErrorBoundary(create),
  ],
  // destroy: [asyncErrorBoundary(destroy)]
};
