const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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
  res.status(201).json(res.locals.reservation);
}

async function create(req, res, next) {
  const reservation = await service.create(req.body.data);
  res.status(201).json({ data: reservation[0] });
}

// async function destroy(req, res){
//   const {reservation_id} = req.body.data
//   await service.destroy(reservation_id)
//   res.sendStatus(204)
// }

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasValidProperties(req, res, next) {
  const { data = {} } = req.body;

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

function bodyDataHas(property) {
  return (req, res, next) => {
    const { data = {} } = req.body;
    if (data[property]) {
      return next();
    }
    next({
      status: 400,
      message: `ERROR: Request must have a: ${property}.`,
    });
  };
}

const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
const timeFormat = /^\d\d:\d\d$/;

function dateIsValid(dateString) {
  return dateString.match(dateFormat)?.[0];
}

function timeIsValid(timeString) {
  return timeString.match(timeFormat)?.[0];
}

function hasValidPropertyValue(req, res, next) {
  const {
    data: { reservation_time, reservation_date, people },
  } = req.body;

  if (typeof people !== "number") {
    next({
      status: 400,
      message: `The value: "${people}", must be a number.`,
    });
  }

  if(people === ''){
    next({
      status: 400,
      message: `The value: "${people}", must contain a number.`,
    });
  }

  if(people === 0){
    next({
      status: 400,
      message: `The value: "${people}", must be larger than 0.`,
    });
  }

  if(!timeIsValid(reservation_time)){
    next({
      status: 400,
      message: `The time: ${reservation_time} is not valid. Must be "HH:MM".`
    })
  }

  if(!dateIsValid(reservation_date)){
    next({
      status: 400,
      message: `The date: ${reservation_date} is not valid. Must be "YYYY-MM-DD".`
    })
  }
  next()
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
    asyncErrorBoundary(create),
  ],
  // destroy: [asyncErrorBoundary(destroy)]
};
