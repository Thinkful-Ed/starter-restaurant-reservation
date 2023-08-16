/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

function validator(field) {
  return function (req, _res, next) {
    //to do: add validation for date and time
    // add validation for mobile number
    // add validation for number of people
    const { data: { [field]: value } = {} } = req.body;
    if (!value) {
      return next({
        status: 400,
        message: `${field} is missing`,
      });
    }

    next();
  };
}

function phoneNumberValidator(field) {
  return function (req, _res, next) {
    // console.log("phone number validator");
    const { data: { [field]: value } = {} } = req.body;
    if (value.length < 12 || value.length > 12) {
      return next({
        status: 400,
        message: `${field} must be a valid phone number`,
      });
    }

    next();
  };
}

function dateValidator(field) {
  return function (req, _res, next) {
    // console.log("date validator");
    const { data: { [field]: value } = {} } = req.body;
    const date = new Date(value);

    if (isNaN(date)) {
      return next({
        status: 400,
        message: `${field} must be a valid date`,
      });
    }
    if (date.getDay() === 1) {
      return next({
        status: 400,
        message: `closed`,
      });
    }
    if (date < new Date()) {
      return next({
        status: 400,
        message: `${field} must be in the future`,
      });
    }

    next();
  };
}

function timeValidator(field) {
  return function (req, _res, next) {
    // console.log("time validator");
    const { data: { [field]: value } = {} } = req.body;
    const timeCheck = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    if (!timeCheck.test(value)) {
      return next({
        status: 400,
        message: `${field} must be a valid time`,
      });
    }
    next();
  };
}

function peopleValidator(field) {
  return function (req, _res, next) {
    // console.log("people validator");
    // console.log({ field });
    const { data: { [field]: value } = {} } = req.body;

    if (typeof value !== "number") {
      // console.log("not a number");
      return next({
        status: 400,
        message: `${field} must be a number`,
      });
    }
    if (value < 1) {
      // console.log("less than 1");
      return next({
        status: 400,
        message: `${field} must be at least 1`,
      });
    }
    next();
  };
}

async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({
    data,
  });
}

async function create(req, res) {
  // console.log("create");
  const response = await service.create(req.body.data);
  res.status(201).json({
    data: response,
  });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    ...[
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people",
    ].map(validator),
    phoneNumberValidator("mobile_number"),
    dateValidator("reservation_date"),
    timeValidator("reservation_time"),
    peopleValidator("people"),
    asyncErrorBoundary(create),
  ],
};
