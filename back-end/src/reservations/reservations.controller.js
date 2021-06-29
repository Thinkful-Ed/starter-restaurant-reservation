const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


//validation for empty fields

function isValidReservation(req, res, next) {
  const requiredFields = [
    "first_name", 
    "last_name", 
    "mobile_number", 
    "reservation_date", 
    "reservation_time",
    "people"
  ]
  if (!req.body.data) {
     return next({
      status: 400,
      message: `Can not submit empty form.`,
    });
  }
  for (const field of requiredFields) {
    if (!req.body.data[field]) {
       return next({
        status: 400,
        message: `Order must include a ${field}`,
      });
    }
  }
  next();
}

function isPartyValid(req, res, next) {
  const { people } = req.body.data;
  if (!(typeof(people) === "number") || people <= 0) {
    return next({
      status: 400,
      message: `Number of people must be a number greater than zero.`
    });
  }
  next();
}

function dateFormatValidation(req, res, next) {
  const { reservation_date } = req.body.data; 
  if (reservation_date.match(/^\d{4}-\d{2}-\d{2}$/) === null) {
    return next({
      status: 400,
      message: `The reservation_date must be in YYYY-MM-DD format.`
    })
  }
  next();
}

  function isNotTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const date = new Date(reservation_date + "T12:00:00")
  const day = date.getDay();
  if (day === 2) {
    return next({
      status: 400,
      message: `Reservation must be in the future. Restaurant is closed on Tuesdays.`
    })
  }
  next();
}

function isFutureDate(req, res, next) {
  const { reservation_date } = req.body.data;
  const current = Date.now();
  const selected = Date.parse(reservation_date);
  if (current - selected >= 0) {
    return next({
      status: 400,
      message: `Reservation must be in the future. Restaurant is closed on Tuesdays.`
    })
  }
  next();
}

function timeFormatValidation(req, res, next) {
    const { reservation_time } = req.body.data; 
    if (reservation_time.match(/^\d{1,2}:\d{2}([ap]m)?$/) === null) {
      return next({
        status: 400,
        message: `The reservation_time must be in HH:MM format.`
      })
    }
    next();
}

function isAfterOpen(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const momentOfOpening = new Date(`${reservation_date}T10:30`)
  const openingTime = momentOfOpening.getTime()
  const momentOfReservation = new Date(`${reservation_date}T${reservation_time}`);
  const reservationTime = momentOfReservation.getTime();
  const difference = reservationTime - openingTime
  if (difference < 0) {
    return next({
      status: 400,
      message: `The reservation_time must be at or after 10:30AM.`
    })
  }
  next();
}

function isBeforeClose(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const momentOfClosing = new Date(`${reservation_date}T21:30`)
  const closingTime = momentOfClosing.getTime()
  const momentOfReservation = new Date(`${reservation_date}T${reservation_time}`);
  const reservationTime = momentOfReservation.getTime();
  const difference = closingTime - reservationTime;
  if (difference < 0) {
    return next({
      status: 400,
      message: `The reservation_time must be at or before 09:30PM.`
    })
  }
  next();
}

function isFutureTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const presentMoment = Date.now();
  const reservationMoment = new Date(`${reservation_date}T${reservation_time}`)
  const reservationTime = reservationMoment.getTime();
  const difference = presentMoment - reservationTime;
  if (difference >= 0) { 
    return next({
      status: 400,
      message: `Reservation time must be in the future.`
    })
  }
  next();
}


async function create(req, res) {
  let reservation = req.body.data;
  let result = await reservationsService.create(reservation);
  res.status(201).json({data: result[0]});
}
/**
 * List handler for reservation resources
 */
// List handler for reservation resources
async function list(req, res) {
  const { date } = req.query;
  const reservationsByDate = await reservationsService.list(date);
  res.json({
    data: reservationsByDate,
  });
}

module.exports = {
  list: asyncErrorBoundary(list), 
  create: [isValidReservation, isPartyValid, dateFormatValidation, isNotTuesday, isFutureDate,  timeFormatValidation, isAfterOpen, isBeforeClose, isFutureTime, asyncErrorBoundary(create)]
}
