/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../../utils/asyncErrorBoundary");

async function list(req, res) {
  const { date } = req.query;
  const today = new Date()
  let data;
  if (date) {
    data = await service.list(date);
  } else {
    data = await service.list(today);
  }
  res.json({ data });
}


function timeValidator(req, res, next) {
  let regEx = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
  const { reservation_time } = req.body.data;
  if (reservation_time == null) {
    return next({
      status: 400,
      message: `reservation_time isn't valid`,
    });
  } else if (regEx.test(reservation_time) == true) {
    return next();
  } else {
    return next({
      status: 400,
      message: `reservation_time isn't valid`,
    });
  }
}

function peopleValidator(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (Number.isInteger(people)) {
    next();
  } else {
    return next({
      status: 400,
      message: `people must be a number`,
    });
  }
}

function dateValidator(req, res, next) {
  const { reservation_date } = req.body.data;
  const date = Date.parse(reservation_date);
  const today = new Date()
  const dayCheck = new Date(reservation_date)
  const day = dayCheck.getDay()
  if (day == 1 && day < today) {
    return next({
      status: 400,
      message: `the restaurant is closed on Tuesdays, and reservation_date must be in the future.`,
    });
  }
  if (day == 1) {
    return next({
      status: 400,
      message: `the restaurant is closed on Tuesdays`,
    });
  } else if (date && date < today) {
    return next({
      status: 400,
      message: `reservation_date must be in the future`,
    });
  } else if (!date || date < 0) {
    return next({
      status: 400,
      message: `reservation_date must be a date`,
    });
  } else {
    return next();
  }
}

function dataExists(req, res, next) {
  const data = req.body.data;
  if (data) {
    next();
  } else {
    next({
      status: 400,
      message: "Request must include data",
    });
  }
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    if (req.body.data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Order must include a ${propertyName}` });
  };
}

async function reservationExists(req, res, next) {
  const currentRes = await service.read(req.params.reservationId);
  if (currentRes) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `Reservation cannot be found.` });
}

async function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  create: [
    asyncErrorBoundary(dataExists),
    asyncErrorBoundary(timeValidator),
    asyncErrorBoundary(peopleValidator),
    asyncErrorBoundary(dateValidator),
    // asyncErrorBoundary(numberValidator),
    asyncErrorBoundary(bodyDataHas("first_name")),
    asyncErrorBoundary(bodyDataHas("last_name")),
    asyncErrorBoundary(bodyDataHas("mobile_number")),
    asyncErrorBoundary(bodyDataHas("reservation_date")),
    asyncErrorBoundary(bodyDataHas("reservation_time")),
    asyncErrorBoundary(bodyDataHas("people")),
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
};
