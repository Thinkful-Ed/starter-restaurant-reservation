/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

function validator(field) {
  return function (req, res, next) {
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
  return function (req, res, next) {
    const { data: { [field]: value } = {} } = req.body;
    if (value.length < 10) {
      return next({
        status: 400,
        message: `${field} must be a valid phone number`,
      });
    }

    next();
  };
}
function dateValidator(field) {
  return function (req, res, next) {
    const { data: { [field]: value } = {} } = req.body;
    const date = new Date(value);
    if (!isNaN(date)) {
      return next({
        status: 400,
        message: `${field} must be a valid date`,
      });
    }
    if (date.getDay() === 2) {
      return next({
        status: 400,
        message: `Closed on Tuesdays. Please select a different day.`,
      });
    }
    if (date < new Date()) {
      return next({
        status: 400,
        message: `${field} must be a date in the future`,
      });
    }

    next();
  };
}

function timeValidator(field) {
  return function (req, res, next) {
    const { data: { [field]: value } = {} } = req.body;
    const time = new Date(value);
    if (!isNaN(time)) {
      return next({
        status: 400,
        message: `${field} must be a valid time`,
      });
    }
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
  const response = await service.create(req.body.data);
  res.status(201).json({
    data: response,
  });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    validator("first_name"),
    validator("last_name"),
    phoneNumberValidator("mobile_number"),
    dateValidator("reservation_date"),
    timeValidator("reservation_time"),
    peopleValidator("people"),
    asyncErrorBoundary(create),
  ],
};
