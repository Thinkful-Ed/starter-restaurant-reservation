const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */
// async function list(req, res) {
//   res.json({ data: await reservationsService.list() });
// }
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

async function list(req, res, _next) {
  const { date } = req.query;
  if (date) {
    return res.json({ data: await reservationsService.listOnDate(date) });
  } else {
    data = await reservationsService.list();
    return res.json({ data });
  }

}

function hasBodyData(req, res, next) {
  const { data } = req.body;
  if (!data)
    next({
      status: 400,
    });
  next();
}

function peopleIsValid(req, res, next) {
  const { people } = req.body.data;
  if (!people || !Number.isInteger(people) || people <= 0) {
    return next({
      status: 400,
      message: `people`,
    });
  }
  next();
}

// Validate name
function nameIsValid(req, res, next) {
  const { first_name, last_name } = req.body.data;
  const error = { status: 400 };
  if (!first_name || !first_name.length) {
    error.message = `first_name`;
    return next(error);
  }
  if (!last_name || !last_name.length) {
    error.message = `last_name`;
    return next(error);
  }

  next();
}

// Validate mobile
function mobileNumberIsValid(req, res, next) {
  const { mobile_number } = req.body.data;
  if (!mobile_number)
    return next({
      status: 400,
      message: "mobile_number",
    });
  next();
}

// Validate reservation date
function dateIsValid(req, res, next) {
  const { reservation_date } = req.body.data;
  if (!reservation_date || new Date(reservation_date) == "Invalid Date")
    return next({
      status: 400,
      message: "reservation_date",
    });
  next();
}

// Validate reservation time
function timeIsValid(req, res, next) {
  let { reservation_time } = req.body.data;

  const error = {
    status: 400,
    message: "reservation_time",
  };
  if (!reservation_time) return next(error);
  if (reservation_time[2] === ":") {
    reservation_time = reservation_time.replace(":", "");
    reservation_time = reservation_time.substring(0, 4);
  }
  res.locals.hour = reservation_time.substring(0, 2);
  res.locals.mins = reservation_time.substring(2, 4);
  if (Number.isInteger(Number(reservation_time))) {
    next();
  } else {
    next(error);
  }
}

async function create(req, res, next) {
  res
    .status(201)
    .json({ data: await reservationsService.create(req.body.data) })
    .catch(next);
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    peopleIsValid,
    hasBodyData,
    nameIsValid,
    mobileNumberIsValid,
    dateIsValid,
    timeIsValid,
    asyncErrorBoundary(create),
  ],
};
