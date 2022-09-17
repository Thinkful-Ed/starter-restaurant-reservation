const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// VALIDATION MIDDLEWARES //

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

function reservationDatePropertyIsValid(req, res, next) {
  const { reservation_date } = req.body.data;
  const dateFormat = /^\d{4}-\d{1,2}-\d{1,2}$/;
  if (dateFormat.test(reservation_date)) {
    return next();
  } else {
    return next({
      status: 400,
      message: `Invalid field: 'reservation_date' must be a valid date.`,
    });
  }
}

function reservationTimePropertyIsValid(req, res, next) {
  const { reservation_time } = req.body.data;
  const timeFormat = /\d\d:\d\d/;
  if (timeFormat.test(reservation_time)) {
    return next();
  } else {
    return next({
      status: 400,
      message: `Invalid field: 'reservation_time' must be a valid date.`,
    });
  }
}

function peoplePropertyIsValid(req, res, next) {
  const { people } = req.body.data;
  if (typeof people === "number") {
    return next();
  } else {
    return next({
      status: 400,
      message: `Invalid field: 'people' must be a positive integer greater than 0.`,
    });
  }
}

// HTTP REQUEST HANDLERS FOR 'RESERVATIONS' RESOURCES //

async function list(req, res) {
  const { date } = req.query;
  if (date) {
    const responseData = await reservationsService.list(date);
    res.status(200).json({ data: responseData });
  } else {
    const today = new Date().toISOString().slice(0, 10);
    const responseData = await reservationsService.list(today);
    res.status(200).json({ data: responseData });
  }
}

async function create(req, res) {
  const newReservation = req.body.data;
  const responseData = await reservationsService.create(newReservation);
  res.status(201).json({ data: responseData });
}

// EXPORTS //

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    reservationDatePropertyIsValid,
    reservationTimePropertyIsValid,
    peoplePropertyIsValid,
    asyncErrorBoundary(create),
  ],
};
