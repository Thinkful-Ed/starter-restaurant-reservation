const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bodyDataHas = require("../errors/bodyDataHas");


/*
*** VALIDATION ***
*/

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);

  console.log("reservations.controller resser id: ", reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `Reservation with ID: ${reservation_id} cannot be found` });
}

function validatePeople(req, res, next) {
  const { data } = req.body;
  return typeof data.people !== "number" ? next({ status: 400, message: `people must be a number` }) : next();
}

function validStatusChange(req, res, next) {
  const statuses = ["booked", "seated", "finished", "cancelled"];
  const { status } = req.body.data;
  const currentStatus = res.locals.reservation.status;
  return statuses.includes(status) && currentStatus !== "finished" ? next() : next({ status: 400, message: `Current status must not be finished, cancelled, nor unknown. Only reservations with current status of 'booked' may be updated. New status must be one of the following valid statuses: ${statuses.join(", ")}` });
}

function validInitialStatus(req, res, next) {
  const { data } = req.body;
  return data.status && data.status !== "booked" ? next({ status: 400, message: `Reservation status may not be 'finished', 'seated', nor 'cancelled.` }) : next();
}

function validUpdateStatus(req, res, next) {
  const { status } = res.locals.reservation;
  return status !== "booked" ?
    next({ status: 400, message: "Only reservations with current status of 'booked' may be updated." })
    :
    next();
}

function validDate(req, res, next) {
  const { data } = req.body;
  const regexDate = /^\d{4}-\d{2}-\d{2}$/;
  const today = new Date();
  const reservationDate = new Date(data["reservation_date"]);

  if (data.reservation_date.match(regexDate) === null) {
    return next({ status: 400, message: `reservation_date must be a valid date` })
  }
  if (today > reservationDate.getTime() && reservationDate.getDay() === 1) {
    return next({
      status: 400,
      message: `Reservation date/time must occur in the future|The restaurant is closed on Tuesday.`
    });
  } else if (today > reservationDate) {
    return next({ status: 400, message: "Reservation date/time must occur in the future" })
  } else if (reservationDate.getDay() == 1) {
    return next({
      status: 400, message: `The restaurant is closed on Tuesday`
    })
  }
  next();
}

function validateTime(req, res, next) {
  const { data } = req.body;
  const time = data.reservation_time;
  const regexTime = /([0-1]?\d|2[0-3]):([0-5]?\d):?([0-5]?\d)/;

  const date = new Date(`${data.reservation_date}, ${data.reservation_time}`);
  const minutes = date.getHours() * 60 + date.getMinutes();
  const startingMinutes = 630;
  const endingMinutes = 1290;


  if (time.match(regexTime) === null) {
    return next({ status: 400, message: `reservation_time must be a valid time` });
  }
  if (minutes < startingMinutes || minutes > endingMinutes) {
    return next({ status: 400, message: `Please select a time between 10:30 AM and 9:30 PM` })
  }
  next();
}


/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date, mobile_number } = req.query;

  if (date) {
    const data = await service.readByDate(date);
    res.json({ data });
  } else if (mobile_number) {
    const data = await service.readByMobileNumber(mobile_number);
    res.json({ data });
  }
  else {
    const data = await service.list();
    res.json({ data });
  }
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

function read(req, res) {
  res.status(200).json({ data: res.locals.reservation });
}

async function updateStatus(req, res) {
  console.log("reservations.controller req.body.data:", req.body.data);
  const { status } = req.body.data;
  const updatedReservation = {
    ...res.locals.reservation,
    status
  }
  const data = await service.update(updatedReservation);
  // res.json({data: {status: data.status}});
  res.json({ data });
}

async function updateReservation(req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id
  }
  const data = await service.update(updatedReservation);
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    validatePeople,
    validDate,
    validateTime,
    validInitialStatus,
    asyncErrorBoundary(create)],
  read: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(read)
  ],
  updateStatus: [
    bodyDataHas("status"),
    asyncErrorBoundary(reservationExists),
    validStatusChange,
    asyncErrorBoundary(updateStatus)
  ],
  update: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    asyncErrorBoundary(reservationExists),
    validatePeople,
    validDate,
    validateTime,
    validUpdateStatus,
    asyncErrorBoundary(updateReservation)
  ]
};
